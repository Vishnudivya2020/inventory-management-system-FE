

import { useState } from 'react';
import axios from 'axios';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2222/forgot-password', { email });
      setMessage(response.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'An error occurred');
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const messageStyle = {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e2e3e5',
    borderRadius: '4px',
    textAlign: 'center',
    color:'green',
    fontWeight:'bold'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            style={inputStyle}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" style={buttonStyle}>
            Request Password Reset
          </button>
        </form>
        {message && <div style={messageStyle}>{message}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;


