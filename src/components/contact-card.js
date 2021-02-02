import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      maxWidth: 300,
      marginTop: 10,
      marginBottom: 10,
    }
});

const redTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#ff5252',
      }
    },
});

const greenTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#49a879',
        contrastText: "#fff",
      }
    },
});

export default function ContactCard( {contact, deleteContact} ) {
    //let contact = props.contact;
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body2" component="p">
                    {contact.name.first} {contact.name.last}
                </Typography>
                <Typography variant="body2" component="p">
                    {contact.phone}
                </Typography>
                <Typography variant="body2" component="p">
                    {contact.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to= { "/contacts/edit/"+ contact._id } style={{ textDecoration: 'none' }}>
                    <ThemeProvider theme={greenTheme}>
                        <Button color="primary" variant="contained" size="small">Edit</Button>
                    </ThemeProvider>
                </Link>
                    <ThemeProvider theme={redTheme}>
                        <Button color="primary" variant="contained" size="small" onClick={ () => deleteContact(contact._id) }>
                            Delete
                        </Button>
                    </ThemeProvider>
            </CardActions>
        </Card>
    )
}

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired
}

/**
 * Las cards de contacto, son llamadas por pages/contact-list-page.js que a su vez llama a components/contact-list.js, que recorre el fetch
 * de la API y pasa como props los valores de cada registro de la BD, por eso las puedes acceder con la prop 'contact'
 * 
 * nota cómo los botones llaman a /contacts/edit/${expresión js}, ya desde las tabs en App.js habías definido esta ruta, 
 * que llama a pages/contactFormPage, el único motivo por el que funciona esta ruta es que está especificada en el switch de App.js, 
 * atento ahí.
 * 
 * Sigue editar contact-form-page para detectar cuando es llamada para un update (o cambiar la ruta en el switch) y poder pintar un form
 * con los datos del registro en cuestión.
 *  
 */