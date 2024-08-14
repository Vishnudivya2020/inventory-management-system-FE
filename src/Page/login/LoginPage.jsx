// import  { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import styles from "./LoginPage.module.css";
// import { Link } from "react-router-dom";
// import { userSignIn } from "../../APIs/auth.js";


// const Login = () => {  
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] =useState('');
//   // const [confirmPassword, setConfirmPassword] = useState("");

//   const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
   
//   const handleLogin = async  (event) => {
//     event.preventDefault();
//   //  console.log({email,password}); 
    
//    const data = await userSignIn({email,password,role}) 
//    console.log(data)

//    if (data.code ===1) {
//     console.log("password match")
//     // if (password === confirmPassword) {
//     //   console.log("password matched to the confirm password");
//     //   // For now, it simply navigates to the home page
//       localStorage.setItem("isAuthenticated",true);
//       localStorage.setItem("User_details",JSON.stringify(data.user));
//     navigate("/home");
//     //  } else {
//     //    alert("Passwords do not match!");
//     //   }
//    }else{
//     alert('Please check your credentials')
//    }
//   };

//   if (isAuthenticated) {
//     return <Navigate to="/home" />;
//   }
    
 
//   return (
//     < div  className={styles["container"]}>
//       <div className={styles["row"]}>
//         < div className={styles["Col"]}>
//           <h2 className={styles["text-center"]}>Login</h2>
//           <Form onSubmit={handleLogin}>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label  className={styles["Labels"]}>Email address</Form.Label>
//               <Form.Control  className={styles["Control"]}
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group><br></br>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label className={styles["Labels"]}>Password</Form.Label>
//               <Form.Control className={styles["Control"]}
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </Form.Group><br></br>

//             {/* <Form.Group controlId="formConfirmPassword">
//               <Form.Label className={styles["Labels"]}>Confirm Password</Form.Label>
//               <Form.Control  className={styles["Control"]}
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </Form.Group> */}

// <Form.Group controlId="formBasicRole">
//               <Form.Label className={styles["Labels"]}>Role</Form.Label>
//               <Form.Control className={styles["Control"]}
//                 as="select"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 required
//               >
//                 <option value="">Select Role</option>
//                 <option value="User">User</option>
//                 <option value="Admin">Admin</option>
//               </Form.Control>
//             </Form.Group><br/>

//             <Button variant="primary" type="submit" className={styles["mt-3"]}>
//               Login
//             </Button>
//           </Form>
//           <Link to="/register">Register</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/components/LoginPage/LoginPage.jsx
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { userSignIn } from "../../APIs/auth.js";

const Login = () => {  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define the role explicitly
  const role = "User"; // Set predefined role here

  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));

  const handleLogin = async (event) => {
    event.preventDefault();

    // Pass role directly
    const data = await userSignIn({ email, password, role });
    console.log(data);

    if (data.code === 1) {
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("User_details", JSON.stringify(data.user));
      navigate("/home");
    } else {
      alert('Please check your credentials');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["row"]}>
        <div className={styles["Col"]}>
          <h2 className={styles["text-center"]}>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className={styles["Labels"]}>Email address</Form.Label>
              <Form.Control className={styles["Control"]}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group><br/>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className={styles["Labels"]}>Password</Form.Label>
              <Form.Control className={styles["Control"]}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group><br/>

            <Button variant="primary" type="submit" className={styles["mt-3"]}>
              Login
            </Button>
          </Form>
          <Link to="/register">Already don't have an account? Register here.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;



