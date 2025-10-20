
import React, { useState, useEffect } from 'react';
import "./style.css";
import ProductCard from "../../components/ProductCard";
import accommodations from "../../data/mockdata";
import Header from "../../components/Header";
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import Pagination from '../../components/Pagination';

// Función para obtener productos aleatorios sin repetir
const getRandomProducts = (products, count = 20) => {
  const shuffled = [...products];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, Math.min(count, products.length));
};

export default function Home() {
  const [randomRecommendations, setRandomRecommendations] = useState([]);
  
  // Estados para paginación de alojamientos
  const [currentPageAccommodations, setCurrentPageAccommodations] = useState(1);
  const itemsPerPage = 10;

  // Estados para paginación de recomendaciones
  const [currentPageRecommendations, setCurrentPageRecommendations] = useState(1);

  // Generar productos aleatorios al montar el componente
  useEffect(() => {
    const randomProducts = getRandomProducts(accommodations, 10);
    setRandomRecommendations(randomProducts);
  }, []);

  // Calcular productos a mostrar en la página actual - ALOJAMIENTOS
  const indexOfLastItemAccommodations = currentPageAccommodations * itemsPerPage;
  const indexOfFirstItemAccommodations = indexOfLastItemAccommodations - itemsPerPage;
  const currentAccommodations = accommodations.slice(
    indexOfFirstItemAccommodations,
    indexOfLastItemAccommodations
  );
  const totalPagesAccommodations = Math.ceil(accommodations.length / itemsPerPage);

  // Calcular productos a mostrar en la página actual - RECOMENDACIONES
  const indexOfLastItemRecommendations = currentPageRecommendations * itemsPerPage;
  const indexOfFirstItemRecommendations = indexOfLastItemRecommendations - itemsPerPage;
  const currentRecommendations = randomRecommendations.slice(
    indexOfFirstItemRecommendations,
    indexOfLastItemRecommendations
  );
  const totalPagesRecommendations = Math.ceil(randomRecommendations.length / itemsPerPage);

  // Funciones de navegación - ALOJAMIENTOS
  const handlePageChangeAccommodations = (pageNumber) => {
    setCurrentPageAccommodations(pageNumber);
    // Scroll suave hacia la sección
    document.querySelector('.accommodations-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const goToFirstPageAccommodations = () => {
    handlePageChangeAccommodations(1);
  };

  const goToPreviousPageAccommodations = () => {
    if (currentPageAccommodations > 1) {
      handlePageChangeAccommodations(currentPageAccommodations - 1);
    }
  };

  const goToNextPageAccommodations = () => {
    if (currentPageAccommodations < totalPagesAccommodations) {
      handlePageChangeAccommodations(currentPageAccommodations + 1);
    }
  };

  // Funciones de navegación - RECOMENDACIONES
  const handlePageChangeRecommendations = (pageNumber) => {
    setCurrentPageRecommendations(pageNumber);
    document.querySelector('.recommendations-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const goToFirstPageRecommendations = () => {
    handlePageChangeRecommendations(1);
  };

  const goToPreviousPageRecommendations = () => {
    if (currentPageRecommendations > 1) {
      handlePageChangeRecommendations(currentPageRecommendations - 1);
    }
  };

  const goToNextPageRecommendations = () => {
    if (currentPageRecommendations < totalPagesRecommendations) {
      handlePageChangeRecommendations(currentPageRecommendations + 1);
    }
  };

  return (
    <>
      <Header />
      <SearchBar/>
      <main className="home">
        {/* SECCIÓN DE ALOJAMIENTOS */}
        <section className="accommodations-section">
          <h2>Buscar por tipo de alojamiento</h2>
          
          <div className="accommodations-grid">
            {currentAccommodations.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>

          {/* Paginación para alojamientos */}
          {totalPagesAccommodations > 1 && (
            <Pagination
              currentPage={currentPageAccommodations}
              totalPages={totalPagesAccommodations}
              onPageChange={handlePageChangeAccommodations}
              onFirst={goToFirstPageAccommodations}
              onPrevious={goToPreviousPageAccommodations}
              onNext={goToNextPageAccommodations}
            />
          )}
        </section>

        {/* SECCIÓN DE RECOMENDACIONES */}
        <section className="recommendations-section">
          <h2>Recomendaciones</h2>
          
          <div className="recommendations-grid">
            {currentRecommendations.map((item) => (
              <ProductCard key={`rec-${item.id}`} {...item} />
            ))}
          </div>

          {/* Paginación para recomendaciones */}
          {totalPagesRecommendations > 1 && (
            <Pagination
              currentPage={currentPageRecommendations}
              totalPages={totalPagesRecommendations}
              onPageChange={handlePageChangeRecommendations}
              onFirst={goToFirstPageRecommendations}
              onPrevious={goToPreviousPageRecommendations}
              onNext={goToNextPageRecommendations}
            />
          )}
        </section>
      </main>
      <Footer/>
    </>
  );
}