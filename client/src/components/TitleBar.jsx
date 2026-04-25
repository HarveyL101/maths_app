import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex'; 

const TitleBar = () => {
  const { user, hasRole, isLoading } = useAuth();

  // console.log("User:", user);
  // console.log("Roles:", user?.roles);
  // console.log("Has educator:", hasRole('educator'));

  if (isLoading) return null;
  return (
    <div className="titlebar-wrapper">
      {/* --- Top Row --- */}
      <div className="upper-container">

        {/* Left: logo */}
        <Link className='home-icon' to='/home'>
          <img 
            src="/logo.png" 
            alt="App Logo" 
            title='Press me for the homepage!'
          />
        </Link>
        {/* Center: title */}
        <h1 className='app-title'>
          <BlockMath math={`
            \\utilde{Number \\ Ninjas}
          `}/>
        </h1>

        {/* Right: profile picture */}
        <Link className='profile-icon' to='/profile'>
          <img 
            src="/default_pfp.png" 
            alt="Profile Picture" 
            title='Press me to see your profile!'
          />
        </Link>
      </div>
{/* order is blue, orange, green, purple and navy-blue */}
      <nav className='nav-container'>
        <ul className='nav-list'>
          <Link to='/home'>
            <li className='
              nav-list-item 
              text-white 
              border-2 border-blue-300 
              bg-blue-500
              hover:bg-white
              hover:text-blue-700 
              transition duration-200
          '>Home</li>
          </Link>

          <Link to='/practice'>
            <li className='
              nav-list-item 
              text-white 
              border-2 border-orange-300 
              bg-orange-400
              hover:bg-white
              hover:text-orange-500 
              transition duration-200
            '>Practice</li>
          </Link>

          <Link to='/learn'>
            <li className='
              nav-list-item 
              text-white 
              border-2 border-green-500
              bg-green-700
              hover:bg-white
              hover:text-green-500 
              transition duration-200
            '>Learn</li>
          </Link>

          <Link to='/help'>
            <li className='
              nav-list-item 
              text-white 
              border-2 border-purple-500
              bg-light-purple
              hover:bg-white
              hover:text-light-purple 
              transition duration-200    
            '>Tips & Help</li>
          </Link>

          {hasRole('educator') && (
            <Link to="/teacher-portal">
              <li className='
                nav-list-item 
                text-white 
                border-2 border-indigo-600
                bg-indigo-800
                hover:bg-white
                hover:text-indigo-800
                transition duration-200
              '>Teacher Portal</li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default TitleBar;