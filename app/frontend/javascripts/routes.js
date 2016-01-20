import React from 'react';
import {Route} from 'react-router';
import ChatRoom from './containers/chat-room';
import EmojisList from './containers/emojis-list';
import App from './containers/app';

export default (
  <Route>
    <Route component={App}>
      <Route path="/" component={ChatRoom}/>
      <Route path="/emoji" component={EmojisList}/>
    </Route>
  </Route>
);
