export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-between items-center w-full px-4 py-3 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        }`}
      >
        Anterior
      </button>
      
      <span className="text-sm text-gray-600 font-medium">
        Página {currentPage} de {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}