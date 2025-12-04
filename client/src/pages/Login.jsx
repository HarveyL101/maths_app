import LoginForm from '../components/LoginForm'; 
import { Link } from 'react-router-dom';

const Login = () => {
  return(
    <div>
      <div>
        <img 
          src='/cool_dog.jpg' 
          alt='Cool Dog' 
        />
        <h1 className='text-4xl'>Login</h1>
      </div>

      


      <LoginForm />

      <Link to='/register'>Don't have an account? Register Here!</Link>
    </div>
  )
}

export default Login;