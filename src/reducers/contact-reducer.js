const defaultState = {
  contacts: [],
  contact: {name:{}},
  loading: false,
  errors: {}
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'FETCH_CONTACTS': {
          return {
            ...state,
            contacts: action.payload
          }
        }

        case 'FETCH_CONTACTS_FULFILLED': {
          return {
            ...state,
            contacts: action.payload.data.data || action.payload.data //si la paginación está desactivada (or)
          }
        }

        case 'NEW_CONTACT': {
          return {
            ...state,
            contact: {name:{}}
          }
        }

        case 'SAVE_CONTACT_PENDING': {
          return {
            ...state,
            loading: true
          }
        }
    
        case 'SAVE_CONTACT_FULFILLED': {
          return {
            ...state,
            contacts: [...state.contacts, action.payload.data],
            errors: {},
            loading: false
          }
        }

        case 'SAVE_CONTACT_REJECTED': {
          const data = action.payload.response.data;
          // convert feathers error formatting to match client-side error formatting
          const { "name.first":first, "name.last":last, phone, email } = data.errors;
          const errors = { global: data.message, name: { first,last }, phone, email };
          return {
            ...state,
            errors: errors,
            loading: false
          }
        }

        case 'DELETE_CONTACT_FULFILLED': {
          const _id = action.payload.data._id;
          return {
            ...state,
            contacts: state.contacts.filter(item => item._id !== _id)
          }
        }

        default:
          return state;
    }
}

/**
 * El reducer define qué hacer cuando se activan los dispatch al store, 
 * 
 * La primer operación posible es 'FETCH_CONTACTS'
 *      Retorna los contactos de payload (véase actions/contact-actions.js)
 *      nota el 'spread operator' (...state, contacts: action.payload) significa: 
 *      'Concatena a una copia del state, lo que devuelva action.payload' (revisa las notas de desarrollo)
 *      luego lo retornas como el nuevo state.
 * 
 * 'FETCH_CONTACTS_FULFILLED' cacha las respuestas de la API para fetchContacts (cuando ya no llama al archivo local, más bien al endpoint)
 * 
 * 'SAVE_CONTACT_FULFILLED' cacha la respuesta de la API (feathersjs) para saveContact() (véase contact-actions.js), se activa cuando 
 * se completó el registro del nuevo contacto, los demás casos con el sufijo 'SAVE_CONTACT_...' se activan en otros puntos de ese flujo de datos
 * 
 */