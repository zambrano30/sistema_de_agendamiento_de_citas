import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cedula: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí irá la lógica de autenticación
      navigate("/main");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <section className="min-h-dvh flex flex-col justify-center items-center min-w-screen gap-5 bg-gray-50">
      <h2 className="text-4xl text-slate-950 font-semibold">Pet care</h2>
      <img src="/logo.png" alt="Pet Care Logo" className="w-32 h-32 object-contain" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-20 w-full max-w-sm px-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="cedula" className="text-sm text-gray-600">Cédula</label>
          <input
            className="bg-white border border-gray-300 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-gray-600">Contraseña</label>
          <input
            className="bg-white border border-gray-300 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <span className="text-center text-blue-600 hover:text-blue-800 cursor-pointer transition-colors">
          ¿Olvidaste la contraseña?
        </span>
        <button 
          type="submit"
          className="bg-blue-600 text-white px-16 py-2 mx-8 hover:bg-blue-700 rounded-full transition-colors font-medium shadow-sm">
          Entrar
        </button>
      </form>
    </section>
  );
}
