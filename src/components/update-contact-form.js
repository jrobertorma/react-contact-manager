import React, { Component } from 'react';
import { Form } from 'react-final-form';

//import TextField from '@material-ui/core/TextField';
//import Grid from '@material-ui/core/Grid';

import {
    Paper,
    Grid,
    Button
} from '@material-ui/core';

import {
    TextField,
    makeValidate
} from 'mui-rff';

import * as Yup from 'yup';

import { client } from '../actions/'; //llamas a actions/index.js, la conexión al servidor local

const url = '/contacts';

class UpdateContactForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data: {},
        contactId: ''
    };
  }

  componentDidMount() {
    const _id = this.props.contactId;
    client.get(url+'/'+_id)
        .then((response) => {
            const contactData = {
                firstName: response.data.name.first,
                lastName: response.data.name.last,
                phone: response.data.phone,
                email: response.data.email
            }

            this.setState({ data: contactData, contactId : _id })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
  }

  render() {
    //const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async values => {
        const fName = values.firstName;
        const lName = values.lastName;
        const uPhone = values.phone;
        const uMail = values.email;

        const body = {
            "name": {
                "first": fName,
                "last": lName
            },
            "phone": uPhone,
            "email": uMail
        };

        client.put(`${url}/${this.state.contactId}`, body)
        .then(
            window.alert("Contact has been updated")
        )
        .catch((err) => { window.alert("There was an error, please check your input"); console.log(err.response) } );
    }

    const phoneRegExp = /^\+{1}(\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    // We define our schema based on the same keys as our form:
    const schema = Yup.object().shape({
        firstName: Yup.string().required('Required field'),
        phone: Yup.string().required('Required field').matches(phoneRegExp, 'Phone number is not valid please use this notation: +5555555555'),
        email: Yup.string().required('Required field').email('Must be a valid email'),
    });

    // Run the makeValidate function...
    const validate = makeValidate(schema);

    const formFields = [
        {
            size: 6,
            field: (
                <TextField
                    label="First Name"
                    name="firstName"
                    margin="none"
                    required={true}
                />
            ),
        },
        {
            size: 6,
            field: (
                <TextField
                    label="Last Name"
                    name="lastName"
                    margin="none"
                />
            ),
        },
        {
            size: 6,
            field: (
                <TextField
                    label="Phone"
                    name="phone"
                    margin="none"
                    required={true}
                />
            ),
        },
        {
            size: 12,
            field: (
                <TextField
                    type="email"
                    label="Email"
                    name="email"
                    margin="none"
                    required={true}
                />
            ),
        },
    ];

    return (
        <div>
            <h1 style={{marginTop:"1em"}}>Update Contact</h1>
            <Form
                onSubmit={onSubmit}
                initialValues={this.state.data}
                validate={validate}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={ event => { handleSubmit() } } noValidate>
                    <Paper style={{ padding: 16 }}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            {formFields.map((item, idx) => (
                            <Grid item xs={item.size} key={idx}>
                                {item.field}
                            </Grid>
                            ))}
                            <Grid item style={{ marginTop: 16 }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item style={{ marginTop: 16 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={submitting}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
                )}
            /> {/*Form*/}
        </div>
    ) /*return */
  }
}

export default UpdateContactForm;

/**
 * Inicialmente tendrías que usar redux-form y llamar a un action, pero integrarlo con la UI daba problemas y decidí usar materialui
 * con lo que cambió el funcionamiento general del formulario.
 * 
 * render > onSubmit es la función que gestiona el submit (really? lol), nota cómo se la pasas al <Form> de react-final-form en 
 * la línea 115
 * 
 * luego creas un 'schema' de yup para validar los campos, usas el mismo valor de 'name' en ellos para identificarlos, nota la expresión
 * regular para validar el número de teléfono (está incompleta, hay que corregirla)
 * 
 * luego corres la función makeValidate para generar una función validadora que detecte las cosas
 * especificadas en el 'schema', pasas el resultado de esa función a <Form>, está en la línea 116. Dato random, makeValidate es 
 * dependiente de mui-rff (revisa el siguiente paso)
 * 
 * defines los campos en un array de objetos, nota que en la llave 'field' tienen un componente <TextField> de mui-rff (micro librería de 
 * integración de materialui + react-final-form)
 * 
 * defines el <Form> de rff, nota cómo llama a todas las cosas antes definidas, dato interesante es el argumento del onSubmit
 * esa 'arrow function' permite definir el comportamiento del formulario una vez la operación del insert ha conluido, en este caso
 * resetear los campos.
 * 
 * La principal diferencia de este formulario respecto a contact-form.js es el constructor (donde inicializamos los estados data y contactId, 
 * vacíos al principio).
 * 
 * El método del lifecycle de react, componentDidMount, donde llamamos a la API y guardamos los datos de la BD correspondientes al id, (nota 
 * que lo envíamos desde pages/update-contact-page y es que lo recibe desde las rutas definidas en app.js, en realidad todo este proceso es
 * llamado desde components/contact-card.js) con: const _id = this.props.contactId;, actualizamos el state con los datos obtenidos
 * 
 * El <Form> ahora tiene la prop initialValues={this.state.data}, que llama al estado recién llenado y le pasa esos valores a los campos del
 * formulario, ;)
 * 
 * y la modificación del onSubmit. Que ahora llama al método PUT de axios
 * 
 *   client.put(`${url}/${this.state.contactId}`, body)
 *
 * que actualiza el registro con el id especificado. 
 * 
 */