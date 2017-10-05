import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Styles
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss'

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Logout from './views/Pages/Logout/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
//If we have a token, consider usert to be signed in.

if(token){
    //we need to update application state
    store.dispatch({type: AUTH_USER });
}
const history = createBrowserHistory();

ReactDOM.render((
    <Provider store={store}>
      <HashRouter history={history}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login}/>
          <Route exact path="/logout" name="Logout" component={Logout}/>
          <Route exact path="/register" name="Register Page" component={Register}/>
          <Route exact path="/404" name="Page 404" component={Page404}/>
          <Route exact path="/500" name="Page 500" component={Page500}/>
          <Route path="/" name="Home" component={Full}/>
        </Switch>
      </HashRouter>
    </Provider>
), document.getElementById('root'));