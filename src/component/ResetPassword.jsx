import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { resetPasswordToken } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();

  const backendURL = `${import.meta.env.VITE_BACKEND_URL}/reset-password`;

  useEffect(() => {
    const verifyToken = async () => {
      if (!resetPasswordToken) {
        setMessage('Invalid or missing resetPasswordToken');
        return;
      }

      try {
        const response = await fetch(`${backendURL}/${resetPasswordToken}`, {
          method: 'GET',
        });
        const data = await response.json();

        if (response.ok) {
          setIsTokenValid(true);
        } else {
          setMessage(data.msg || 'Invalid or expired resetPasswordToken');
          setIsTokenValid(false);
        }
      } catch (err) {
        setMessage('Error verifying resetPasswordToken');
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [resetPasswordToken, backendURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetPasswordToken || !password) {
      setMessage('resetPasswordToken or password is missing');
      return;
    }

    try {
      const response = await fetch(`${backendURL}/${resetPasswordToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        // Redirect to success page after successful password reset
        navigate('/password-reset-success');
      } else {
        setMessage(data.msg || 'Error occurred while resetting password');
      }
    } catch (err) {
      setMessage('Error occurred while resetting password');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Reset Password</h2>

        {isTokenValid ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
          </form>
        ) : (
          <p className="text-danger text-center">{message}</p>
        )}

        {message && isTokenValid && (
          <p className="text-success text-center mt-3">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
