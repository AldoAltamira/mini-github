import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/';
import NotFound from './screens/notFound';
import Home from './screens/home';
import Login from './screens/login';
import Repos from './screens/repos';
import Eventos from './screens/events';

import history from './history';


/*=============================================
=            App Component With Router        =
=============================================*/

export default function App() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history} basename={'/'}>
          <Switch>
            {/* <Route exact path="/" component={LoginComponent}></Route> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/repos" component={Repos} />
            <Route exact path="/events" component={Eventos} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
}
