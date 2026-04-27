import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/useAuth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const { login } = useAuth();


  const handleReset = () => {
    setErrorMessage(null);
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setRole(null);
    return;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const data = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      role: role
    };
    // --- Client-Side Validation ---
    if (!data.name || !data.surname || !data.email || !data.password || !data.role) {
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
    <div className="page-wrapper">
      <div className="form-wrapper">
        <form className="form-container" onSubmit={handleRegister}>
          <div className="form-header-container">
            <h1 className="form-header">Register</h1>
          </div>

          <div className="form-input-container">
            <div className="form-input-row">
              <label htmlFor="name" className="form-input-label">Name:
                <input 
                  className="form-input" 
                  type="text" 
                  name="userName" 
                  id="name" 
                  placeholder="E.g 'John' or 'Jane'."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>

            <div className="form-input-row">
              <label htmlFor="name" className="form-input-label">Surname:
                <input 
                  className="form-input" 
                  type="text" 
                  name="surname" 
                  id="surname" 
                  placeholder="E.g 'Smith' or 'Doe'."
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </label>
            </div>

            <div className="form-input-row">
              <label htmlFor="email" className="form-input-label">Email:
                <input 
                  className="form-input" 
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
                  placeholder="Don't share your password with others!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          
          {errorMessage && <p className="form-error-message">{errorMessage}</p>}

          <div className="form-input-row">
            <label className="dropdown-label">{role ? `Selected role:` : "Please select a role"}
              <select className="dropdown" name="role" onChange={(e) => setRole(e.target.value)}>
                <option className="dropdown-option" value="">Choose Here</option>  
                <option className="dropdown-option" value="student">Student</option>
                <option className="dropdown-option" value="educator">Educator</option>
              </select>
            </label>
          </div>
          

          <div className="form-button-container">
            <button type="reset" className="form-reset-button" onClick={handleReset}>Reset</button>
            <button type="submit" className="form-submit-button">Submit</button>
          </div>

          <Link to='/' className="form-link">Already have an account? Log in Here!</Link>
        </form>
      </div>    
    </div>
  );
};

export default RegisterForm;