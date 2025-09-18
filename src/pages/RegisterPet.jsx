import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../libs/firebase";
import { collection, addDoc } from "firebase/firestore";
import AsideBar from "../components/AsideBar";
import Title from "../components/Title";
import HamburgerMenu from "../components/HamburgerMenu";

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
    color: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (
        !formData.nombreMascota ||
        !formData.especie ||
        !formData.raza ||
        !formData.edad ||
        !formData.color
      ) {
        setError("Por favor completa todos los campos");
        return;
      }

      // Verificar que el usuario está autenticado
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Debes estar autenticado para registrar una mascota");
        navigate("/login");
        return;
      }

      // Verificar que tenemos el ID del cliente
      if (!clienteId) {
        setError(
          "No se encontró la información del cliente. Por favor registra el cliente primero."
        );
        navigate("/register-customer");
        return;
      }

      // Guardar los datos en Firestore
      const mascotasRef = collection(db, "mascotas");
      const mascotaData = {
        ...formData,
        clienteId,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(mascotasRef, mascotaData);
      console.log("Mascota registrada con ID:", docRef.id);

      // Navegar a la siguiente página
      navigate("/schedule-consult", {
        state: {
          clienteId,
          mascotaId: docRef.id,
        },
      });
    } catch (error) {
      console.error("Error al registrar mascota:", error);
      setError("Error al registrar la mascota: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Title text="Registro de Mascota" />
      <HamburgerMenu />
      <div className="flex flex-1">
        {/* AsideBar solo visible en desktop */}
        <div className="hidden lg:flex flex-col items-end px-4 md:px-12 bg-primary mt-2 gap-6 h-full">
          <AsideBar />
        </div>
        {/* Contenedor principal - ocupa todo el ancho en móvil, flex-1 en desktop */}
        <div className="flex-1 flex flex-col items-center px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 bg-primary mt-2 gap-4 h-full">

        <form
          onSubmit={handleSubmit}
          className="bg-secondary w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3 sm:p-4 md:p-6 rounded-lg shadow-md flex flex-col gap-4 mt-2 sm:mt-3 md:mt-4 mx-auto"
        >
            <h3>Ingrese los datos de la mascota</h3>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="nombreMascota" className="text-sm text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                id="nombreMascota"
                name="nombreMascota"
                className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={formData.nombreMascota}
                onChange={(e) =>
                  setFormData({ ...formData, nombreMascota: e.target.value })
                }
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="especie" className="text-sm text-gray-600">
                Especie
              </label>
              <input
                type="text"
                id="especie"
                name="especie"
                className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={formData.especie}
                onChange={(e) =>
                  setFormData({ ...formData, especie: e.target.value })
                }
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="raza" className="text-sm text-gray-600">
                Raza
              </label>
              <input
                type="text"
                id="raza"
                name="raza"
                className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={formData.raza}
                onChange={(e) =>
                  setFormData({ ...formData, raza: e.target.value })
                }
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="edad" className="text-sm text-gray-600">
                Edad
              </label>
              <input
                type="number"
                id="edad"
                name="edad"
                className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={formData.edad}
                onChange={(e) =>
                  setFormData({ ...formData, edad: e.target.value })
                }
                disabled={isLoading}
                required
                min="0"
                max="100"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="color" className="text-sm text-gray-600">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                className="bg-white border border-gray-300 text-black w-full py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-terciary focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
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
                    <span>Registrando...</span>
                  </div>
                ) : (
                  "Registrar"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      "¿Está seguro que desea cancelar? Los datos no guardados se perderán."
                    )
                  ) {
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
