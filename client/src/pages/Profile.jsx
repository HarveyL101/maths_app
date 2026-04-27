import { ChangeEmail, ChangeName, ChangePassword, Footer, TitleBar } from '../utils/index';

const Profile = () => {
  // contains user.id, user.name, user.email, user.roles
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='profile-wrapper'>
      <TitleBar/>

      <div className="table-container">
        <h2 className="table-header">Account Details</h2>
        
        <table className="table-frame">
          <thead className='table-head'>
            <tr className='table-row'>
              <th className="table-head-item">User ID</th>
              <th className="table-head-item">User Name</th>
              <th className="table-head-item">User Email</th>
              <th className="table-head-item">User Roles</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            <tr className='table-row'>
              <td className="table-body-item">{ user.id }</td>
              <td className="table-body-item">{ user.name }</td>
              <td className="table-body-item">{ user.email }</td>
              <td className="table-body-item">{ user.roles.join(", ") }</td>
            </tr>
          </tbody>
        </table>   
      </div>

      <div className='profile-form-wrapper'>
        <ChangeEmail />

        <ChangeName />

        <ChangePassword />
      </div>
      
      <Footer />
    </div>
  );
}

export default Profile;