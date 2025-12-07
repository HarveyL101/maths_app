import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const data = {
      email: formData.get("userEmail"),
      password: formData.get("userPassword")
    }

    console.log(data)

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      console.log(json);

      if (res.ok) {
        navigate("/home");
      } else {
        console.log("Login failed:", json.message);
      }
      } catch (error) {
        console.log("Error: ", error);
      }
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