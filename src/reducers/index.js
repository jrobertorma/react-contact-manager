import { combineReducers } from 'redux';
import ContactReducer from './contact-reducer';

const reducers = {
    contactStore: ContactReducer
}

const rootReducer = combineReducers (reducers);

export default rootReducer;

/**
 * Haces un stack de reducers, ahorita solo tiene uno (contact-reducer)
 * pero si necesitas agregar más, solo hace falta que los importes y los agreges al objeto 'reducers'
 * y estarán disponibles en 'rootReducer'.
 */