import React, { Component } from "react";
import axios from "axios";

export default class APIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upid: "",
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
    const { upid } = this.state;
    let response = await axios.get(
      "https://8enlt8jyo0.execute-api.us-east-1.amazonaws.com/prod/sparqlQuery",
      {
        params: {
          host:
            "database-1-instance-1.cxfekmmrk8o1.us-east-1.neptune.amazonaws.com:8182",
          method: "GET",
          query_type: "sparql/status",
        },
      }
    );
    console.log(response);
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
