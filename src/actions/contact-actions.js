//import { contacts } from '../contact-data'; //datos hardcodeados para pruebas
import { client } from './'; //llamas a actions/index.js, la verdad preferiría ponerle un nombre menos ambiguo T.T, es la conexión al servidor local

const url = '/contacts';

export function fetchContacts() {
    return (dispatch) => {
        dispatch({
            type: 'FETCH_CONTACTS',
            payload: client.get(url)
        })
    };
}

export function newContact() {
    return dispatch => {
        dispatch({
            type: 'NEW_CONTACT'
        })
    }
}

export function saveContact(contact) {
    return dispatch => {
        return dispatch({
            type: 'SAVE_CONTACT',
            payload: client.post(url, contact)
        })
    }
}

export function fetchContact(_id) {
    return dispatch => {
      return dispatch({
        type: 'FETCH_CONTACT',
        payload: client.get(url+'/'+_id)
      })
    }
}
  
export function updateContact(contact) {
    return dispatch => {
      return dispatch({
        type: 'UPDATE_CONTACT',
        payload: client.put(`${url}/${contact._id}`, contact)
      })
    }
}
/**
 * Primero importas los objetos 'contact', en la primera versión llamas al archivo contact-data, eventualmente vas a llamar a la API (supongo)
 * Sí, ahora llamas a la conexión (actions/index.js) y luego la usas en payload pasándole la url 'contacts', no olvides que esa es la url de 
 * la API creada con feathers.js en backend/models/contact.model.js ;). 
 * 
 * Luego creas (y exportas) la función fetchContacts()
 * que permíte hacer una llamada asíncrona al store (por eso el return de una arrow function que recibe dispatch como argumento, línea 4), 
 * hace un dispatch del action 'FETCH_CONTACTS' (se ahorra la creación del 'action creator' si se pasa el objeto directamente)
 * y pasa los contactos como el argumento 'payload', que vas a cachar en la función reducer (véase reducers/contact.reducer.js).
 * 
 * client.get(url) y client.post(url, contact), son llamadas a una conexión 'axios' que llama a los endpoints de la API que está en /backend
 */