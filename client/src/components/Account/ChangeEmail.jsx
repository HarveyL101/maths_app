import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const ChangeEmail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleReset = () => {
    setErrorMessage(null);
    setOldEmail("");
    setNewEmail("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      currentEmail: oldEmail,
      newEmail: newEmail
    };

    // Bringing user details out of localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwt");

    // Sanitisation and validation checks
    if (!data.currentEmail || !data.newEmail) {
      setErrorMessage('Missing Required Fields');
      return;
    }
    if (data.currentEmail !== user.email) {
      setErrorMessage("Current email does not match account email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(data.newEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (data.currentEmail === data.newEmail) {
      setErrorMessage("New email cannot be the same as the old email.");
      return;
    }


    try {
      const res = await fetch(`/api/change-email/${user.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          newEmail: data.newEmail 
        }),
      });

      if (res.ok) {
        const confirmed = window.confirm("Are you sure you want to change your email?");
        if (!confirmed) return;
        
        alert("Email updated successfully! Please log in again.");

        logout(); // Clear auth state and localStorage

        navigate("/");
      } else {
        setErrorMessage("Failed to update email. Please try again.");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage("Error while updating your email, please try again.");
    }
  }
  return (
      <div className="form-wrapper">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-header-container">
            <h1 className="form-header">Change Account Email</h1>

            <p className="form-subheader">You will need to re-login upon a successful change.</p>
          </div>

          <div className="form-input-container">
            <div className="form-input-row">
              <label className="form-input-label"> Current Email:
                <input className="form-input" 
                  type="email" name="currentEmail" 
                  placeholder="Current Email..." 
                  value={oldEmail}
                  onChange={(e) => setOldEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="form-input-row">
              <label className="form-input-label"> New Email:
                <input className="form-input" 
                  type="email" 
                  name="newEmail" 
                  placeholder="New Email..." 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </label>
            </div>
            
            
          </div>

          {errorMessage && <p className="form-error-message">{errorMessage}</p>}
          
          <div className="form-button-container">
            <button className="form-reset-button" 
              type="reset" 
              onClick={handleReset}
            >
              Reset
            </button>

            <button className="form-submit-button" 
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  );
};

export default ChangeEmail;