import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({ isMenuOpen }) {
  return (
    <nav className={`w-full lg:w-auto ${isMenuOpen ? 'block' : 'lg:block'}`}>
      <ul className={`flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 p-4 lg:p-0`}>
        <li>
          <Link 
            to="/consulta" 
            className="block text-slate-600 hover:text-slate-900 font-medium transition-colors py-2 lg:py-0"
          >
            Consultas
          </Link>
        </li>
        <li>
          <Link 
            to="/agendamiento" 
            className="block text-slate-600 hover:text-slate-900 font-medium transition-colors py-2 lg:py-0"
          >
            Agendamiento
          </Link>
        </li>
        <li>
          <Link 
            to="/productos" 
            className="block text-slate-600 hover:text-slate-900 font-medium transition-colors py-2 lg:py-0"
          >
            Productos
          </Link>
        </li>
        <li>
          <Link 
            to="/informes" 
            className="block text-slate-600 hover:text-slate-900 font-medium transition-colors py-2 lg:py-0"
          >
            Informes
          </Link>
        </li>
      </ul>
    </nav>
  )
}
