import React, { useState } from 'react';
import './style.css';
import Sidebar from '../../components/SideBar';
import Header from '../../components/AdminHeader';
import CabinTable from '../../components/CabinTable';
import AdminFilters from '../../components/AdminFilters';
import AddHostal from '../../components/AddHostal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';

// Componente principal
const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cabinToDelete, setCabinToDelete] = useState(null);
  const [editingCabin, setEditingCabin] = useState(null);
  
  // Estado para las cabañas (ahora incluye categoría)
  const [cabins, setCabins] = useState([
    { id: '01', name: 'Cabaña Esmeralda', category: 'montana', description: 'Hermosa cabaña en la montaña' },
    { id: '02', name: 'Cabaña Paige', category: 'playa', description: 'Cabaña frente al mar' },
    { id: '03', name: 'Cabaña Jefferson', category: 'bosque', description: 'Rodeada de naturaleza' },
    { id: '04', name: 'Cabaña Mayo', category: 'lago', description: 'Vista al lago' },
    { id: '05', name: 'Cabaña Thumbiko', category: 'campo', description: 'En medio del campo' },
    { id: '06', name: 'Cabaña Brisas del Río', category: 'montana', description: 'Junto al río' },
    { id: '07', name: 'Cabañas Sol y Mar', category: 'playa', description: 'Sol y playa' },
    { id: '08', name: 'Cabaña Cielos Abiertos', category: 'desierto', description: 'Cielos despejados' },
    { id: '09', name: 'Cabañas Bosque Azul', category: 'bosque', description: 'Bosque encantado' },
    { id: '10', name: 'Cabaña Laguna Serena', category: 'lago', description: 'Laguna tranquila' }
  ]);

  const openModal = () => {
    setEditingCabin(null);
    setIsModalOpen(true);
  };

  // Función para editar
  const handleEdit = (cabin) => {
    setEditingCabin(cabin);
    setIsModalOpen(true);
  };

  // Función para abrir el modal de confirmación de eliminación
  const handleDeleteClick = (cabin) => {
    setCabinToDelete(cabin);
    setIsDeleteModalOpen(true);
  };

  // Función para confirmar la eliminación
  const handleConfirmDelete = () => {
    if (cabinToDelete) {
      // Eliminar de la base de datos (aquí simulas con el estado)
      setCabins(prevCabins => 
        prevCabins.filter(cabin => cabin.id !== cabinToDelete.id)
      );
      
      // Aquí harías la llamada al backend
      // deleteCabinFromDatabase(cabinToDelete.id);
      
      console.log('Producto eliminado:', cabinToDelete);
      
      // Cerrar modal y limpiar
      setIsDeleteModalOpen(false);
      setCabinToDelete(null);
    }
  };

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCabinToDelete(null);
    console.log('Eliminación cancelada');
  };

  const user = {
    name: 'John Doue',
    email: 'jdoe@acme.com'
  };

  // Función para guardar producto (crear o editar)
  const handleProductSubmit = (productData) => {
    if (editingCabin) {
      // Modo edición - actualizar producto existente
      setCabins(prevCabins =>
        prevCabins.map(cabin =>
          cabin.id === editingCabin.id
            ? { ...cabin, ...productData }
            : cabin
        )
      );
      console.log('Producto actualizado:', { ...editingCabin, ...productData });
    } else {
      // Modo creación - agregar nuevo producto
      const newCabin = {
        id: String(cabins.length + 1).padStart(2, '0'),
        name: productData.name,
        category: productData.category,
        description: productData.description,
        images: productData.images
      };
      setCabins(prevCabins => [...prevCabins, newCabin]);
      console.log('Producto creado:', newCabin);
    }
  };
  
  return (
    <>
    <Header user={user}/>  
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="content">
          <div className="content-header">
            <AdminFilters/>
            <button className="add-button" onClick={openModal}>Agregar</button>
            
            {/* Modal para agregar/editar producto */}
            <AddHostal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditingCabin(null);
              }}
              onSubmit={handleProductSubmit}
              editMode={!!editingCabin}
              initialData={editingCabin}
            />
          </div>

          {/* Tabla de cabañas */}
          <CabinTable
            cabins={cabins}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          {/* Modal de confirmación de eliminación */}
          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            itemName={cabinToDelete?.name}
          />
        </div>
      </main> 
    </div>
    </>
  );
};

export default Admin;