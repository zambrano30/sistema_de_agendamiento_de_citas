import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen w-full gap-6 sm:gap-8 lg:gap-10 px-4 pb-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center">¿Qué quiere hacer?</h2>
        <Link to="/register-user" className="bg-secondary w-full max-w-sm sm:w-80 h-16 sm:h-20 mx-4 flex justify-center items-center text-lg sm:text-xl rounded-4xl px-8 sm:px-12 transition-colors hover:bg-opacity-80">Registrar Usuario</Link>
        <Link to="/register-cliente" className="bg-secondary w-full max-w-sm sm:w-80 h-16 sm:h-20 mx-4 flex justify-center items-center text-lg sm:text-xl rounded-4xl px-8 sm:px-12 transition-colors hover:bg-opacity-80">Registrar Cliente</Link>
        <Link to="/register-pet" className="bg-secondary w-full max-w-sm sm:w-80 h-16 sm:h-20 mx-4 flex justify-center items-center text-lg sm:text-xl rounded-4xl px-8 sm:px-12 transition-colors hover:bg-opacity-80">Registrar Mascota</Link>
        <Link to="/add-products" className="bg-secondary w-full max-w-sm sm:w-80 h-16 sm:h-20 mx-4 flex justify-center items-center text-lg sm:text-xl rounded-4xl px-8 sm:px-12 transition-colors hover:bg-opacity-80">Agregar productos</Link>
        <Link to="/new-consultation" className="bg-secondary w-full max-w-sm sm:w-80 h-16 sm:h-20 mx-4 flex justify-center items-center text-lg sm:text-xl rounded-4xl px-8 sm:px-12 transition-colors hover:bg-opacity-80">Nueva consulta</Link>
        <Link to="/new-record" className="bg-secondary w-full max-w-sm sm:w-80 h-16 sm:h-20 mx-4 flex justify-center items-center text-lg sm:text-xl rounded-4xl px-8 sm:px-12 transition-colors hover:bg-opacity-80">Nuevo Expediente</Link>
      </main>
    </>
  );
}
