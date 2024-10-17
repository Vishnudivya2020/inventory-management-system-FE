// ResetPassword.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BE_Url } from '../../APIs/Constants';

const ResetPassword = () => {
  const { token } = useParams();  // Get the reset token from the URL
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`{BE_Url}/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
