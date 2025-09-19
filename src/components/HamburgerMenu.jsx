import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Define menu options based on current path
  const getMenuOptions = () => {
    const path = location.pathname;

    if (path.includes("consult")) {
      return [
        { to: "/schedule-consult", label: "Nueva Consulta" },
        { to: "/reschedule-consult", label: "Reagendar Consulta" },
        { to: "/cancel-consult", label: "Cancelar Consulta" },
      ];
    }

    // Default menu options
    return [
      { to: "/register-customer", label: "Registrar Cliente" },
      { to: "/register-pet", label: "Registrar Mascota" },
      { to: "/search", label: "Buscar" },
    ];
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuOptions = getMenuOptions();

  return (
    <div className="lg:hidden relative w-full flex justify-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
      {/* Menú hamburguesa con mismo ancho que los formularios */}
      <div className=" mt-2 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg">
        <div className="h-12 sm:h-14 md:h-16 flex items-center justify-start px-2 sm:px-3 md:px-4">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <HiX className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            ) : (
              <HiMenu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Menú desplegable */}
        {isOpen && (
          <div className="border-t border-gray-200 bg-white shadow-lg rounded-b-lg">
            <nav className="py-1">
              {menuOptions.map((option, index) => (
                <Link
                  key={index}
                  to={option.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm sm:text-base font-medium transition-colors duration-200 ${
                    location.pathname === option.to
                      ? "bg-terciary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}