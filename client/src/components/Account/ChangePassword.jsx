import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleReset = () => {
    setErrorMessage(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    // Bringing user details out of localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwt");


    // Sanitisation and validation checks
    if (!data.currentPassword || !data.newPassword) {
      setErrorMessage('Missing Required Fields');
      return;
    }
    if (data.currentPassword === data.newPassword) {
      setErrorMessage(`New password must be different from current password.`);
      return;
    }
    if (data.newPassword.length < 8) {
      setErrorMessage("Please enter a password longer than 8 characters.");
      return;
    }
    if (data.newPassword !== confirmNewPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }
    

    try {
      const confirmed = window.confirm("Are you sure you want to change your password? Make a note of it incase you forget!");
      if (!confirmed) return;

      const res = await fetch(`/api/change-password/${user.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          currentPassword: data.currentPassword,
          newPassword: data.newPassword 
        }),
      });

      if (res.ok) {
        alert("Password updated successfully! Please log in again.");

        logout(); // Clear auth state and localStorage

        navigate("/");
      } else {
        setErrorMessage("Failed to update your password. Please try again.");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage(error.message);
    }
  }
  return (
      <div className="profile-container">
        <form className="profile-form-card" onSubmit={handleSubmit}>
          <h1 className="profile-form-title">Change Account Password</h1>
          <p>You will need to re-login upon a successful change.</p>
          
          <div className="flex-col">
            <label className="profile-form-label"> Current Password:
              <input className="profile-input" 
                type="password" 
                name="currentPassword" 
                placeholder="Current Password..."
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="flex-col">
            <label className="profile-form-label"> New Password:
              <input className="profile-input" 
                type="password" 
                name="newPassword" 
                placeholder="New Password..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="flex-col">
            <label className="profile-form-label"> Confirm Password:
              <input className="profile-input" 
                type="password" 
                name="newConfirmPassword" 
                placeholder="Please Re-enter New Password..."
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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

export default ChangePassword;