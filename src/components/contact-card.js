import React from 'react';
import { Card, Button, Icon, CardContent, CardHeader, CardDescription } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default function ContactCard( {contact, deleteContact} ) {
    //let contact = props.contact;

    return (
        <Card>
            <CardContent>
                <CardHeader>
                    <Icon name='user outline'/> {contact.name.first} {contact.name.last}
                </CardHeader>
                <CardDescription>
                    <p><Icon name='phone'/> {contact.phone}</p>
                    <p><Icon name='mail outline'/> {contact.email}</p>
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <div className="ui two buttons">
                    <Button basic color="green">Edit</Button>
                    <Button basic color="red">Delete</Button>
                </div>
            </CardContent>
        </Card>
    )
}

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired
}