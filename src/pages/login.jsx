import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setIsLoading(true); // Iniciar estado de carga
    
    try {
      const { email, password } = formData;
      
      // Validaciones básicas
      if (!email || !password) {
        setError("Por favor completa todos los campos");
        setIsLoading(false);
        return;
      }

      // Intentar iniciar sesión
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        // Login exitoso
        console.log("Login exitoso:", userCredential.user.email);
        navigate("/register-customer");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
      // Manejar errores específicos
      switch (error.code) {
        case "auth/invalid-email":
          setError("El correo electrónico no es válido");
          break;
        case "auth/user-not-found":
          setError("No existe una cuenta con este correo electrónico");
          break;
        case "auth/wrong-password":
          setError("Contraseña incorrecta");
          break;
        default:
          setError("Error al iniciar sesión: " + error.message);
      }
    } finally {
      setIsLoading(false); // Finalizar estado de carga
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center w-full gap-4 sm:gap-5 bg-primary px-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-slate-950 font-semibold text-center">Pet care</h2>
      <img src="/logo.png" alt="Pet Care Logo" className="w-24 h-24 sm:w-32 sm:h-32 object-contain" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8 w-full max-w-sm px-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-600">Correo Electrónico</label>
          <input
            className="bg-white border border-gray-300 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="usuario@ejemplo.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-gray-600">Contraseña</label>
          <input
            className="bg-white border border-gray-300 text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Iniciando sesión...
            </div>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </form>
    </section>
  );
}
