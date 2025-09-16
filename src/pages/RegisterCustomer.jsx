import AsideBar from "../components/AsideBar";
import RegisterForm from "../components/RegisterForm";
import Title from "../components/Title";


export default function RegisterCliente() {
  return (
    <div className="flex flex-col items-center px-12 h-full bg-primary mt-8 gap-4">  
        <Title text="Registro de Cliente"/>
       
        <form
      action=""
      className="bg-secondary w-[300px]  p-6 mt-2 rounded-lg shadow-md flex flex-col gap-5"
    >
      <h3>Ingrese los datos del cliente</h3>
      <input
        type="text"
        placeholder="Nombre"
        className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
      />
      <input
        type="text"
        placeholder="Cédula"
        className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
      />
      <input
        type="text"
        placeholder="Correo"
        className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
      />
      <input
        type="text"
        placeholder="Teléfono"
        className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
      />
      <input
        type="text"
        placeholder="Dirección"
        className="bg-white text-black w-[250px] py-1 rounded-xl px-2"
      />

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
