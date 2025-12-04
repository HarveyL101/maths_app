const RegisterForm = () => {

  const submitRegister = (formData) => {
    console.log(formData);
  }

  return(
    <div>
      <form action={submitRegister} className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col w-full gap-4">
          <label htmlFor="name" className="flex flex-col text-sm font-medium">Name:
            <input type="text" name="userName" id="name" />
          </label>
        
          <label htmlFor="email" className="flex flex-col text-sm font-medium">Email:
            <input type="email" name="userEmail" id="email" />
          </label>
        

          <label htmlFor="password" className="flex flex-col text-sm font-medium">Password:
            <input type="password" name="userPassword" id="password" />
          </label>
        </div>

        <div className="flex gap-4">
          <button type="reset" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Reset</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </div>
    

    
  )
}

export default RegisterForm;