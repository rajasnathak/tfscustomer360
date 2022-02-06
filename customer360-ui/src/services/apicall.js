import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";

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
      upid: inputValue,
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
          query_type: "sparql",
          search_param: "custID",
          value: this.state.upid,
        },
      }
    );
    console.log(response);
  }

  render() {
    return (
      <div>
        <Form
          className="navbar-search navbar-search-dark form-inline d-md-flex justify-content-center"
          onSubmit={this.handleSubmit}
        >
          <FormGroup className="my-3 mx-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Search for a customer"
                type="text"
                upid="upid"
                onChange={this.handleChange}
                value={this.state.upid}
              />
            </InputGroup>
          </FormGroup>
          <Button className="btn" type="submit">
            Search
          </Button>
        </Form>
      </div>
    );
  }
}
