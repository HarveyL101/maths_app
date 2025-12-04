import RegisterForm from '../components/RegisterForm.jsx';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <div>
        <img src='/cool_dog.jpg' alt="Cool Dog" />
        <h1>Register</h1>
      </div>
      
      <RegisterForm />

      <Link to='/'>Already have an account? Log in Here!</Link>
    </div>
  )
}

export default Register;