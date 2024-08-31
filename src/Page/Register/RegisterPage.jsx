
import { useState } from 'react';
import { Link, useNavigate ,Navigate} from 'react-router-dom';
import styles from './RegisterPage.module.css';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { userSignup } from '../../APIs/auth.js';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isAuthenticated =Boolean(localStorage.getItem("isAuthenticated"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      
    });
  };console.log(formData);

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await userSignup(formData);
      console.log(result);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 1000);
      
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
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className={styles.Regbutton}>
              Register
            </Button>
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

