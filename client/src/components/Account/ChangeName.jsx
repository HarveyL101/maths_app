import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const ChangeName = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleReset = () => {
    setErrorMessage(null);
    setName("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      newName: name
    };

    // Bringing user details out of localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwt");

    // Sanitisation and validation checks
    if (!data.newName) {
      setErrorMessage('Missing Required Fields');
      return;
    }
    if (user.name === data.newName) {
      setErrorMessage(`New name cannot be the same as the current name (${user.name}).`);
      return;
    }
    

    try {
      const confirmed = window.confirm("Are you sure you want to change your name?");
      if (!confirmed) return;

      const res = await fetch(`/api/change-name/${user.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          newName: data.newName 
        }),
      });

      if (res.ok) {       
        alert("Name updated successfully! Please log in again.");

        logout(); // Clear auth state and localStorage

        navigate("/");
      } else {
        setErrorMessage("Failed to update your name. Please try again.");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage("Error while updating your name, please try again.");
    }
  }
  return (
      <div className="profile-container">
        <form className="profile-form-card" onSubmit={handleSubmit}>
          <h1 className="profile-form-title">Change Account Name</h1>
          <p>You will need to re-login upon a successful change.</p>
          
          <div className="flex-col">
            <label className="profile-form-label"> New Alias:
              <input className="profile-input" 
                type="text" 
                name="newName" 
                placeholder="New Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          
          <div className="profile-button-container">
            <button 
              className="profile-button bg-orange-400" 
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>

            <button 
              className="profile-button bg-blue-600" 
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
};

export default ChangeName;