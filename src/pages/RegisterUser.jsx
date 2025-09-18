import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../libs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const { email, password, ...rest } = Object.fromEntries(formData.entries());
    
    // Validaciones básicas
    if (!email || !password) {
      setError('Por favor completa todos los campos obligatorios');
      setIsLoading(false);
      return;
    }

    try {
      // Si el email no existe, procedemos con el registro
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      try {
        // Guardamos los datos adicionales en Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userData = {
          firstName: rest.firstName,
          lastName: rest.lastName,
          phone: rest.phone,
          address: rest.address,
          uid: user.uid,
          email,
          createdAt: new Date().toISOString()
        };
        
        await setDoc(userDocRef, userData);
        navigate('/login', { state: { message: '¡Registro exitoso! Por favor inicia sesión.' } });
      } catch (firestoreError) {
        console.error('Error al guardar datos:', firestoreError);
        setError('Se creó tu cuenta pero hubo un problema al guardar tus datos. Por favor contacta a soporte.');
      }
    } catch (error) {
      console.error('Error:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          const shouldLogin = window.confirm(
            'Este correo electrónico ya está registrado. ¿Deseas iniciar sesión?'
          );
          if (shouldLogin) {
            navigate('/login');
          }
          break;
        case 'auth/invalid-email':
          setError('El correo electrónico no tiene un formato válido');
          break;
        case 'auth/weak-password':
          setError('La contraseña debe tener al menos 6 caracteres');
          break;
        case 'auth/operation-not-allowed':
          setError('El registro con correo electrónico no está habilitado. Por favor contacta a soporte.');
          break;
        default:
          setError('Error al crear la cuenta: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          <p className="text-gray-600">Completa tus datos para registrarte</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="firstName"
                disabled={isLoading}
                name="firstName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Juan"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Pérez"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="juan@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <textarea
              id="address"
              name="address"
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              placeholder="Calle 123, Ciudad, País"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creando cuenta...
              </div>
            ) : (
              "Crear Cuenta"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-500 font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
