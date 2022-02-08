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
import { withRouter } from "react-router";

class APIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upid: "",
      sparam: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);


    // const { history } = this.props;
  }
  handleParamChange(event) {
    const inputValue = event.target.value;

    this.setState({
      sparam: inputValue,
    });
    console.log(this.state);
  }
  
  handleChange(event) {
    const inputValue = event.target.value;

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
          search_param: this.state.sparam,
          value: this.state.upid,
        },
      }
    );
    // console.log(response);
    // eslint-disable-next-line react/prop-types
    this.props.passToHeader(response);

    // console.log(response);
  }

  render() {
    return (
      <Form
          className="navbar-search navbar-search-dark form-inline d-md-flex justify-content-center"
          onSubmit={this.handleSubmit}
        >     
              <label>
                Search For:  
                  <select value={this.state.sparam} 
                  onChange={this.handleParamChange}>            
                  <option value="UPID">custID</option>
                  <option value="Name">Name</option>
                </select>
              </label>
              <Input
                placeholder="Search for a customer"
                type="text"
                upid="upid"
                onChange={this.handleChange}
                value={this.state.upid}
              />
          <Button className="btn" type="submit">
            Search
          </Button>
        </Form>
    );
  }
  // propTypes = {
  //   passToHeader: this.PropTypes.Object,
  // };
}
export default withRouter(APIForm);
