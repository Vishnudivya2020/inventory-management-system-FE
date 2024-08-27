

import { useState } from 'react';
import styles from './LoginPage.module.css';
import {Link, useNavigate,Navigate} from 'react-router-dom';
import { userSignIn } from '../../APIs/auth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isAuthenticated =Boolean(localStorage.getItem("isAuthenticated"));

    const navigate =useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        // Handle form submission
          const data= await userSignIn({email:email,password})
        console.log(data);

        if(data.code ===1){
            localStorage.setItem("isAuthenticated",true);
            localStorage.setItem("token",data.token);
            navigate("/home");//redirect to home page
        }else{
            alert ("Please check your Credentials");
        }
        
         
    };
    if (isAuthenticated) {
            return <Navigate to="/home" />;
      }

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2>Login</h2>
               <label className={styles.loginlabel}>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.inputField}
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <label className={styles.loginlabel}>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className={styles.inputField}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <br></br><br></br>
                <button type="submit" className={styles.loginButton}>Login</button>
                <br></br>
                <Link to="/register"> Register </Link>
               
            </form>
        </div>
    );
}

export default LoginPage;




