import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import isUrl from 'is-url';

import { getStation } from '../graphql/stations';
import { StationsContext } from '../context/stations';

class StationForm extends Component {
  state = {
    name: '',
    url: '',
    errors: {
      name: false,
      url: false
    },
    redirectToMain: false
  };

  get stationId() {
    return this.props.match.params.stationId;
  }

  async componentDidMount() {
    if (this.stationId) {
      const station = await getStation(this.stationId);
      this.setState({ station, name: station.name, url: station.url });
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const { name, value } = target;

    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: this.hasError(name, value) }
    });
  };

  handleSubmit = (event, saveStation) => {
    event.preventDefault();
    if (this.validate()) {
      const { station, name, url } = this.state;
      const data = { ...station, name, url };
      saveStation(data);
      this.setState({ redirectToMain: true });
    }
  };

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
    if (this.state.redirectToMain) {
      return <Redirect to="/" />;
    }
    const title = this.stationId ? 'Change station' : 'Add station';
    return (
      <StationsContext.Consumer>
        {({ saveStation }) => (
          <div className="form-container">
            <form onSubmit={event => this.handleSubmit(event, saveStation)}>
              <h1>{title}</h1>
              <fieldset className={this.errorClass('name')}>
                <label htmlFor="name">Station name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
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
          </div>
        )}
      </StationsContext.Consumer>
    );
  }
}

export default StationForm;
