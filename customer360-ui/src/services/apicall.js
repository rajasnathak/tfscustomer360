import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Input } from "reactstrap";
import { withRouter } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Select1 from 'react-select';
import "../assets/css/apicall.css";
import { Multiselect } from "multiselect-react-dropdown";


class APIForm extends Component {
  constructor(props) {
  // this.multiselectRef = React.createRef();
    super(props);
    this.state = {
      upid: "",
      sparam: "",
      filters: [],
      filterOptions: [
        { value: "party", label: "Party" },
        { value: "asset", label: "Asset" },
        { value: "altid", label: "Alternate ID" },
        { value: "borrower", label: "Borrower" },
        { value: "product", label: "Product" },

      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
    // const { history } = this.props;
  }

  handleMultiChange(option) {
    this.setState(state => {
      return {
        filters: option
      };
    });
  }
  
  handleParamChange(event) {
    const inputValue = event.target.value;

    this.setState({
      sparam: inputValue,
    });
    console.log(this.state);
  }

  onChangeOrg = () => {
    this.setState((initialState) => ({
      isOrg: !initialState.isOrg,
    }));
 }
 onChangeName = () => {
  this.setState(initialState => ({
    isName: !initialState.isName,
  }));
}

onSelect = () => {
  this.getSelectedValues();
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
    this.props.passToHeader(response, [this.state.sparam]);

    // console.log(response);
  }

  render() {
    return (
      <Form
        className="navbar-search navbar-search-dark form-inline d-md-flex justify-content-center"
        onSubmit={this.handleSubmit}
      >
            {/* <Multiselect 
            showArrow options={plainArray} 
            isObject={false} 
            //onSelect={this.onSelect}
            /> */}
            
            
        <Select1
          name="filters"
          placeholder="Filters"
          value={this.state.multiValue}
          options={this.state.filterOptions}
          onChange={this.handleMultiChange}
          isMulti={true}
        />

      
        
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
            <MenuItem value="vin">VIN</MenuItem> 
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
}
export default withRouter(APIForm);
