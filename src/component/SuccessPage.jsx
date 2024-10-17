import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login'); // Change '/login' to your actual login route
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer when component unmounts
  }, [navigate]);

  return (
    <div>
      <h2  style={{color: 'blue', fontWeight:'bolder' ,marginTop:'20px'}}>Password Updated Successfully!</h2>
      <p  style={{color:'green',marginTop:'30px'}}>Redirecting to login page...</p>
    </div>
  );
};

export default SuccessPage;
