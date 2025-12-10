import { Link } from 'react-router-dom';

const TitleBar = () => {
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
        <h1 className='text-2xl font-bold text-center flex-1'><u>Number Ninjas</u></h1>

        {/* Right: profile picture */}
        <Link to='/profile'>
          <img 
            className='object-contain w-20 border border-gray-700 rounded-full p-1 shadow-lg hover:shadow-3xl transition-shadow duration-200 cursor-pointer'
            src="/default_pfp.png" 
            alt="Profile Picture" 
            title='Press me to see your profile!'
          />
        </Link>
      </div>

        <nav className='w-full border-t pt-0.5'>
          <ul className='flex justify-center gap-4 text-lg'>
            <li className='nav-item text-blue-500 border solid-blue-500 hover:bg-blue-500 hover:text-white transition'><Link to='/home'>Home</Link></li>
            <li className='nav-item text-orange-400 border solid-orange-400 hover:bg-orange-400 hover:text-white transition'><Link to='/practice'>Practice</Link></li>
            <li className='nav-item text-green-700 border solid-green-700 hover:bg-green-700 hover:text-white transition'><Link to="/learn">Learn</Link></li>
            <li className='nav-item text-purple-500 border solid-purple-500 hover:bg-purple-500 hover:text-white transition'><Link to="/help">Tips & Help</Link></li>
          </ul>
        </nav>
      </div>
  );
};

export default TitleBar;