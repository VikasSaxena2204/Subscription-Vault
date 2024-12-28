import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Importing user-related icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest('#navbarMenu') === null &&
        event.target.closest('#navbarToggle') === null
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full sticky top-0 bg-indigo-900 text-white px-6 py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-3xl font-extrabold italic text-red-600 hover:text-amber-500 transition duration-300"
          >
            SubscriptionVault
          </Link>
        </div>

        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/" className="hover:text-amber-500 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/subscription" className="hover:text-amber-500 transition duration-300">
              Subscription
            </Link>
          </li>
          <li>
            <Link to="/report" className="hover:text-amber-500 transition duration-300">
              Revenue
            </Link>
          </li>
        </ul>

        {/* Sign In / Sign Up Icon Buttons */}
        <div className="flex space-x-4 items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-lg text-white hover:text-amber-500 transition duration-300 transform hover:scale-110"
          >
            <FaSignInAlt />
            <span>Sign I</span>
          </Link>
          <Link
            to="/"
            className="flex items-center space-x-2 text-lg text-white hover:text-amber-500 transition duration-300 transform hover:scale-110"
          >
            <FaUserPlus />
            <span>Sign Up</span>
          </Link>
        </div>

        <button
          className="md:hidden text-3xl focus:outline-none"
          id="navbarToggle"
          aria-label="Toggle Menu"
          onClick={handleMenuToggle}
        >
          <span className="text-amber-500">&#9776;</span>
        </button>
      </div>

      <div
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-indigo-900 text-white py-4 px-4 rounded-lg shadow-md`}
        id="navbarMenu"
      >
        <ul className="flex flex-col space-y-6 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-amber-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/subscription"
              className="hover:text-amber-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Subscription
            </Link>
          </li>
          <li>
            <Link
              to="/report"
              className="hover:text-amber-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Revenue
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
