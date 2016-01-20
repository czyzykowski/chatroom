import {map} from 'ramda';
import React from 'react';
import {connect} from 'react-redux';

class UserList extends React.Component {
  renderUser(user) {
    return (
      <li className="list-group-item" key={user}>
        <strong>@{user}</strong>
      </li>
    );
  }

  render() {
    const {users, height} = this.props;
    return (
      <div className="card">
        <div className="card-block" style={{height, overflow: 'scroll'}}>
          <ul className="list-group">
            {map(this.renderUser, users)}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {users: state.users};
  }
)(UserList);
