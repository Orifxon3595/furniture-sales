import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

function Navbar() {
  const { amount } = useSelector((data) => data.shop);
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const changeMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <div>
      <header className='bg-neutral py-2'>
        <div className='max-w-6xl mx-auto flex justify-end items-start gap-5 text-white'>
          <Link>Sign in / Guest</Link>
          <Link>Create Account</Link>
        </div>
      </header>
      <nav className='bg-base-200 py-2'>
        <div className='max-w-6xl mx-auto flex justify-between items-center '>
          <div>
            <Link className='btn btn-primary text-3xl'>C</Link>
          </div>
          <div>
            <ul className='flex gap-2'>
              <li className='px-4 py-2'><Link to="/">Home</Link></li>
              <li className='px-4 py-2'><Link to="/About">About</Link></li>
              <li className='px-4 py-2'><Link to="/Products">Product</Link></li>
              <li className='px-4 py-2'><Link to="/Cart">Cart</Link></li>
            </ul>
          </div>
          <div className='flex gap-3 items-center'>
            <div onClick={changeMode}>
              {mode === 'light' ? <MdDarkMode className='text-xl' /> : <MdLightMode className='text-xl' />}
            </div>
            <div className="indicator">
              <span className="indicator-item badge badge-secondary">{amount}</span>
              <button className="m-2 join-item">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;