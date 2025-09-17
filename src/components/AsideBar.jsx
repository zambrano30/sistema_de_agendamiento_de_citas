import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function AsideBar() {
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
    <div className="relative">
      <div
        className={`fixed top-[80px] left-0 h-[calc(100vh-80px)] w-[200px] bg-secondary shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute -right-10 top-[50%] transform -translate-y-1/2 p-2 bg-secondary rounded-r-md shadow-md hover:bg-gray-50 focus:outline-none transition-colors duration-200"
        >
          {isOpen ? (
            <IoChevronBackOutline className="w-6 h-6 text-gray-600" />
          ) : (
            <IoChevronForwardOutline className="w-6 h-6 text-gray-600" />
          )}
        </button>

        <div className="p-6">
          <nav className="space-y-6">
            {menuOptions.map((option, index) => (
              <Link
                key={index}
                to={option.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center text-lg py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  location.pathname === option.to
                    ? "bg-terciary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{option.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 top-[80px] bg-black/20 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
}
