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

  // Efecto para controlar el scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Limpieza al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuOptions = getMenuOptions();

  return (
    <>
      {/* Mobile sidebar - ocultable */}
      <div className="lg:hidden relative">
        {/* Botón toggle - siempre visible */}
        <button
          onClick={toggleMenu}
          className={`fixed top-[50%] z-30 p-2 bg-secondary rounded-r-md shadow-md hover:bg-gray-50 focus:outline-none transition-colors duration-200 transform -translate-y-1/2 ${
            isOpen ? 'left-[200px]' : 'left-0'
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <IoChevronBackOutline className="w-6 h-6 text-gray-600" />
          ) : (
            <IoChevronForwardOutline className="w-6 h-6 text-gray-600" />
          )}
        </button>

        {/* Sidebar móvil */}
        <div
          className={`fixed top-[80px] left-0 h-[calc(100vh-160px)] w-[200px] bg-secondary shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 mt-2">
            <nav className="space-y-4">
              {menuOptions.map((option, index) => (
                <Link
                  key={index}
                  to={option.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center text-[13px] py-3 px-4 rounded-lg font-medium transition-colors duration-200  ${
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

        {/* Overlay mejorado */}
        {isOpen && (
          <div
            className="fixed inset-0 top-[80px] z-10 bg-black bg-opacity-50"
            onClick={toggleMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>

      {/* Desktop sidebar - siempre visible */}
      <div className="hidden lg:block w-[200px] mr-8 h-full ">
        <div className="bg-secondary shadow-lg rounded-lg p-4 h-full">
          <nav className="space-y-4">
            {menuOptions.map((option, index) => (
              <Link
                key={index}
                to={option.to}
                className={`flex items-center text-[13px] py-3 px-4 rounded-lg font-medium transition-colors duration-200  ${
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
    </>
  );
}
