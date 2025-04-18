import React from 'react';
import { ModalConfirm } from '../components/ModalConfirm';
import { ContactCard } from '../components/ContactCard';
import { useNavigate } from 'react-router-dom';

const Home = ({ contacts, onEdit, onDelete, showModal, confirmDelete, cancelDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-white shadow-sm py-3 text-center">
        <h1 className="h5 mb-0 text-primary">Lista de Contactos</h1>
      </header>
      <main className="flex-fill container my-4">
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-success" onClick={() => navigate('/add')}>
            Crear contacto
          </button>
        </div>
        {contacts.length > 0 ? (
          contacts.map(c => (
            <ContactCard
              key={c.id}
              contact={c}
              onEdit={() => onEdit(c)}
              onDelete={() => onDelete(c)}
            />
          ))
        ) : (
          <p className="text-center">No hay contactos en la agenda.</p>
        )}
      </main>
      <footer className="bg-white text-center py-3 border-top mt-auto">
        <p className="mb-0 text-muted">© 2025 Agenda de Víctor León</p>
      </footer>
      {showModal && (
        <ModalConfirm
          message="¿Estás seguro de que deseas eliminar este contacto?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Home;
