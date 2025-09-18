import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";
import AsideBar from "../components/AsideBar";
import Buttons from "../components/Buttons";
import Title from "../components/Title";

export default function RegisterCliente() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    telefono: "",
    direccion: ""
  });

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!formData.nombre || !formData.cedula || !formData.correo || !formData.telefono || !formData.direccion) {
        setError("Por favor completa todos los campos");
        return;
      }

      // Verificar que el usuario está autenticado
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Debes estar autenticado para registrar un cliente");
        navigate('/login');
        return;
      }

      // Guardar los datos en Firestore
      const clientesRef = collection(db, 'clientes');
      const clienteData = {
        ...formData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(clientesRef, clienteData);
      console.log('Cliente registrado con ID:', docRef.id);

      // Navegar a la siguiente página con el ID del cliente
      navigate('/register-pet', { state: { clienteId: docRef.id } });
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      setError('Error al registrar el cliente: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-12 h-full bg-primary mt-8 gap-6">  
      <Title text="Registro de Cliente"/>
      
      <form
        onSubmit={handleSubmit}
        className="bg-secondary w-full max-w-[300px] p-6 rounded-lg shadow-md flex flex-col gap-5"
      >
        <h3>Ingrese los datos del cliente</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm text-gray-600">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cedula" className="text-sm text-gray-600">Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.cedula}
            onChange={(e) => setFormData({...formData, cedula: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="correo" className="text-sm text-gray-600">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.correo}
            onChange={(e) => setFormData({...formData, correo: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="telefono" className="text-sm text-gray-600">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.telefono}
            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="direccion" className="text-sm text-gray-600">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.direccion}
            onChange={(e) => setFormData({...formData, direccion: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex gap-4 justify-center mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-terciary w-32 rounded-xl text-white py-2 cursor-pointer hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Registrando...</span>
              </div>
            ) : (
              "Registrar"
            )}
          </button>
          <button 
            type="button"
            onClick={() => {
              if (confirm('¿Está seguro que desea cancelar? Los datos no guardados se perderán.')) {
                navigate(-1);
              }
            }}
            disabled={isLoading}
            className="bg-terciary w-32 rounded-xl text-white py-2 cursor-pointer hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}