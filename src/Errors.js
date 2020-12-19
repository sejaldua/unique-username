import React, { Component } from 'react';

class Errors extends Component {
  constructor(props) {
    super(props);
  }

  checkLength = () => {
    if (this.props.username.length != 0 && this.props.username.length < 4) {
      return "Username must be at least 4 characters long";
    }
  }

  checkUnique = () => {
    if (this.props.taken) {
      return "This username is not unique."
    }
  }

  checkServerError = () => {
    if (this.props.serverError) {
      return "Oops. There was an internal service error :("
    }
  }

  render = () => {
    return (
      <div>
        <p> {this.checkLength()} </p>
        <p> {this.checkUnique()} </p>
        <p> {this.checkServerError()} </p>
      </div>
    )
  }
}

export {
  Errors
}
