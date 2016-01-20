import {concat, map, length, contains} from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions';

class AskForUsername extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', errors: []};
  }

  onChange(event) {
    this.setState({username: event.target.value, errors: []});
  }

  error(msg) {
    const {errors} = this.state;
    this.setState({errors: concat(errors, [{msg, key: length(errors)}])});
  }

  onProceed(event) {
    event.preventDefault();

    const {fayeClient, users, dispatch} = this.props;
    const {username} = this.state;

    if (!username) {
      this.error('Username cannot be empty');
      return;
    }

    if (contains(username, users)) {
      this.error(`${username} is already taken. Please choose different username`);
      return;
    }

    dispatch(Actions.setUsername(fayeClient, username));
  }

  renderError(error) {
    return (<div key={error.key} className="alert alert-danger">{error.msg}</div>);
  }

  render() {
    const {show} = this.props;
    const {username, errors} = this.state;

    if (!show) {
      return null;
    }

    return (
      <form onSubmit={this.onProceed.bind(this)}>
        <div className="modal" style={{display: 'block'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Please provide a username</h4>
              </div>
              <div className="modal-body">
                <div className="row error-list">
                  <div className="col col-sm-12 col-md-12 col-lg-12">
                    {map(this.renderError, errors)}
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 col-md-12 col-lg-12">
                    <div className="input-group">
                      <span className="input-group-addon">@</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={this.onChange.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onProceed.bind(this)}>
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(
  state => {
    return {
      fayeClient: state.faye,
      users: state.users
    };
  }
)(AskForUsername);
