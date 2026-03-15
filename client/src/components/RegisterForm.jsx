import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [role, setRole] = useState(null);
  const { login } = useAuth();


  const handleRegister = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const data = {
      name: formData.get("userName"),
      surname: formData.get("surname"),
      email: formData.get("userEmail"),
      password: formData.get("userPassword"),
      role: role
    };
    // --- Client-Side Validation ---
    if (!data.name || !data.surname || !data.email || !data.password) {
      setErrorMessage("Please fill out all fields before submitting.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (data.password.length < 8) {
      setErrorMessage("Please enter a password longer than 8 characters.");
      return;
    }

    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      
      // --- Server Side Error Handling ---
      if (res.ok) {
        login(json.token, json.user);
        navigate("/home");
      } else {
        setErrorMessage(json.error || "Server error occurred, please check your connection and try again.");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return(
    <div className="form-container">
      <form 
        onSubmit={handleRegister} 
        className="form-card"
      >
        <div>
          <h1 className="form-title">Register</h1>

          <label htmlFor="name" className="form-label">Name:
            <input 
              className="form-input" 
              type="text" 
              name="userName" 
              id="name" 
              placeholder="E.g 'John' or 'Jane'."
            />
          </label>

          <label htmlFor="name" className="form-label">Surname:
            <input 
              className="form-input" 
              type="text" 
              name="surname" 
              id="name" 
              placeholder="E.g 'Smith' or 'Doe'."
            />
          </label>
        
          <label htmlFor="email" className="form-label">Email:
            <input 
              className="form-input" 
              type="email" 
              name="userEmail" 
              id="email"
              placeholder="E.g johnsmith@gmail.com" 
            />
          </label>
        
          <label htmlFor="password" className="form-label">Password:
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

        <label>{role ? `Selected role ${role}` : "Please select a role"}</label>
        <select name="role" onChange={(e) => setRole(e.target.value)}>
          <option value="">Choose Here</option>  
          <option value="student">Student</option>
          <option value="educator">Educator</option>
        </select>

        <div className="form-button-container">
          <button type="reset" className="form-button bg-orange-500">Reset</button>
          <button type="submit" className="form-button bg-blue-600">Submit</button>
        </div>

        <Link to='/' className="form-link">Already have an account? Log in Here!</Link>
      </form>
    </div>    
  );
};

export default RegisterForm;