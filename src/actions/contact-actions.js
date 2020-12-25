import { contacts } from '../contact-data';

export function fetchContacts() {
    return (dispatch) => {
        dispatch({
            type: 'FETCH_CONTACTS',
            payload: contacts
        })
    };
}

/**
 * Primero importas los objetos 'contact', en la primera versión llamas al archivo contact-data, eventualmente vas a llamar a la API (supongo)
 * 
 * Luego creas (y exportas) la función fetchContacts()
 * que permíte hacer una llamada asíncrona al store (por eso el return de una arrow function que recibe dispatch como argumento, línea 4), 
 * hace un dispatch del action 'FETCH_CONTACTS' (se ahorra la creación del 'action creator' si se pasa el objeto directamente)
 * y pasa los contactos como el argumento 'payload', que vas a cachar en la función reducer (véase reducers/contact.reducer.js).
 */