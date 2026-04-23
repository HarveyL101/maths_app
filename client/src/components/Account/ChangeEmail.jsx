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
      <div className="profile-container">
        <form className="profile-form-card" onSubmit={handleSubmit}>
          <h1 className="profile-form-title">Change Account Email</h1>
          <p>You will need to re-login upon a successful change.</p>
          
          <div className="flex-col">
            <label className="profile-form-label"> Current Email:
              <input className="profile-input" 
                type="email" name="currentEmail" 
                placeholder="Current Email..." 
                value={oldEmail}
                onChange={(e) => setOldEmail(e.target.value)}
              />
            </label>
            <label className="profile-form-label"> New Email:
              <input className="profile-input" 
                type="email" 
                name="newEmail" 
                placeholder="New Email..." 
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </label>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          
          <div className="profile-button-container">
            <button className="profile-button bg-orange-400" 
              type="reset" 
              onClick={handleReset}
            >
              Reset
            </button>

            <button className="profile-button bg-blue-600" 
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