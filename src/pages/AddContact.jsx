import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ACTIONS } from '../store';

const AGENDA_SLUG = "victorleon";

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  
  const initialForm = store.selectedContact || {
    name: '',
    email: '',
    address: '',
    phone: ''
  };
  
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(store.selectedContact || initialForm);
  }, [store.selectedContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.id) {
      // Actualizar contacto
      fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify(form)
      })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: data });
        dispatch({ type: ACTIONS.SET_SELECTED, payload: null });
        navigate('/');
      })
      .catch(err => console.error("Error actualizando contacto", err));
    } else {
      // Crear contacto
      fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify(form)
      })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: ACTIONS.ADD_CONTACT, payload: data });
        navigate('/');
      })
      .catch(err => console.error("Error creando contacto", err));
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-3 text-center">
        <h1 className="mb-0 text-primary">Agregar Contacto</h1>
      </header>
      
      <main className="container my-4 flex-fill">
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label className="form-label text-muted">Nombre</label>
            <input 
              type="text" 
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-muted">Email</label>
            <input 
              type="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label text-muted">Teléfono</label>
            <input 
              type="text" 
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label text-muted">Dirección</label>
            <input 
              type="text" 
              name="address"
              value={form.address}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success">
              Guardar
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="/" className="link-secondary">
            Volver
          </a>
        </div>
      </main>
      <footer className="bg-white text-center py-3 border-top mt-auto">
        <p className="mb-0 text-muted">© 2025 Agenda de Contactos de Víctor León</p>
      </footer>
    </div>
  );
};
