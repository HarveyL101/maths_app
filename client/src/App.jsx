import { Routes, Route } from 'react-router-dom';
import { Login, Register, Home, Profile, Practice, Learn, Help, TeacherPortal, Quiz } from './utils/index';
import RequireAuth from './auth/guards/RequireAuth';
import RequireRole from './auth/guards/RequireRole';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Routes protected by Authorisation */}
        <Route 
          path='/learn' 
          element={
            <RequireAuth>
              <Learn />
            </RequireAuth>
          } 
        />
        <Route 
          path='/home' 
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } 
        />
        <Route 
          path='/profile' 
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } 
        />
        <Route 
          path='/practice' 
          element={
            <RequireAuth>
              <Practice />
            </RequireAuth>
          } 
        />
        <Route 
          path='/help' 
          element={
            <RequireAuth>
              <Help />
            </RequireAuth>
          } 
        />
        <Route
          path='/quiz/:subtopicId'
          element={
            <RequireAuth>
              <Quiz />
            </RequireAuth>
          }
        />

        {/* Routes protected by Role */}
        <Route 
          path='/teacher-portal' 
          element={
            <RequireRole role="educator">
              <TeacherPortal />
            </RequireRole>
          } 
        />
      </Routes>
    </>
  )
}

export default App;
