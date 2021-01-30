import React, { Component} from 'react';
import ContactList from '../components/contact-list';

import { connect } from 'react-redux';
import { fetchContacts, deleteContact } from '../actions/contact-actions';

class ContactListPage extends Component {

  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div>
        <h1>List of Contacts</h1>
        <ContactList contacts={this.props.contacts} deleteContact={this.props.deleteContact}/>
      </div>
    )
  }
}

// Make contacts  array available in  props
function mapStateToProps(state) {
  return {
      contacts : state.contactStore.contacts
  }
}

export default connect(mapStateToProps, {fetchContacts, deleteContact}) (ContactListPage);
/**
 * fetchContacts tiene este formato:
 * 
 *  export function fetchContacts() {
      return (dispatch) => {
          dispatch({
              type: 'FETCH_CONTACTS',
              payload: contacts
          })
      };
    }
 * 
 * Tiene el formato de mapDispatchToProps
 * 
 * function mapDispatchToProps( dispatch ){
			  //Va a regresar un objeto con la prop submitNewMessage (que será llamada desde el componente)
			  //y recibe el argumento(parámetro) message que a su vez ejecuta el dispatch (definido en otro lado XD)
			  return {
			  	submitNewMessage: function (message) {
			      					dispatch( addMessage(message) );
			    				  } 
			  };
			}
 * 
 * Por lo que es viable usarlo como segundo argumento del connect, si me preguntas no me parece la mejor de las ideas
 * pues hace muy ilegible el código (por eso este comentario tan masivo lol).
 * 
 * Nota que en la línea 17 ahora pasamos la prop 'contacts' al componente 'contact-list', esa prop se llena en 
 * el evento componentDidMount(), fíjate en cómo this.props.fetchContacts(); crea la prop para que la puedas llamar
 * con this.props.contacts (o al menos ese parece ser el caso, revísalo)
 * 
 * https://react-redux.js.org/api/connect
 */