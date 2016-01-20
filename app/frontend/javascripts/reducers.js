import {merge, mergeAll, concat, compose, max, prop, reduce, map} from 'ramda';
import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import * as Actions from './actions';

function faye(state = null, action) {
  switch (action.type) {
    case 'CLIENT':
      return action.client;
    default:
      return state;
  }
}

function username(state = null, action) {
  switch (action.type) {
    case Actions.SET_USERNAME:
      return action.username;
    default:
      return state;
  }
}

const maxId = compose(reduce(max, 0), map(prop('id')));

function messages(state = [], action) {
  switch (action.type) {
    case Actions.LOAD_MESSAGES:
      return action.messages;
    case Actions.CREATE_MESSAGE:
      return concat(state, {
        id: maxId(state) + 1,
        content: action.content,
        from: action.from,
        createdAt: action.createdAt
      });
    default:
      return state;
  }
}

function emojis(state = {}, action) {
  switch (action.type) {
    case Actions.LOAD_EMOJIS:
      return mergeAll(concat([state], map(emoji => {
        return {[emoji.code]: emoji};
      }, action.emojis)));
    case Actions.CREATE_EMOJI:
      return merge(state, {[action.emoji.code]: action.emoji});
    default:
      return state;
  }
}

function newEmoji(state = {}, action) {
  switch (action.type) {
    case Actions.NEW_EMOJI_REQUEST:
      return {step: 'request'};
    case Actions.NEW_EMOJI_SUCCESS:
      return {step: 'success', emoji: action.data};
    case Actions.NEW_EMOJI_FAILURE:
      return {step: 'failure', errors: action.data};
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case Actions.SET_USERS:
      return action.users;
    default:
      return state;
  }
}

const reducers = combineReducers({
  router: routerStateReducer,
  messages,
  users,
  username,
  faye,
  emojis,
  newEmoji
});

export default reducers;
