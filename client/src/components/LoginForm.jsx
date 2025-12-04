const LoginForm = () => {
  const submitLogin = (formData) => {
    // Call to the backend will go in this block
    console.log(formData);
  }

  return(
    <div >
      <div className="bg-red-500 p-10">TEST</div>
      <form action={submitLogin} className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col w-full gap-4">
          <label htmlFor="name" className="flex flex-col text-sm font-medium">
            Name:
            <input 
              type="text" 
              name="userName" 
              id="name" 
            />
          </label>
        
          <label htmlFor="email" className="flex flex-col text-sm font-medium">
            Email:
            <input 
              type="email" 
              name="userEmail" 
              id="email" 
            />
          </label>
        

          <label htmlFor="password" className="flex flex-col text-sm font-medium">
            Password:
            <input 
              type="password" 
              name="userPassword" 
              id="password" 
            />
          </label>
        </div>

        <div className="flex gap-6">
          <button type="reset" className="px-6 py-3 bg-gray-200 rounded hover:bg-gray-300">Reset</button>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;