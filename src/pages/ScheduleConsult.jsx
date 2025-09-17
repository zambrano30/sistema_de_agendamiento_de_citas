import { useState } from 'react';
import Title from '../components/Title';
import AsideBar from '../components/AsideBar';

export default function ScheduleConsult() {
  const [formData, setFormData] = useState({
    petName: '',
    clientName: '',
    date: '',
    time: '',
    veterinarian: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-12 h-full bg-primary mt-8 gap-6">
      <Title text="Nueva Consulta" />
      <AsideBar />
      <form
        onSubmit={handleSubmit}
        className="bg-secondary w-full max-w-[300px] p-6 rounded-lg shadow-md flex flex-col gap-5"
      >
        <h3>Ingrese los datos de la consulta</h3>
        <div className="flex flex-col gap-1">
          <label htmlFor="petName" className="text-sm text-gray-600">Nombre de la mascota</label>
          <input
            type="text"
            id="petName"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            required
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="clientName" className="text-sm text-gray-600">Nombre del Cliente</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm text-gray-600">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="time" className="text-sm text-gray-600">Hora</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="veterinarian" className="text-sm text-gray-600">Veterinario</label>
          <select
            id="veterinarian"
            name="veterinarian"
            value={formData.veterinarian}
            onChange={handleChange}
            required
            className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
          >
            <option value="">Seleccione un veterinario</option>
            <option value="vet1">Dr. García</option>
            <option value="vet2">Dra. Rodríguez</option>
          </select>
        </div>

        <div className="flex gap-4 justify-end">
          <button 
            type="button" 
            className="bg-terciary w-20 rounded-4xl hover:text-white cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="bg-terciary w-20 rounded-4xl hover:text-white cursor-pointer"
          >
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
}

