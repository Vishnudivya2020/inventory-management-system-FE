import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css'

const RegisterPage = () => {
  return (
    <div className={styles['container ']}>
      <div className={styles["row"]} >
        <div className={styles["col-md-6"]}>
          <div className={styles["card"]}>
            <div className="card-body">
              <h3 className="card-title text-center">Register</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className={styles["form-label"]}>Username</label>
                  <input type="text" className={styles["form-control"]} id="username" placeholder="Enter username" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className={styles["form-label"]}>Email address</label>
                  <input type="email" className={styles["form-control"]} id="email" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className={styles["form-label"]}>Password</label>
                  <input type="password" className={styles["form-control"]} id="password" placeholder="Enter password" />
                </div><br></br>
                <div className="mb-3">
                  <label htmlFor="role" className={styles["form-label"]}>Role</label>
                  <select className={styles["form-control"]} id="role">
                    <option value="">Select role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div><br></br>
                <button type="submit" className={styles["btn-primary"]}>Register</button>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RegisterPage;

