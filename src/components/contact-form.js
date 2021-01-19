import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const required = value => (value ? undefined : 'Required');

const TextFieldAdapter = ({ input, meta, ...rest }) => (
    <TextField
        {...input}
        {...rest}
        onChange={(event, value) => input.onChange(value)}
        errorText={meta.touched ? meta.error : ''}
    />
)

class ContactForm extends Component {

  render() {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async values => {
      await sleep(300)
      window.alert(JSON.stringify(values, 0, 2))
    }

    return (
        <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <h1 style={{marginTop:"1em"}}>Add New Contact</h1>
            <Form
                onSubmit={onSubmit}

                validate={values => {
                    const errors = {}
                    if (!values.username) {
                        errors.username = 'Required'
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    }
                    if (!values.confirm) {
                        errors.confirm = 'Required'
                    } else if (values.confirm !== values.password) {
                        errors.confirm = 'Must match'
                    }
                    return errors
                }}

                render={
                    //nota que es una arrow function (args) => {//function content}
                    ({ handleSubmit, form, submitting, pristine, values }) => (
                    
                    <form onSubmit={handleSubmit}>

                        <Field
                            name="username"
                            component={TextFieldAdapter}
                            validate={required}
                            hintText="First Name"
                            floatingLabelText="First Name"    
                        />

                        <Field name="lastname">
                            {
                            //nota que es una arrow function (args) => {//function content}
                            ({ input, meta }) => (
                            <div className="ui input">
                                <label>Last Name</label>
                                <input {...input} type="text" placeholder="Last Name"/>
                                {/* 'condition && <p>markup</p>', al parecer la condición trae un 'and' en el primer && 
                                    en pocas palabras, si encuentra valores en las dos variables meta, pinta el error en un <span>*/}
                                {meta.error && meta.touched && <span className = "error">{meta.error}</span>}
                            </div>
                            )}
                        </Field>

                        <Field name="password">
                            {({ input, meta }) => (
                            <div>
                                <label>Password</label>
                                <input {...input} type="password" placeholder="Password" />
                                {meta.error && meta.touched && <span className = "error">{meta.error}</span>}
                            </div>
                            )}
                        </Field>

                        <Field name="confirm">
                            {({ input, meta }) => (
                            <div>
                                <label>Confirm</label>
                                <input {...input} type="password" placeholder="Confirm" />
                                {meta.error && meta.touched && <span className = "error">{meta.error}</span>}
                            </div>
                            )}
                        </Field>

                        <div className="buttons">
                            <Button primary type="submit" disabled={submitting}>
                                Submit
                            </Button>
                            <button
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>
                        </div>

                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    
                    </form>
                    ) //arrow function
                }//render
            /> {/*form*/}
        </Grid>
    )
  }
}

export default ContactForm;

/**
 * Aquí vas, hay que poner un formulario validado y bonito (usa la librería del UI) también cacha el onSubmit para llamar 
 * a contact-actions.js y que se active el dispatch para nuevo contacto.
 * 
 * El ejemplo del formulario funciona, falta darle estilos chidos y cablearlo con redux
 */