import React from 'react';
import {render} from 'react-dom';
import createStore from './store';
import reducers from './reducers';
import Faye from 'faye';
import Root from './root';
import * as Actions from './actions';

const store = createStore(reducers);

const baseUrl = window.location.toString().split('/').slice(0, 3).join('/');
const fayeClient = new Faye.Client(`${baseUrl}/faye`);
fayeClient.subscribe('/messages', message => {
  store.dispatch(Actions.createMessage(message));
});
const subscription = fayeClient.subscribe('/users-list', users => {
  store.dispatch(Actions.setUsers(users));
});

// make sure to notify server that we are going somewhere else
window.onunload = () => subscription.cancel();

store.dispatch({
  type: 'CLIENT',
  client: fayeClient
});

// Load things from the server
store.dispatch(Actions.getMessages());
store.dispatch(Actions.getEmojis());

render(
  <Root store={store}/>,
  document.getElementById('app')
);

