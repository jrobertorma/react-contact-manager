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

class ContactForm extends Component {

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

        // console.log(body);
        client.post(url, body)
        .then(
            window.alert("Contact added")
        )
        .catch(err => console.log(err.response));
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
            <h1 style={{marginTop:"1em"}}>Add New Contact</h1>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={ event => { handleSubmit().then(form.reset) } } noValidate>
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

export default ContactForm;

/**
 * Aquí vas, hay que poner un formulario validado y bonito (usa la librería del UI) también cacha el onSubmit para llamar 
 * a contact-actions.js y que se active el dispatch para nuevo contacto.
 * 
 * El ejemplo del formulario funciona, falta darle estilos chidos y cablearlo con redux
 * 
 */