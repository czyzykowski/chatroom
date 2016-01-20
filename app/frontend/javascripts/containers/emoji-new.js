import {keys, map} from 'ramda';
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import cx from 'classnames';
import * as Actions from '../actions';

class EmojiNew extends React.Component {
  handleSubmit(event) {
    event.preventDefault();

    const {dispatch} = this.props;
    const formData = new FormData();

    const codeNode = ReactDOM.findDOMNode(this.refs.code);
    const descriptionNode = ReactDOM.findDOMNode(this.refs.description);
    const imageNode = ReactDOM.findDOMNode(this.refs.image);

    formData.append('code', codeNode.value);
    formData.append('description', descriptionNode.value);
    formData.append('image', imageNode.files[0]);

    dispatch(Actions.createEmoji(formData));
  }

  renderErrors(errors) {
    return map(key => {
      return (<div key={key} className="alert alert-danger">{key} {errors[key]}</div>);
    }, keys(errors));
  }

  render() {
    const {onCancel, submitting, errors} = this.props;
    const cxCreate = cx({
      'btn': true,
      'btn-primary': true,
      'disabled': submitting
    });
    const cxCancel = cx({
      'btn': true,
      'btn-secondary': true,
      'disabled': submitting
    });

    return (
      <form onSubmit={this.handleSubmit.bind(this)} ref="form">
        <div className="modal" style={{display: 'block'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Create new emoji</h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col col-sm-12 col-md-12 col-lg-12">
                    {this.renderErrors(errors)}
                  </div>
                </div>
                <div className="row">
                  <div className="col col-sm-12 col-md-12 col-lg-12">
                    <fieldset className="form-group">
                      <label>Code</label>
                      <input type="text" className="form-control" ref="code"/>
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Description (optional)</label>
                      <input type="text" className="form-control" ref="description"/>
                    </fieldset>
                    <fieldset className="form-group">
                      <label>Image</label>
                      <input type="file" className="form-control-file" ref="image"/>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className={cxCancel} onClick={onCancel}>
                  Cancel
                </button>
                <button type="submit" className={cxCreate} onClick={this.handleSubmit.bind(this)}>
                  Create
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
    const {newEmoji} = state;
    return {
      submitting: newEmoji.step === 'request',
      errors: newEmoji.step === 'failure' ? newEmoji.errors : []
    };
  }
)(EmojiNew);
