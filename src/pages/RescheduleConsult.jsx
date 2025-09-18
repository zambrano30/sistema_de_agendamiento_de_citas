import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../libs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Title from "../components/Title";
import AsideBar from "../components/AsideBar";
import HamburgerMenu from "../components/HamburgerMenu";

export default function RescheduleConsult() {
  const navigate = useNavigate();
  const location = useLocation();
  const consultaId = location.state?.consultaId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [consultaData, setConsultaData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [petData, setPetData] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    veterinarian: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!consultaId) {
        setError("No se encontró la consulta a reagendar");
        return;
      }

      try {
        setIsLoading(true);
        // Obtener datos de la consulta
        const consultaDoc = await getDoc(doc(db, 'consultas', consultaId));
        if (consultaDoc.exists()) {
          const data = consultaDoc.data();
          setConsultaData(data);
          setFormData({
            date: data.fecha,
            time: data.hora,
            veterinarian: data.veterinario
          });

          // Obtener datos del cliente
          const clienteDoc = await getDoc(doc(db, 'clientes', data.clienteId));
          if (clienteDoc.exists()) {
            setClientData(clienteDoc.data());
          }

          // Obtener datos de la mascota
          const mascotaDoc = await getDoc(doc(db, 'mascotas', data.mascotaId));
          if (mascotaDoc.exists()) {
            setPetData(mascotaDoc.data());
          }
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError('Error al cargar los datos de la consulta');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [consultaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!formData.date || !formData.time || !formData.veterinarian) {
        setError("Por favor completa todos los campos");
        return;
      }

      // Verificar que el usuario está autenticado
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Debes estar autenticado para reagendar una consulta");
        navigate('/login');
        return;
      }

      // Verificar que tenemos el ID de la consulta
      if (!consultaId) {
        setError("No se encontró la consulta a reagendar");
        navigate('/cancel-consult');
        return;
      }

      // Actualizar la consulta en Firestore
      const consultaRef = doc(db, 'consultas', consultaId);
      await updateDoc(consultaRef, {
        fecha: formData.date,
        hora: formData.time,
        veterinario: formData.veterinarian,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser.uid
      });

      console.log('Consulta reagendada:', consultaId);

      // Navegar a la página de consultas
      navigate('/cancel-consult', { 
        state: { 
          message: 'Consulta reagendada exitosamente'
        }
      });
    } catch (error) {
      console.error('Error al reagendar consulta:', error);
      setError('Error al reagendar la consulta: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!consultaId) {
    return (
      <div className="flex flex-col h-full">
        <Title text="Reagendar Consulta" />
        <div className="flex flex-1">
          <div className="hidden lg:flex flex-col items-end px-4 md:px-12 h-full bg-primary mt-2 gap-6 h-full">
            <AsideBar className="h-full" />
          </div>
          <div className="flex-1 flex flex-col items-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 h-full bg-primary mt-2 gap-4 h-full">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mx-auto">
              No se encontró la consulta a reagendar
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Title text="Reagendar Consulta" />
      <HamburgerMenu />
      <div className="flex flex-1">
        <div className="hidden lg:flex flex-col items-end px-4 md:px-12 h-full bg-primary mt-2 gap-6 h-full">
          <AsideBar className="h-full" />
        </div>
        <div className="flex-1 flex flex-col items-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 h-full bg-primary mt-2 gap-4 h-full">
        
        <form
          onSubmit={handleSubmit}
          className="bg-secondary w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3 sm:p-4 md:p-6 rounded-lg shadow-md flex flex-col gap-4 mt-2 sm:mt-3 md:mt-4 mx-auto"
        >
        <h3>Reagendar Consulta</h3>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {clientData && petData && (
          <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm">
            <p><strong>Cliente:</strong> {clientData.nombre}</p>
            <p><strong>Mascota:</strong> {petData.nombreMascota}</p>
            <p><strong>Motivo:</strong> {consultaData?.motivo}</p>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm text-gray-600">
            Nueva Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="time" className="text-sm text-gray-600">
            Nueva Hora
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="veterinarian" className="text-sm text-gray-600">
            Veterinario
          </label>
          <input
            type="text"
            id="veterinarian"
            name="veterinarian"
            value={formData.veterinarian}
            onChange={(e) => setFormData({...formData, veterinarian: e.target.value})}
            className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-terciary w-32 rounded-xl text-white py-2 cursor-pointer hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Actualizando...</span>
              </div>
            ) : (
              "Reagendar"
            )}
          </button>
          <button 
            type="button"
            onClick={() => {
              if (confirm('¿Está seguro que desea cancelar? Los cambios no guardados se perderán.')) {
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
    </div>
    </div>
  );
}