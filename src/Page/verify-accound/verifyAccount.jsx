import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import  {verifyAccount} from "../../APIs/auth.js";
import { useNavigate } from 'react-router-dom'

const VerifyAccount = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const verifyFun= async () => {
      try { 
        // Extracting query parameter
        const token = searchParams.get("token");

        if (!token) {
          setMessage("Invalid request: Missing token.");
          return;
        }

        // Making API call
        const data = await verifyAccount(token);

        // Handling response
        if (data.code === 1) {
          setMessage("Account successfully verified.");
          setTimeout(() => {
            navigate('/login'); // Redirect to login page
         }, 1000);
        } else if (data.code === -1) {
          setMessage("The verification link has expired.");
          navigate('/register'); // Redirect to register page
        } else {
          setMessage("Verification failed. Please try again.");
        }
      } catch (error) {
        console.log(error);
        setMessage("An error occurred during verification.");
      }
    };

    verifyFun();
  }, [searchParams]);

  return (
    <div  style={{color:'#FF1D58'}}>
      <h1>Account Verification</h1>
      <p  style={{color:'#oo49B7'}} >{message}👍</p>
    </div>
  );
};

export default VerifyAccount;