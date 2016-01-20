import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import cx from 'classnames';

class App extends React.Component {
  render() {
    const classes = location => {
      return cx({
        'nav-link': true,
        'active': location === this.props.location
      });
    };

    return (
      <div>
        <div className="row">
          <div className="col col-sm-12 col-md-12 col-lg-12">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link className={classes('/')} to={'/'}>Chat</Link>
              </li>
              <li className="nav-item">
                <Link className={classes('/emoji')} to={'/emoji'}>Emoji</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col col-sm-12 col-md-12 col-lg-12">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const location = state.router.location.pathname;
    return {location};
  }
)(App);
