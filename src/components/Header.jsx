import { useState } from 'react';
import NavBar from './NavBar'
import { CiLogout } from "react-icons/ci";

const HamburgerIcon = ({ isOpen }) => {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-6 gap-1.5">
      <span className={`w-6 h-0.5 bg-slate-600 transition-all duration-300 ${
        isOpen ? 'transform rotate-45 translate-y-2' : ''
      }`} />
      <span className={`w-6 h-0.5 bg-slate-600 transition-all duration-300 ${
        isOpen ? 'opacity-0' : ''
      }`} />
      <span className={`w-6 h-0.5 bg-slate-600 transition-all duration-300 ${
        isOpen ? 'transform -rotate-45 -translate-y-2' : ''
      }`} />
    </div>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary shadow-sm p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-semibold text-slate-950 logo">Pet care</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Hamburger button for mobile */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
          
          {/* Navigation and logout button */}
          <div className={`lg:flex items-center gap-4 ${isMenuOpen ? 'absolute top-full left-0 right-0 bg-white shadow-md' : 'hidden'}`}>
            <NavBar isMenuOpen={isMenuOpen} />
            <button className="p-2 lg:p-2 hover:bg-gray-100 rounded-lg lg:rounded-full transition-colors flex items-center gap-2 w-full lg:w-auto mx-4 lg:mx-0 mb-4 lg:mb-0">
              <CiLogout size={24} />
              <span className="lg:hidden">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
