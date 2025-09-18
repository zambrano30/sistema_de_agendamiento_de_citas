import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../libs/firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import Title from "../components/Title";
import AsideBar from "../components/AsideBar";
import HamburgerMenu from "../components/HamburgerMenu";

export default function ScheduleConsult() {
  const navigate = useNavigate();
  const location = useLocation();
  const clienteId = location.state?.clienteId;
  const mascotaId = location.state?.mascotaId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientData, setClientData] = useState(null);
  const [petData, setPetData] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    veterinarian: "",
    motivo: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!clienteId || !mascotaId) return;

      try {
        setIsLoading(true);
        // Obtener datos del cliente
        const clienteDoc = await getDoc(doc(db, 'clientes', clienteId));
        if (clienteDoc.exists()) {
          setClientData(clienteDoc.data());
        }

        // Obtener datos de la mascota
        const mascotaDoc = await getDoc(doc(db, 'mascotas', mascotaId));
        if (mascotaDoc.exists()) {
          setPetData(mascotaDoc.data());
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError('Error al cargar los datos del cliente y mascota');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [clienteId, mascotaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!formData.date || !formData.time || !formData.veterinarian || !formData.motivo) {
        setError("Por favor completa todos los campos");
        return;
      }

      // Verificar que el usuario está autenticado
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Debes estar autenticado para agendar una consulta");
        navigate('/login');
        return;
      }

      // Verificar que tenemos los datos necesarios
      if (!clienteId || !mascotaId) {
        setError("No se encontró la información del cliente o mascota");
        navigate('/register-customer');
        return;
      }

      // Crear la consulta en Firestore
      const consultasRef = collection(db, 'consultas');
      const consultaData = {
        clienteId,
        mascotaId,
        userId: currentUser.uid,
        fecha: formData.date,
        hora: formData.time,
        veterinario: formData.veterinarian,
        motivo: formData.motivo,
        estado: 'pendiente',
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(consultasRef, consultaData);
      console.log('Consulta agendada con ID:', docRef.id);

      // Navegar a la página de consultas
      navigate('/cancel-consult', { 
        state: { 
          message: 'Consulta agendada exitosamente'
        }
      });
    } catch (error) {
      console.error('Error al agendar consulta:', error);
      setError('Error al agendar la consulta: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Title text="Nueva Consulta" />
      <HamburgerMenu />
      <div className="flex flex-1">
        {/* AsideBar solo visible en desktop */}
        <div className="hidden lg:flex flex-col items-end px-4 md:px-12 bg-primary mt-2 gap-6 h-full">
          <AsideBar className="h-full" />
        </div>
        {/* Contenedor principal - ocupa todo el ancho en móvil, flex-1 en desktop */}
        <div className="flex-1 flex flex-col items-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 bg-primary mt-2 gap-4 h-full">

        <form
          onSubmit={handleSubmit}
          className="bg-secondary w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3 sm:p-4 md:p-6 rounded-lg shadow-md flex flex-col gap-4 mt-2 sm:mt-3 md:mt-4 mx-auto"
        >
        <h3>Ingrese los datos de la consulta</h3>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {clientData && (
          <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm">
            <p><strong>Cliente:</strong> {clientData.nombre}</p>
            <p><strong>Mascota:</strong> {petData?.nombreMascota}</p>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm text-gray-600">
            Fecha
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
            Hora
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

        <div className="flex flex-col gap-1">
          <label htmlFor="motivo" className="text-sm text-gray-600">
            Motivo de la consulta
          </label>
          <textarea
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={(e) => setFormData({...formData, motivo: e.target.value})}
            className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            rows={3}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-end mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-terciary w-full sm:w-32 px-4 py-2 rounded-xl text-white cursor-pointer hover:bg-blue-600 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Agendando...</span>
              </div>
            ) : (
              "Agendar"
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
            className="bg-terciary w-full sm:w-32 px-4 py-2 rounded-xl text-white cursor-pointer hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
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