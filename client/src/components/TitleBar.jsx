import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex'; 

const TitleBar = () => {
  const { user, hasRole, isLoading } = useAuth();

  console.log("User:", user);
  console.log("Roles:", user?.roles);
  console.log("Has educator:", hasRole('educator'));

  if (isLoading) return null;
  return (
    <div className="w-full">
      {/* --- Top Row --- */}
      <div className="flex items-center justify-between w-full px-4 py-2">

        {/* Left: logo */}
        <Link to='/home'>
          <img 
            className='object-contain w-20 border border-gray-700 rounded-full p-1 shadow-lg hover:shadow-3xl transition-shadow duration-200 cursor-pointer' 
            src="/logo.png" 
            alt="App Logo" 
            title='Press me for the homepage!'
          />
        </Link>
        {/* Center: title */}
        <h1 className='text-2xl font-bold flex-1'>
          <BlockMath math={`
            \\utilde{Number Ninjas}
            \\left( \\overset{\\thicksim}{\\odot} \\; \\underlinesegment{} \\;  \\overset{\\thicksim}{\\odot} \\right) \\; 
          `}/>
        </h1>

        {/* Right: profile picture */}
        <Link to='/profile'>
          <img 
            className='object-contain w-20 border border-gray-700 rounded-full p-1 shadow-lg hover:shadow-3xl transition-shadow duration-200 cursor-pointer'
            src="/pfps/default_pfp.png" 
            alt="Profile Picture" 
            title='Press me to see your profile!'
          />
        </Link>

      </div>

      <nav className='w-full border-t pt-0.5'>
        <ul className='flex justify-center gap-4 text-lg'>
          <Link to='/home'><li className='nav-item text-blue-500 border solid-blue-500 hover:bg-blue-500 hover:text-white transition'>Home</li></Link>
          <Link to='/practice'><li className='nav-item text-orange-400 border solid-orange-400 hover:bg-orange-400 hover:text-white transition'>Practice</li></Link>
          <Link to='/learn'><li className='nav-item text-green-700 border solid-green-700 hover:bg-green-700 hover:text-white transition'>Learn</li></Link>
          <Link to='/help'><li className='nav-item text-purple-500 border solid-purple-500 hover:bg-purple-500 hover:text-white transition'>Tips & Help</li></Link>
          {hasRole('educator') && (
            <Link to="/teacher-portal">
              <li className='nav-item text-indigo-800 border solid-indigo-800 hover:bg-indigo-800 hover:text-white transition'>
                Teacher Portal
              </li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default TitleBar;