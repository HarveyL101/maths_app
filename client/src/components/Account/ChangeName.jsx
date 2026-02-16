const ChangeName = () => {
  const handleSubmit = () => {
    const formData = new FormData(e.target);

    const data = {
      oldEmail: formData.get('')
    };
  }

  return (
    <div className="profile-container">
      
      <form className="profile-form-card" method="post">
        <h1 className="profile-form-title">Change Account Name</h1>
        
        <div className="flex-col">
          <label className="profile-form-label" htmlFor="oldName"> Old Name:
            <input className="profile-input" type="" name="oldName" placeholder="Old Name..."/>
          </label>
          <label className="profile-form-label" htmlFor="newName"> New Name:
            <input className="profile-input" type="input" name="newName" placeholder="New Name..."/>
          </label>
          
        </div>
        
        <div className="profile-button-container">
          <button className="profile-button bg-orange-400" type="reset">Reset</button>
          <button className="profile-button bg-blue-600" type="submit" onSubmit={handleSubmit}>Submit</button>
        </div>
      </form>
    </div>  
  );
}

export default ChangeName;