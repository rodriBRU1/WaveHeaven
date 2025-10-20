import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft } from 'lucide-react';
import './style.css';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  onFirst, 
  onPrevious, 
  onNext 
}) {
  // Generar array de números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con puntos suspensivos
      if (currentPage <= 3) {
        // Inicio: 1 2 3 4 ... último
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Final: 1 ... antepenúltimo penúltimo último
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Medio: 1 ... anterior actual siguiente ... último
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>
      </div>

      <div className="pagination-controls">
        {/* Botón ir al inicio */}
        <button
          className="pagination-button"
          onClick={onFirst}
          disabled={currentPage === 1}
          title="Ir al inicio"
        >
          <ChevronsLeft size={20} />
        </button>

        {/* Botón anterior */}
        <button
          className="pagination-button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          title="Anterior"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Números de página */}
        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Botón siguiente */}
        <button
          className="pagination-button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          title="Siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}