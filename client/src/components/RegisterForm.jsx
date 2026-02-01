import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEducator, setIsEducator] = useState(false);


  const handleRegister = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const data = {
      name: formData.get("userName"),
      email: formData.get("userEmail"),
      password: formData.get("userPassword"),
      isEducator: isEducator
    };
    // --- Client-Side Validation ---
    if (!data.name || !data.email || !data.password) {
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
        setErrorMessage(json.message || "Server error occurred, please check your connection and try again.");
      }
    } catch (err) {
      console.log("error: ", err);
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
              placeholder="E.g 'Harvey' or 'Ella'."
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

        <div>
          <label htmlFor="isEducator" className="educator-checkbox">
            Are you a Teacher/ Educator?
            <input
              className="mx-2"
              type="checkbox"
              name="isEducator"
              id="educatorCheckbox"
              checked={isEducator}
              onChange={(e) => setIsEducator(e.target.checked)}
            />
          </label>
        </div>

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