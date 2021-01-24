import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      maxWidth: 300,
      marginTop: 10,
      marginBottom: 10,
    }
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
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>
    )
}

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired
}