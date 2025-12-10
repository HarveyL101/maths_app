import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const data = {
      name: formData.get("userName"),
      email: formData.get("userEmail"),
      password: formData.get("userPassword")
    };
    // --- Client-Side Validation ---
    if (!data.name || !data.email || !data.password) {
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
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      
      // --- Server Side Error Handling ---
      if (res.ok) {
        navigate("/home");
      } else {
        setError(json.error || "Server error occurred, please check your connection and try again.");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return(
    <div className="form-container">
      <form 
        onSubmit={handleRegister} 
        className="form-card"
      >
        <div>
          <label htmlFor="name" className="form-label">Name:
            <input 
              className="form-input" 
              type="text" 
              name="userName" 
              id="name" 
            />
          </label>
        
          <label htmlFor="email" className="form-label">Email:
            <input 
              className="form-input" 
              type="email" 
              name="userEmail" 
              id="email" 
            />
          </label>
        
          <label htmlFor="password" className="form-label">Password:
            <input 
              className="form-input" 
              type="password" 
              name="userPassword" 
              id="password" 
            />
          </label>

          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="form-button-container">
          <button type="reset" className="form-button-orange">Reset</button>
          <button type="submit" className="form-button-blue">Submit</button>
        </div>

        <Link to='/' className="form-link">Already have an account? Log in Here!</Link>
      </form>
    </div>    
  );
};

export default RegisterForm;