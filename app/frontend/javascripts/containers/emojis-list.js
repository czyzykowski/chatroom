import {values, splitAt, length, map} from 'ramda';
import React from 'react';
import {connect} from 'react-redux';
import EmojiNew from './emoji-new';

class EmojisList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newEmoji: false};
  }
  renderEmoji(emoji) {
    return (
      <div className="media" key={emoji.code}>
        <div className="media-left">
          <img src={emoji.image} alt={emoji.code} width="64" height="64"/>
        </div>
        <div className="media-body">
          <h4 className="media-heading">:{emoji.code}:</h4>
          {emoji.description}
        </div>
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    if (newProps.success) {
      this.setState({newEmoji: false});
    }
  }

  newEmoji() {
    this.setState({newEmoji: true});
  }

  onCancel(event) {
    event.preventDefault();

    this.setState({newEmoji: false});
  }

  render() {
    const {newEmoji} = this.state;
    const emojis = values(this.props.emojis);
    const [right, left] = splitAt(length(emojis) / 2, emojis);

    return (
      <div>
        {newEmoji ? <EmojiNew onCancel={this.onCancel.bind(this)}/> : null}
        <div className="row">
          <div className="col col-sm-12 col-md-6 col-lg-6">
            {map(this.renderEmoji, left)}
          </div>
          <div className="col col-sm-12 col-md-6 col-lg-6">
            {map(this.renderEmoji, right)}
          </div>
        </div>
        <div className="row">
          <div className="col col-sm-12 col-md-12 col-lg-12">
            <div className="m-t-1">
              <button type="button" className="btn btn-primary pull-right" onClick={this.newEmoji.bind(this)}>
                New emoji
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    const {emojis, newEmoji} = state;
    return {
      emojis,
      success: newEmoji.step === 'success'
    };
  }
)(EmojisList);
