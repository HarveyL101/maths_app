import { Routes, Route } from 'react-router-dom';
import { Login, Register, Home, Profile } from './utils/index';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
