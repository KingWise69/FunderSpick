import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css"; // Import the CSS Module

function Auth({ onLogin }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const initialValues = {
    usernameOrEmail: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const { usernameOrEmail, password } = formValues;

      // Authentication logic
      if (usernameOrEmail.toLowerCase() === "admin" && password === "funderspick") {
        console.log("Admin logged in");
        onLogin("admin");
      } else if (usernameOrEmail.toLowerCase() === "normal user" && password === "normal") {
        console.log("Normal User logged in");
        onLogin("normal");
      } else {
        setFormErrors({ auth: "Invalid username or password!" });
      }
    }
  }, [formErrors, formValues, isSubmit, onLogin]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const usernameRegex = /^[a-zA-Z0-9_ ]+$/;

    if (!values.usernameOrEmail) {
      errors.usernameOrEmail = "Email or Username is required!";
    } else if (!emailRegex.test(values.usernameOrEmail) && !usernameRegex.test(values.usernameOrEmail)) {
      errors.usernameOrEmail = "Enter a valid email or username!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be at least 4 characters long";
    }

    if (!isLogin) {
      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    return errors;
  };

  return (
    <div className={styles.container}>
      {Object.keys(formErrors).length === 0 && isSubmit && (
        <div className={styles.successMessage}>
          {isLogin ? "Logged in" : "Signed up"} successfully
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>

        <div className={styles.formGroup}>
          <label>Email or Username</label>
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Enter your email or username"
            value={formValues.usernameOrEmail}
            onChange={handleChange}
          />
          <p className={styles.error}>{formErrors.usernameOrEmail}</p>
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p className={styles.error}>{formErrors.password}</p>
        </div>

        {!isLogin && (
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            <p className={styles.error}>{formErrors.confirmPassword}</p>
          </div>
        )}

        <button type="submit" className={styles.button}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {formErrors.auth && <p className={styles.errorMessage}>{formErrors.auth}</p>}
      </form>

      <div className={styles.text}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={() => setIsLogin(!isLogin)} className={styles.toggleLink}>
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </div>
    </div>
  );
}

export default Auth;
