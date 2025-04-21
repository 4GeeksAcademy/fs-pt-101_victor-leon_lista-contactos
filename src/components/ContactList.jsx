import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ACTIONS } from '../store';
import Home from '../pages/Home';
import { CheckAgenda, fetchContacts, deleteContactApi } from '../api/agenda';

const AGENDA_SLUG = 'victorleon';

const ContactList = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await CheckAgenda(AGENDA_SLUG);
        const contacts = await fetchContacts(AGENDA_SLUG);
        dispatch({ type: ACTIONS.LOAD_CONTACTS, payload: contacts });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  const handleEdit = contact => {
    dispatch({ type: ACTIONS.SET_SELECTED, payload: contact });
    navigate('/add');
  };

  const handleDelete = contact => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setShowModal(false);
    if (contactToDelete) {
      const ok = await deleteContactApi(AGENDA_SLUG, contactToDelete.id);
      if (ok) dispatch({ type: ACTIONS.DELETE_CONTACT, payload: contactToDelete.id });
      setContactToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setContactToDelete(null);
  };

  return (
    <Home
      contacts={store.contacts}
      onEdit={handleEdit}
      onDelete={handleDelete}
      showModal={showModal}
      confirmDelete={confirmDelete}
      cancelDelete={cancelDelete}
    />
  );
};

export default ContactList;
