import React, { Component } from 'react';
import {Errors} from "./Errors"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      taken: false,
      serverError: false,
    };
  }

  callAPI = () => {
    console.log(this.state.username);
    fetch(`https://hxj1tck8l1.execute-api.us-east-1.amazonaws.com/default/users/taken?username=${this.state.username}`)
    .then(res => res.json())
    .then(
      (result) => {
        if (result.error) {
          this.setState({serverError: true});
        }
        else {
          this.setState({serverError: false})
        }
        console.log(result);
        this.setState({taken: result.taken});
      }
    )
  }

  handleChange = async function(event) {
    await this.setState({username: event.target.value});
    if (this.state.username.length >= 4) {
      this.callAPI();
    }
  }

  checkStatus = () => {
    if (this.state.username.length >= 4 && !this.state.taken && !this.state.serverError) {
      return "good";
    }
    else if (this.state.username.length === 0) {
      return "";
    }
    else {
      return "bad";
    }
  }

  render = () => {
    return (
      <div className="box">
        <h1>USER REGISTRATION</h1>
        <input className={this.checkStatus()} type="text" id="username" value ={this.state.username} onChange={(e) => {this.handleChange(e)}}/>
        <Errors username = {this.state.username} taken = {this.state.taken} serverError = {this.state.serverError}/>
      </div>
    )
  }
}

export default App;
