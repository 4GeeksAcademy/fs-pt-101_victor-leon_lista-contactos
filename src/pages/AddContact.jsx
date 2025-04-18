import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ACTIONS } from '../store';

const AGENDA_SLUG = 'victorleon';

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const initialForm = store.selectedContact || { name:'', email:'', address:'', phone:'' };
  const [form, setForm] = useState(initialForm);

  useEffect(() => setForm(store.selectedContact || initialForm), [store.selectedContact]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const url = `${'https://playground.4geeks.com/contact/agendas'}/${AGENDA_SLUG}/contacts${form.id?'/'+form.id:''}`;
    const method = form.id ? 'PUT' : 'POST';
    fetch(url, {
      method,
      headers:{ 'Content-Type':'application/json', accept:'application/json' },
      body: JSON.stringify(form)
    })
    .then(r => r.json())
    .then(data => {
      dispatch({ type: form.id ? ACTIONS.UPDATE_CONTACT : ACTIONS.ADD_CONTACT, payload: data });
      if (form.id) dispatch({ type: ACTIONS.SET_SELECTED, payload: null });
      navigate('/');
    })
    .catch(console.error);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-white shadow-sm py-3 text-center">
        <h1 className="h5 mb-0 text-primary">Nuevo Contacto</h1>
      </header>
      <main className="container my-4 flex-fill">
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth:600 }}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-success">Guardar</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="/" className="link-secondary">o volver atrás</a>
        </div>
      </main>
      <footer className="bg-white text-center py-3 border-top mt-auto">
        <p className="mb-0 text-muted">© 2025 Agenda de Víctor León</p>
      </footer>
    </div>
  );
};
