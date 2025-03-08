import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and brand name */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M16 2 L2 30 L30 30 Z" fill="#2563eb" />
                <path d="M16 8 L8 26 L24 26 Z" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-semibold">ArguMate</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/home" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Welcome, {user.firstName}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <button onClick={() => handleNavigation("/login")} className="px-4 py-2 border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white rounded-md transition-colors">Log In</button>
                <button onClick={() => handleNavigation("/signup")} className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-md transition-colors">Sign Up</button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100">
              {!isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-3 py-2 space-y-2 bg-white shadow-lg border-t">
          <a href="#features" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="/about" className="block text-gray-600 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>About</a>
          {isSignedIn ? (
            <div className="flex flex-col gap-2">
              <span className="text-gray-600">Welcome, {user.firstName}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button onClick={() => handleNavigation("/login")} className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white rounded-md transition-colors">Log In</button>
              <button onClick={() => handleNavigation("/signup")} className="w-full px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-md transition-colors">Sign Up</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
