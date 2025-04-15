import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ACTIONS } from "../store";
import Home from "./Home";

const AGENDA_SLUG = "victorleon";

const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();

  const checkAgenda = () => {
    fetch('https://playground.4geeks.com/contact/agendas?offset=0&limit=100', {
      headers: { accept: 'application/json' }
    })
      .then(response => response.json())
      .then(data => {
        const agendas = data.agendas;
        const exists = agendas.some(a => a.slug === AGENDA_SLUG);
        if (!exists) {
          fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}`, {
            method: "POST",
            headers: { accept: 'application/json' },
            body: ''
          })
            .then(response => response.json())
            .then(() => loadContacts())
            .catch(err => console.error("Error creando la agenda", err));
        } else {
          loadContacts();
        }
      })
      .catch(err => console.error("Error cargando agendas", err));
  };

  const loadContacts = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`, {
      headers: { accept: 'application/json' }
    })
      .then(response => response.json())
      .then(data => dispatch({ type: ACTIONS.LOAD_CONTACTS, payload: data.contacts }))
      .catch(err => console.error("Error cargando contactos", err));
  };

  useEffect(() => {
    checkAgenda();
  }, []);

  const handleEdit = (contact) => {
    dispatch({ type: ACTIONS.SET_SELECTED, payload: contact });
    navigate("/add");
  };

  const handleDeleteRequest = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  const confirmDelete = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${contactToDelete.id}`, {
      method: "DELETE",
      headers: { accept: 'application/json' }
    })
      .then(response => response.json())
      .then(() => {
        dispatch({ type: ACTIONS.DELETE_CONTACT, payload: contactToDelete.id });
        setShowModal(false);
        setContactToDelete(null);
      })
      .catch(err => console.error("Error eliminando contacto", err));
  };

  const cancelDelete = () => {
    setShowModal(false);
    setContactToDelete(null);
  };

  return (
    <Home 
      contacts={store.contacts}
      onEdit={handleEdit}
      onDelete={handleDeleteRequest}
      showModal={showModal}
      confirmDelete={confirmDelete}
      cancelDelete={cancelDelete}
    />
  );
};

export default ContactList;
