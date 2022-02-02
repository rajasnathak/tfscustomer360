import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upid: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.upid;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    await axios.post(
      'https://8enlt8jyo0.execute-api.us-east-1.amazonaws.com/prod',
      { param: `${upid}` }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>UPID:</label>
          <input
            type="text"
            upid="UPID"
            onChange={this.handleChange}
            value={this.state.upid}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
