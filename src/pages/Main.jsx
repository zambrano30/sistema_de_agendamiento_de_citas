import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen w-screen gap-10 pb-0">
        <h2 className="text-3xl">¿Qué quiere hacer?</h2>
        <Link to="/register-cliente" className="bg-secondary w-80 h-25 mx-4 flex justify-center items-center text-xl rounded-4xl px-12">Registrar Cliente</Link>
        <Link to="/register-pet" className="bg-secondary w-80 h-25 mx-4 flex justify-center items-center text-xl rounded-4xl px-12">Registrar Mascota</Link>
        <Link to="/add-products" className="bg-secondary w-80 h-25 mx-4 flex justify-center items-center text-xl rounded-4xl px-12">Agregar productos</Link>
        <Link to="/new-consultation" className="bg-secondary w-80 h-25 mx-4 flex justify-center items-center text-xl rounded-4xl px-12">Nueva consulta</Link>
        <Link to="/new-record" className="bg-secondary w-80 h-25 mx-4 flex justify-center items-center text-xl rounded-4xl px-12">Nuevo Expediente</Link>
      </main>
    </>
  );
}
