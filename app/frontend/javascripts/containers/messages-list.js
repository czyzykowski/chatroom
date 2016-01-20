import {split, map, length, join, prop, clone, takeWhile, dropWhile, concat} from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {connect} from 'react-redux';

function groupMessages(messages) {
  // if set of messages has the same timestamp (up to a minute) group them
  // together, as one
  const combine = msgs => {
    if (length(msgs) === 1) {
      return msgs[0];
    }

    const message = clone(msgs[0]);
    message.content = join('\n', map(prop('content'), msgs));
    return message;
  };

  // replace js date object with convinient HH:MM timestamp, also clone the
  // list so that change will be only visible here
  let updated = map(msg => {
    msg.ts = moment(msg.createdAt).format('h:mm');
    return msg;
  }, clone(messages));

  let combined = [];

  // Look for messages with the same timestamp and from the same user
  const same = msg => msg.from === updated[0].from && msg.ts === updated[0].ts;

  // Group messages by users and by timestamps, similarly to what Slack is
  // doing
  while (length(updated) > 0) {
    combined = concat(combined, combine(takeWhile(same, updated)));
    updated = dropWhile(same, updated);
  }

  return combined;
}

const isGiphy = line => line.match(/^http:\/\/.*\.gif!\d+!\d+$/);
const renderGiphy = line => {
  const [url, width, height] = split('!', line);
  return <img width={width} height={height} src={url}/>;
};

class MessagesList extends React.Component {
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this.refs.messages);
    // scroll to the bottom on each update
    node.scrollTop = node.scrollHeight;
  }

  renderLine(line, i) {
    const {emojis} = this.props;

    const addEmoji = line => {
      const words = split(' ', line);

      return words.map((word, j) => {
        const key = `${i}-${j}`;

        // potential emoji code
        if (word.match(/:\w+:/)) {
          // strip colons from the both sides of the emoji code
          const code = word.slice(1, -1);
          const emoji = emojis[code];

          if (emoji) {
            return <img key={key} width="24" height="24" src={emoji.emoji}/>;
          }
        }
        // space around {word} is required to not to smuch all words together
        return <span key={key}> {word} </span>;
      });
    };

    return (
      <span key={i}>{isGiphy(line) ? renderGiphy(line) : addEmoji(line)}<br/></span>
    );
  }

  renderMessage(message) {
    const created = moment(message.createdAt);
    return (
      <div key={message.id}>
        <div className="message">
          <strong className="message-from">{message.from}</strong>
          <span className="text-muted message-created">{created.format('h:mm')}</span>
        </div>
        <div>
          {split('\n', message.content).map(this.renderLine.bind(this))}
        </div>
      </div>
    );
  }

  render() {
    const {messages, height} = this.props;
    return (
      <div className="card">
        <div className="card-block" style={{height, overflow: 'scroll'}} ref="messages">
          {map(this.renderMessage.bind(this), groupMessages(messages))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const {messages, emojis} = state;
    return {messages, emojis};
  }
)(MessagesList);
