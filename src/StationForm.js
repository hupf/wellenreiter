import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import isUrl from 'is-url';

class StationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      errors: {
        name: false,
        url: false
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: this.hasError(name, value) }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      const { name, url } = this.state;
      this.props.submit({ name, url });
    }
  }

  errorText = name => {
    if (this.state.errors[name]) {
      return <p className="form-error">This field is invalid</p>;
    }
  };

  errorClass = name => {
    return this.state.errors[name] ? 'has-error' : '';
  };

  validate() {
    const errors = ['name', 'url'].reduce((result, name) => {
      const value = this.state[name];
      const error = this.hasError(name, value);
      return { ...result, [name]: error };
    }, {});
    this.setState({ errors });
    return Object.values(errors).every(e => !e);
  }

  hasError(name, value) {
    switch (name) {
      case 'name':
        return value.trim().length === 0;
      case 'url':
        return value.trim().length === 0 || !isUrl(value);
      default:
        return false;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h1>Add Station</h1>
        <fieldset className={this.errorClass('name')}>
          <label htmlFor="name">Station name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleInputChange.bind(this)}
          />
          {this.errorText('name')}
        </fieldset>
        <fieldset className={this.errorClass('url')}>
          <label htmlFor="url">Streaming URL</label>
          <input
            id="url"
            name="url"
            type="text"
            value={this.state.url}
            onChange={this.handleInputChange.bind(this)}
          />
          {this.errorText('url')}
        </fieldset>
        <fieldset>
          <button className="button is-primary" type="submit">
            Save
          </button>
          <Link to="/">Cancel</Link>
        </fieldset>
      </form>
    );
  }
}

export default StationForm;
