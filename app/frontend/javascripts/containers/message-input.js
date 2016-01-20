import {split, slice, compose} from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as Actions from '../actions';

const specialCommand = line => line.match(/^\//);
const parseSpecialCommand = compose(split(' '), slice(1, Infinity));

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: ''};
  }

  componentDidMount() {
    if (this.props.shouldFocus) {
      // focus input field after app loads
      ReactDOM.findDOMNode(this.refs.input).focus();
    }
  }

  onSubmit(event) {
    // don't reload the page
    event.preventDefault();

    const {dispatch, from, fayeClient} = this.props;
    const {content} = this.state;

    // Prevent empty messages from being created
    if (!content) {
      return;
    }

    // check if this is a special command
    if (specialCommand(content)) {
      dispatch(Actions.handleSpecialCommand(
        fayeClient, from, parseSpecialCommand(content)));
    } else {
      // trigger creating new message
      fayeClient.publish('/messages', {content, from});
    }

    // clean the input so it will be ready for the next message
    this.setState({content: ''});
  }

  onChange(event) {
    this.setState({content: event.target.value});
  }

  render() {
    const {content} = this.state;
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input type="text" value={content} className="form-control" ref="input"
          onChange={this.onChange.bind(this)} />
      </form>
    );
  }
}

export default connect(
  state => {
    return {
      from: state.username,
      fayeClient: state.faye
    };
  }
)(MessageInput);
