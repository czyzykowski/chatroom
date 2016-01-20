import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import MessagesList from './messages-list';
import MessageInput from './message-input';
import AskForUsername from './ask-for-username';
import UserList from './user-list';

const NAV_PADDING_PIXELS = 16;

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {height: 0};
  }

  calculateHeight() {
    const clientHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const inputHeight = ReactDOM.findDOMNode(this.refs.input).offsetHeight;
    const contentTop = ReactDOM.findDOMNode(this.refs.content).getBoundingClientRect().top;

    return clientHeight - contentTop - inputHeight - NAV_PADDING_PIXELS;
  }

  componentDidMount() {
    const height = this.calculateHeight();
    this.setState({height});
  }

  render() {
    const {username} = this.props;
    const {height} = this.state;

    return (
      <div>
        <AskForUsername show={!username}/>
        <div className="row" ref="content">
          <div className="col col-sm-12 col-md-9 col-lg-9">
            <MessagesList height={height}/>
          </div>
          <div className="col col-sm-12 col-md-3 col-lg-3">
            <UserList height={height}/>
          </div>
        </div>
        <div className="row" ref="input">
          <div className="col col-sm-12 col-md-12 col-lg-12">
            <MessageInput shouldFocus={username}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      username: state.username
    };
  }
)(ChatRoom);
