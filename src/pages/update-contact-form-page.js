import React, { Component} from 'react';

import UpdateContactForm from '../components/update-contact-form';

class UpdateContactFormPage extends Component {
  render() {
    const { _id } = this.props.match.params;

    return (
      <div>
        <UpdateContactForm contactId={_id}/>
      </div>
    )
  }
}

export default UpdateContactFormPage;

/** Hay que corregirlo, la idea es llamar a la api con el id y pasarle los argumentos al formulario */