import Title from "../components/Title";

export default function RegisterPet() {
  return (
    <div className="flex flex-col items-center px-4 md:px-12 h-full bg-primary mt-8 gap-6">
      <Title text="Registro de Mascota" />
      <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-secondary w-full max-w-[300px] p-6 rounded-lg shadow-md flex flex-col gap-5"
    >
      <h3>Ingrese los datos de la mascota</h3>
      <div className="flex flex-col gap-1">
        <label htmlFor="nombreMascota" className="text-sm text-gray-600">Nombre</label>
        <input
          type="text"
          id="nombreMascota"
          name="nombreMascota"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="especie" className="text-sm text-gray-600">Especie</label>
        <input
          type="text"
          id="especie"
          name="especie"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="raza" className="text-sm text-gray-600">Raza</label>
        <input
          type="text"
          id="raza"
          name="raza"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="edad" className="text-sm text-gray-600">Edad</label>
        <input
          type="number"
          id="edad"
          name="edad"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="color" className="text-sm text-gray-600">Color</label>
        <input
          type="text"
          id="color"
          name="color"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex gap-4 justify-end ">
        <button className="bg-terciary w-20 rounded-4xl hover:text-white cursor-pointer">
          Cancelar
        </button>
        <button className="bg-terciary w-20 rounded-4xl hover:text-white cursor-pointer">
          Registrar
        </button>
      </div>
    </form>
    </div>
  );
}
