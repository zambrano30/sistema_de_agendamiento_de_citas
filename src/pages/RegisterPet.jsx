import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";
import Title from "../components/Title";

export default function RegisterPet() {
  const navigate = useNavigate();
  const location = useLocation();
  const clienteId = location.state?.clienteId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombreMascota: "",
    especie: "",
    raza: "",
    edad: "",
    color: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!formData.nombreMascota || !formData.especie || !formData.raza || !formData.edad || !formData.color) {
        setError("Por favor completa todos los campos");
        return;
      }

      // Verificar que el usuario está autenticado
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Debes estar autenticado para registrar una mascota");
        navigate('/login');
        return;
      }

      // Verificar que tenemos el ID del cliente
      if (!clienteId) {
        setError("No se encontró la información del cliente. Por favor registra el cliente primero.");
        navigate('/register-customer');
        return;
      }

      // Guardar los datos en Firestore
      const mascotasRef = collection(db, 'mascotas');
      const mascotaData = {
        ...formData,
        clienteId,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(mascotasRef, mascotaData);
      console.log('Mascota registrada con ID:', docRef.id);

      // Navegar a la siguiente página
      navigate('/schedule-consult', { 
        state: { 
          clienteId,
          mascotaId: docRef.id 
        }
      });
    } catch (error) {
      console.error('Error al registrar mascota:', error);
      setError('Error al registrar la mascota: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-12 h-full bg-primary mt-8 gap-6">
      <Title text="Registro de Mascota" />
      
      <form
        onSubmit={handleSubmit}
        className="bg-secondary w-full max-w-[300px] p-6 rounded-lg shadow-md flex flex-col gap-5"
      >
        <h3>Ingrese los datos de la mascota</h3>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="nombreMascota" className="text-sm text-gray-600">Nombre</label>
          <input
            type="text"
            id="nombreMascota"
            name="nombreMascota"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.nombreMascota}
            onChange={(e) => setFormData({...formData, nombreMascota: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="especie" className="text-sm text-gray-600">Especie</label>
          <input
            type="text"
            id="especie"
            name="especie"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.especie}
            onChange={(e) => setFormData({...formData, especie: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="raza" className="text-sm text-gray-600">Raza</label>
          <input
            type="text"
            id="raza"
            name="raza"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.raza}
            onChange={(e) => setFormData({...formData, raza: e.target.value})}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="edad" className="text-sm text-gray-600">Edad</label>
          <input
            type="number"
            id="edad"
            name="edad"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.edad}
            onChange={(e) => setFormData({...formData, edad: e.target.value})}
            disabled={isLoading}
            required
            min="0"
            max="100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="color" className="text-sm text-gray-600">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
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