import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">&copy; 2025 Pet Care. Todos los derechos reservados.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-gray-300">Términos y condiciones</a>
            <a href="#" className="text-sm hover:text-gray-300">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
