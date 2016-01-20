import {join, prop, assoc, dissoc, map, head, tail, isEmpty} from 'ramda';
import axios from 'axios';

const extract = prop('data');

export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export function createMessage(message) {
  return {
    type: CREATE_MESSAGE,
    content: message.content,
    from: message.from,
    createdAt: new Date()
  };
}

export const LOAD_MESSAGES = 'LOAD_MESSAGES';
function loadMessages(messages) {
  return {
    type: LOAD_MESSAGES,
    messages
  };
}

const convert = msg => {
  const created = prop('created_at', msg);
  return dissoc('created_at', assoc('createdAt', created, msg));
};

export function getMessages() {
  return dispatch => {
    axios.get('/messages.json')
    .then(extract)
    .then(map(convert))
    .then(messages => {
      dispatch(loadMessages(messages));
    });
  };
}

export const SET_USERNAME = 'SET_USERNAME';
export function setUsername(faye, username) {
  if (faye) {
    faye.publish('/users', username);
  }
  return {
    type: SET_USERNAME,
    username
  };
}

export const SET_USERS = 'SET_USERS';
export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}

export const LOAD_EMOJIS = 'LOAD_EMOJIS';
export function setEmojis(emojis) {
  return {
    type: LOAD_EMOJIS,
    emojis
  };
}

export function getEmojis() {
  return dispatch => {
    axios.get('/emojis.json')
    .then(extract)
    .then(emojis => {
      dispatch(setEmojis(emojis));
    });
  };
}

const headers = () => {
  return {
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
    }
  };
};

export function handleSpecialCommand(faye, from, parsed) {
  const command = head(parsed);
  const args = tail(parsed);

  return () => {
    if (command === 'giphy' && !isEmpty(args)) {
      axios.post('/giphy.json', {query: join(' ', args)}, headers())
      .then(extract)
      .then(data => {
        faye.publish('/messages', {from, content: `${data.url}!${data.width}!${data.height}`});
      });
    }
  };
}

export const NEW_EMOJI_REQUEST = 'NEW_EMOJI_REQUEST';
export const NEW_EMOJI_SUCCESS = 'NEW_EMOJI_SUCCESS';
export const NEW_EMOJI_FAILURE = 'NEW_EMOJI_FAILURE';

export const CREATE_EMOJI = 'CREATE_EMOJI';

export function addEmoji(emoji) {
  return {
    type: CREATE_EMOJI,
    emoji
  };
}
export function createEmoji(formData) {
  return dispatch => {
    const opts = headers();
    dispatch({type: NEW_EMOJI_REQUEST});
    axios.post('/emojis.json', formData, opts)
    .then(extract)
    .then(data => {
      dispatch({type: NEW_EMOJI_SUCCESS, data});
      dispatch(addEmoji(data));
    })
    .catch(({data}) => {
      dispatch({type: NEW_EMOJI_FAILURE, data});
    });
  };
}
