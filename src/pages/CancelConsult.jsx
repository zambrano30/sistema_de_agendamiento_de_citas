import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../libs/firebase";
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import AsideBar from "../components/AsideBar";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import HamburgerMenu from "../components/HamburgerMenu";

export default function CancelConsult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(location.state?.message || "");
  const [consultas, setConsultas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadConsultas();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const loadConsultas = async () => {
    setIsLoading(true);
    setError("");
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Debes estar autenticado para ver las consultas");
        navigate('/login');
        return;
      }

      const consultasRef = collection(db, 'consultas');
      const q = query(
        consultasRef,
        where('userId', '==', currentUser.uid),
        orderBy('fecha', 'asc'),
        orderBy('hora', 'asc')
      );

      const querySnapshot = await getDocs(q);
      const consultasData = [];
      
      // Obtener todos los IDs únicos de clientes y mascotas
      const clientesIds = new Set();
      const mascotasIds = new Set();
      querySnapshot.forEach(doc => {
        const data = doc.data();
        clientesIds.add(data.clienteId);
        mascotasIds.add(data.mascotaId);
      });

      // Obtener datos de clientes
      const clientesPromises = Array.from(clientesIds).map(id => 
        doc(db, 'clientes', id).get()
      );
      const clientesSnapshots = await Promise.all(clientesPromises);
      const clientesData = {};
      clientesSnapshots.forEach(snapshot => {
        if (snapshot.exists()) {
          clientesData[snapshot.id] = snapshot.data();
        }
      });

      // Obtener datos de mascotas
      const mascotasPromises = Array.from(mascotasIds).map(id =>
        doc(db, 'mascotas', id).get()
      );
      const mascotasSnapshots = await Promise.all(mascotasPromises);
      const mascotasData = {};
      mascotasSnapshots.forEach(snapshot => {
        if (snapshot.exists()) {
          mascotasData[snapshot.id] = snapshot.data();
        }
      });

      // Combinar todos los datos
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const cliente = clientesData[data.clienteId] || {};
        const mascota = mascotasData[data.mascotaId] || {};
        
        consultasData.push({
          id: doc.id,
          namePet: mascota.nombreMascota || 'N/A',
          nameOwner: cliente.nombre || 'N/A',
          date: data.fecha,
          time: data.hora,
          veterinarian: data.veterinario,
          status: data.estado,
          reason: data.motivo,
          petType: mascota.especie || 'N/A',
          breed: mascota.raza || 'N/A'
        });
      });

      setConsultas(consultasData);
    } catch (error) {
      console.error('Error al cargar consultas:', error);
      setError('Error al cargar las consultas: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelConsult = async (consultaId) => {
    if (!confirm('¿Está seguro que desea cancelar esta consulta?')) return;

    setIsLoading(true);
    setError("");
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Debes estar autenticado para cancelar una consulta");
        navigate('/login');
        return;
      }

      const consultaRef = doc(db, 'consultas', consultaId);
      await updateDoc(consultaRef, {
        estado: 'cancelada',
        canceladaEn: new Date().toISOString(),
        canceladaPor: currentUser.uid
      });

      setSuccess('Consulta cancelada exitosamente');
      loadConsultas(); // Recargar la lista
    } catch (error) {
      console.error('Error al cancelar consulta:', error);
      setError('Error al cancelar la consulta: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReschedule = (consultaId) => {
    navigate('/reschedule-consult', { state: { consultaId } });
  };

  // Calcular páginas
  const totalPages = Math.ceil(consultas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConsultas = consultas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col h-full">
      <Title text="Gestión de Consultas" />
      <HamburgerMenu />
      <div className="flex flex-1">
        <div className="hidden lg:flex flex-col items-end px-4 md:px-12 bg-primary mt-2 gap-6 h-full">
          <AsideBar className="h-full" />
        </div>
        <div className="flex-1 flex flex-col items-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 bg-primary mt-2 gap-4 h-full">

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mx-auto">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg text-sm mx-auto">
          {success}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : consultas.length === 0 ? (
        <div className="text-gray-600 text-center">
          No hay consultas programadas
        </div>
      ) : (
        <div className="w-full max-w-full sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Mascota</th>
                <th className="py-2 px-4 text-left">Dueño</th>
                <th className="py-2 px-4 text-left">Fecha</th>
                <th className="py-2 px-4 text-left">Hora</th>
                <th className="py-2 px-4 text-left">Veterinario</th>
                <th className="py-2 px-4 text-left">Estado</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentConsultas.map((consulta) => (
                <tr key={consulta.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{consulta.namePet}</td>
                  <td className="py-2 px-4">{consulta.nameOwner}</td>
                  <td className="py-2 px-4">{consulta.date}</td>
                  <td className="py-2 px-4">{consulta.time}</td>
                  <td className="py-2 px-4">{consulta.veterinarian}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      consulta.status === 'cancelada' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {consulta.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {consulta.status !== 'cancelada' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReschedule(consulta.id)}
                          disabled={isLoading}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          Reagendar
                        </button>
                        <button
                          onClick={() => handleCancelConsult(consulta.id)}
                          disabled={isLoading}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
      </div>
    </div>
    </div>
  );
}