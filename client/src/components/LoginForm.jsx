import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    const data = {
      email: formData.get("userEmail"),
      password: formData.get("userPassword")
    }

    if (!data.email || !data.password) {
      setError("Please fill out all fields before submitting.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (data.password.length < 8) {
      setError("Please enter a password longer than 8 characters.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();

      if (res.ok) {
        navigate("/home");
      } else {
        console.log("Login failed:", json.message);
      }
      } catch (error) {
        console.log("Error: ", error);
      }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(!isChecked);
    console.log(`Checkbox is set to ${isChecked}!`);
  };

  return(
    <div className="form-container">
      <form 
      onSubmit={handleSubmit}
      className="form-card"
    >
        <div>
          <label htmlFor="email" className="form-label">
            Email:
            <input 
              className="form-input"
              type="email" 
              name="userEmail" 
              id="email" 
            />
          </label>

          <label htmlFor="password" className="form-label">
            Password:
            <input 
              className="form-input"
              type="password" 
              name="userPassword" 
              id="password" 
            />
          </label>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div>
          <label htmlFor="isEducator" className="flex items-center justify-center text-gray-500 mx-2">
            Are you a Teacher/ Educator?
            <input
              className="mx-2"
              type="checkbox"
              name="isEducator"
              id="educatorCheckbox"
              checked={!isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>

        <div className="form-button-container">
          <button type="reset" className="form-button-orange">Reset</button>
          <button type="submit" className="form-button-blue">Submit</button>
        </div>
        
        <Link to='/register' className="form-link">Don't have an account? Register Here!</Link>
      </form>
    </div>
  )
};

export default LoginForm;