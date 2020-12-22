import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import ContactListPage from './pages/contact-list-page';
import ContactFormPage from './pages/contact-form-page';

class App extends Component {
  render() {
    return (
      <Container>
        <div className="ui two item menu">
          <NavLink className="item" activeClassName="active" exact to="/">
            Contacts List
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/contacts/new">
            Add Contact
          </NavLink>
        </div>
        <Route exact path="/" component={ContactListPage}/>
        <Route path="/contacts/new" component={ContactFormPage}/>
        <Route path="/contacts/edit/:_id" component={ContactFormPage}/>
      </Container>
    );
  }
}

export default App;

/**
 * index.js recibe a App.js (este archivo) y lo encierra en <BrowserRouter> lo que permite usar 
 * react-router en la aplicación (https://reactrouter.com/core/api/Router)
 * 
 * <Container> es un contenedor (really? jaja) de semantic-ui, ajusta su contenido al ancho de la pantalla 
 * (https://react.semantic-ui.com/elements/container/#types-container)
 * 
 * className = "ui two item menu" usa los estilos de semantic-ui para que los <NavLink> se vean bien (https://semantic-ui.com/collections/menu.html)
 * por cierto que los <NavLink> hace lo mismo que un <Link> pero indican qué enlace ha sido presionado (https://reactrouter.com/web/api/NavLink)
 * también le dicen al router a que <Route> llamar.
 * 
 * Los componentes <Route> son importantes, le dicen al dom qué pintar en función de la prop path(url) y component(qué pintar) 
 * (https://reactrouter.com/core/api/Route)
 * 
 * Usualmente los vas a ver anidados en un <Switch>, que se usa para renderizar solo una de las rutas, si las dejas 'sueltas' 
 * (sin nada que las contenga, como es el caso en este archivo) todas se renderizan, pero debido a los <Route> solo se muestra una (está en tabs)
 * 
 * La 'arquitectura' de la app va así:
 * index.js --> App.js
 *              --> ContactListPage (pages/contact-list-page, la lista de contactos)
 *                  --> Pinta unos textos y llama a ContactList (/components/contact-list), es un componente porque va a tener states (creo lol)
 *              --> ContactFormPage (/contacts/new, agregar nuevo contacto)
 *                  --> Pinta algún texto y llama a ContactForm (/components/contact-form), va a ser componente controlado porque es un formulario
 *              --> ContactFormPage (aún no se pinta, pero es la ruta para actualizar contactos, llama al mismo form (de ahí el mismo nombre de componente))
 *                  --> Es el mismo component de /contacts/new
 */