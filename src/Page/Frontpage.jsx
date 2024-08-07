import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <>
      {/* <h2>Welcome to Our App</h2> */}
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </>
  );
};

export default FrontPage;
