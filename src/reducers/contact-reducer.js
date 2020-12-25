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
 */