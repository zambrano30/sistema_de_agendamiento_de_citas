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
    <div className="flex flex-col items-center px-12 h-full bg-primary mt-8 gap-4">
      <Title text="Nueva Consulta" />
      <AsideBar />
      <form
        onSubmit={handleSubmit}
        className="bg-secondary w-[300px] p-6 mt-2 rounded-lg shadow-md flex flex-col gap-5"
      >
        <h3>Nueva Consulta</h3>
        <input
          type="text"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          placeholder="Nombre de la mascota"
          required
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
        <input
          type="text"
          name="clientName"
          value={formData.clientName}
          onChange={handleChange}
          placeholder="Nombre del Cliente"
          required
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
        <select
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

