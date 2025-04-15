export const initialStore = () => ({
  contacts: [],
  selectedContact: null
});

export const ACTIONS = {
  LOAD_CONTACTS: 'LOAD_CONTACTS',
  ADD_CONTACT: 'ADD_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SET_SELECTED: 'SET_SELECTED'
};

export default function storeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_CONTACTS:
      return { ...state, contacts: action.payload };
    case ACTIONS.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case ACTIONS.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case ACTIONS.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case ACTIONS.SET_SELECTED:
      return { ...state, selectedContact: action.payload };
    default:
      return state;
  }
}
