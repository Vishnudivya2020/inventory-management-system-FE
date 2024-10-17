

import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { userSignup } from '../../APIs/auth.js';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default to 'user'
    profilePicUrl: '', // Added for profile picture URL
    secretKey: '', // Add a field for the admin secret key
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false); // To toggle the secret key field

  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Show secret key field if role is "admin"
    if (name === "role" && value === "admin") {
      setShowSecretKey(true);
    } else if (name === "role" && value === "user") {
      setShowSecretKey(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the secret key is required for admin role
    if (formData.role === 'admin' && formData.secretKey !== 'IMS') {
      setError('You are not an admin. Incorrect secret key.');
      return;
    }

    try {
      const result = await userSignup(formData);
      console.log(result);
      setSuccess('Registration successful! Redirecting...');
      alert("Go to your email, and verify your account.");
      // navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message || 'Failed to register. Please try again.');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.Regcontainer}>
      <Row className={styles.row}>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label className={styles.label}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className={styles.group}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            {/* Conditionally render secret key input if the role is "Admin" */}
            {showSecretKey && (
              <Form.Group controlId="formSecretKey" className="mt-3">
                <Form.Label>Admin Secret Key</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter the admin secret key"
                  name="secretKey"
                  value={formData.secretKey}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}

            <Form.Group controlId="formProfilePicUrl" className="mt-3">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the URL of your profile picture"
                name="profilePicUrl"
                value={formData.profilePicUrl}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className={styles.Regbutton}>
              Register
            </Button>

            {error && <p className="text-danger mt-3">{error}</p>}
          </Form>
          <p className={styles.mt3}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;





