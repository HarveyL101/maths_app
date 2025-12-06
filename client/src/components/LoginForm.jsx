import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {

    const data = {
      email: formData.get("userEmail"),
      password: formData.get("userPassword")
    }

    console.log(data)

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      console.log(json);

      if (res.ok) {
        navigate("/home");
      } else {
        console.log("Login failed:", json.message);
      }
      } catch (error) {
        console.log("Error: ", error);
      }
  };
  return(
    <div >
      <form action={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex flex-col w-full gap-4">
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
};

export default LoginForm;