import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleReset = () => {
    setErrorMessage(null);
    setEmail("");
    setPassword("");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);

    
    const data = {
      email: email,
      password: password,
    }

    if (!data.email || !data.password) {
      setErrorMessage("Please fill out all fields before submitting.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (res.ok) {
        login(json.token, json.user); // Sets User immediately to ensure auth fires properly
        navigate("/home");
      } else {
        setErrorMessage(json.message || "Login failed. Please try again.");
      }
      } catch (error) {
        console.log("error: ", error);
      }
  };

  return(
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-header-container">
          <h1 className="form-title">Login</h1>
        </div>

        <div className="form-input-container">
          <div className="form-input-row">
            <label htmlFor="email" className="form-input-label">Email:
              <input className="form-input"
                type="email" 
                name="userEmail" 
                id="email"
                placeholder="E.g johnsmith@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="form-input-row">
            <label htmlFor="password" className="form-input-label">Password:
              <input 
                className="form-input"
                type="password" 
                name="userPassword" 
                id="password"
                placeholder="Don't share your password!"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </div>

        {errorMessage && <p className="form-error-message">{errorMessage}</p>}

        <div className="form-button-container">
          <button type="reset" className="form-reset-button" onClick={handleReset}>Reset</button>
          <button type="submit" className="form-submit-button">Submit</button>
        </div>
        
        <Link to='/register' className="form-link">Don't have an account? Register Here!</Link>
      </form>
    </div>


      
  );
};

export default LoginForm;