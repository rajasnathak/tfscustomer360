import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Input } from "reactstrap";
import { withRouter } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../assets/css/apicall.css";

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
    const headers = {
      method: "GET",
    };
    let response = await axios.get(
      "https://8enlt8jyo0.execute-api.us-east-1.amazonaws.com/prod/sparqlQuery",
      {
        headers: headers,
        params: {
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
        <FormControl required sx={{ m: 1, minWidth: 150 }} id="search_param">
          <InputLabel id="demo-simple-select-required-label">
            Search:{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={this.state.sparam}
            label="Select *"
            onChange={this.handleParamChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="upid">UPID</MenuItem>
            <MenuItem value="custName">Customer Name</MenuItem>
            <MenuItem value="accNo">Account No</MenuItem>
          </Select>
        </FormControl>
        <Input
          placeholder="Search for a customer"
          type="text"
          upid="upid"
          onChange={this.handleChange}
          value={this.state.upid}
        />
        <Button className="btn m-2" type="submit">
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
