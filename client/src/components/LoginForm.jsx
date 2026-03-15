import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);

    const formData = new FormData(e.target);
    
    const data = {
      email: formData.get("userEmail"),
      password: formData.get("userPassword"),
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
    <div className="form-container">
      <form 
      onSubmit={handleSubmit}
      className="form-card"
    >
        <div>
          <h1 className="form-title">Login</h1>

          <label htmlFor="email" className="form-label">
            Email:
            <input 
              className="form-input"
              type="email" 
              name="userEmail" 
              id="email"
              placeholder="E.g johnsmith@gmail.com"
            />
          </label>

          <label htmlFor="password" className="form-label">
            Password:
            <input 
              className="form-input"
              type="password" 
              name="userPassword" 
              id="password"
              placeholder="Don't share your password with others!"
            />
          </label>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>

        <div className="form-button-container">
          <button type="reset" className="form-button bg-orange-500">Reset</button>
          <button type="submit" className="form-button bg-blue-600">Submit</button>
        </div>
        
        <Link to='/register' className="form-link">Don't have an account? Register Here!</Link>
      </form>
    </div>
  )
};

export default LoginForm;