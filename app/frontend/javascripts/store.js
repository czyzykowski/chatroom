import thunk from 'redux-thunk';
import {reduxReactRouter} from 'redux-router';
import {createStore as reduxCreateStore, applyMiddleware, compose} from 'redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

const createStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({routes, createHistory: createBrowserHistory})
)(reduxCreateStore);

export default createStore;
