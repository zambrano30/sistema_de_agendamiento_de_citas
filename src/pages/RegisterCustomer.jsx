import AsideBar from "../components/AsideBar";
import RegisterForm from "../components/RegisterForm";
import Title from "../components/Title";


export default function RegisterCliente() {
  return (
    <div className="flex flex-col items-center px-4 md:px-12 h-full bg-primary mt-8 gap-6">  
        <Title text="Registro de Cliente"/>
       
        <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-secondary w-full max-w-[300px] p-6 rounded-lg shadow-md flex flex-col gap-5"
    >
      <h3>Ingrese los datos del cliente</h3>
      <div className="flex flex-col gap-1">
        <label htmlFor="nombre" className="text-sm text-gray-600">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cedula" className="text-sm text-gray-600">Cédula</label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="correo" className="text-sm text-gray-600">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="telefono" className="text-sm text-gray-600">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="direccion" className="text-sm text-gray-600">Dirección</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
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
  )
}
