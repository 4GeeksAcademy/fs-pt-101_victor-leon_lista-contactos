import React from 'react';
import avatarDefault from '../assets/img/avatar-default-symbolic.svg';

export const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="contact-item d-flex align-items-center p-3 mb-3 border rounded">
      <img 
        src={avatarDefault} 
        alt="avatar" 
        style={{ width: "70px", height: "70px" }} 
        className="rounded-circle me-4"
      />
      <div className="flex-grow-1">
        <h3 className="h5 mb-1 text-primary">{contact.name}</h3>
        <p className="mb-1 text-muted">
          <i className="bi bi-telephone me-2"></i>{contact.phone}
        </p>
        <p className="mb-1 text-muted">
          <i className="bi bi-envelope me-2"></i>{contact.email}
        </p>
        <p className="mb-0 text-muted">
          <i className="bi bi-geo-alt me-2"></i>{contact.address}
        </p>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(contact)}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(contact)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};
