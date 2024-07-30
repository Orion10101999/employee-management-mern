import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-300'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3 gap-4'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Settyl
        </span>
      </Link>
          <Link to='/'>
            <p>Home</p>
          </Link>
          <Link to='/about'>
            <p>About</p>
          </Link>
        
          <div className='flex gap-6'>
            {currentUser ? (<>
          <Link to='/employees'>
              <p>Employees</p>
          </Link>
          <Link to='/profile'>
              <p>{currentUser.rest.name}</p>

          </Link>
          <Link to='/log-out'>
              <p>Log Out</p>
          </Link>
            
            </>
            ) : (
              <Link to='/log-in'>
                  <p>Log In</p>
              </Link>
            )}
          </div>
        
      </div>
    </div>
  );
}