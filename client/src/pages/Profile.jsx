const Profile = () => {
  return (
    <div>
      <h1>This is the current page for /profile</h1>

      <ul>
        <li>This will include information about the lessons/ topics that have been completed</li>
        <li>As well as the ability to change the name, email and password associated with your account</li>
        <li>A non functional feature could include an accessibility tab for things like text/ button size, as well as a dark-mode capability</li>
      </ul>
      <p></p>

      <button>poo</button>
      <details className="">
        <summary>Change Your Email</summary>
        <p>WIP</p>
      </details>

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
    </div>
  );
}

export default Profile;