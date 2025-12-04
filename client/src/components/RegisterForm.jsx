const RegisterForm = () => {

  const submitRegister = (formData) => {
    console.log(formData);
  }

  return(
    <div>
      <form action={submitRegister}>
        <div className='form-field'>
          <label htmlFor="name" className="input-field">Name:
            <input type="text" name="userName" id="name" />
          </label>
        
          <label htmlFor="email" className="input-field">Email:
            <input type="email" name="userEmail" id="email" />
          </label>
        

          <label htmlFor="password" className="input-field">Password:
            <input type="password" name="userPassword" id="password" />
          </label>
        </div>

        <div className='form-button'>
          <button type="reset" className="form-button">Reset</button>
          <button type="submit" className="form-button">Submit</button>
        </div>
      </form>
    </div>
    

    
  )
}

export default RegisterForm;