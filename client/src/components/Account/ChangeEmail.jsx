import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const ChangeEmail = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { userId } = useParams();
  const { user, email } = useAuth();

  const handleSubmit = async () => {
    const formData = new FormData(e.target);

    const data = {
      oldEmail: formData.get("oldEmail"),
      newEmail: formData.get("newEmail")
    };

    if (!data.oldEmail || !data.newEmail) {
      setErrorMessage('Missing Required Fields');
    }
    if (!/\S+@\S+\.\S+/.test(data.newEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch(`/profile/:${userId}/change-email`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ newEmail })
      });

      if (res.ok) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorMessage("Error while updating your email, please try again.");
    }
  }
  return (
    <div className="profile-container">

      <ul>
        <li>UserID: {userId}</li>
        <li>User: {user}</li>
        <li>email: {email}</li>
      </ul>
      
      <form className="profile-form-card" method="post">
        <h1 className="profile-form-title">Change Account Email</h1>
        
        <div className="flex-col">
          <label className="profile-form-label"> Old Email:
            <input className="profile-input" type="email" name="oldEmail" placeholder="Old Email..."/>
          </label>
          <label className="profile-form-label"> New Email:
            <input className="profile-input" type="email" name="newEmail" placeholder="New Email..."/>
          </label>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        
        <div className="profile-button-container">
          <button className="profile-button bg-orange-400" type="reset">Reset</button>
          <button className="profile-button bg-blue-600" type="submit" onSubmit={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ChangeEmail;