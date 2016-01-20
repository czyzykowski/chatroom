import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter/>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
