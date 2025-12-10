import { Routes, Route } from 'react-router-dom';
import { Login, Register, Home, Profile, Practice, Learn, Help } from './utils/index';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/help' element={<Help />} />
        <Route path='/' element={<Login />} />
        <Route path='/learn' element={<Learn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/practice' element={<Practice />} />
      </Routes>
    </>
  )
}

export default App;
