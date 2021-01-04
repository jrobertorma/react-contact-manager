const defaultState = {
    contacts: []
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
 */