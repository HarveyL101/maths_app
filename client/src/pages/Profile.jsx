import { ChangeEmail, ChangeName, ChangePassword, TitleBar } from '../utils/index';

const Profile = () => {
  // contains user.id, user.name, user.email, user.roles
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <TitleBar/>

      <div className="account-details-container">
      <h2 className="account-details-header">Account Details</h2>
      
      <table className="border-separate border-spacing-2 border border-gray-400 light:border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-600">User ID</th>
            <th className="border border-gray-600">User Name</th>
            <th className="border border-gray-600">User Email</th>
            <th className="border border-gray-600">User Roles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-700">{ user.id }</td>
            <td className="border border-gray-700">{ user.name }</td>
            <td className="border border-gray-700">{ user.email }</td>
            <td className="border border-gray-700">{ user.roles.join(", ") }</td>
          </tr>
        </tbody>
      </table>   
    </div>

      <ChangeEmail />

      <ChangeName />

      <ChangePassword />

      <details>
        <summary>Change Your Password</summary>
        <p>WIP</p>
      </details>

      <details>
        <summary>Change Name</summary>
        <p>WIP</p>
      </details>

      <details>
        <summary>Change Profile Picture</summary>
        <p>WIP</p>
      </details>

      <details>
        <summary>I've forgotten my password</summary>
        <p>WIP</p>
      </details>
    </div>
  );
}

export default Profile;