import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Input } from "reactstrap";
import { withRouter } from "react-router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Select1 from "react-select";
import "../assets/css/apicall.css";


const selectStyles = {
  option: (provided, state) => ({
    padding: 20,
    color: state.isSelected ? 'black' : 'black',
  
  }),
  control: (base) => ({
      ...base,
      fontSize: '16px',
      borderRadius: '4px',
      padding: '9.2px 12px',
      border: '0.5px solid #21274F !important',
      backgroundColor: 'transparent',
      
      boxShadow: 'none',
      '&:focus': {
          border: '0 !important',
      },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

class APIForm extends Component {
  constructor(props) {
    // this.multiselectRef = React.createRef();
    super(props);
    this.state = {
      upid: "",
      sparam: "",
      filters: [{ value: "Party", label: "Party" }],
      filterOptions: [
        { value: "Party", label: "Party" },
        { value: "Asset", label: "Asset" },
        { value: "Alternate Id", label: "Alternate ID" },
        { value: "Phone", label: "Phone" },
        { value: "Email", label: "Email" },
        { value: "Address", label: "Address" },
        { value: "Other Master Data", label: "Other" },
        { value: "Borrower", label: "Borrower" },
        { value: "Product", label: "Product" },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
    // const { history } = this.props;
  }

  handleMultiChange(option) { 
    // console.log(option);
    this.setState({
      filters: option,
    });
    console.log(this.state);

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
  };
  onChangeName = () => {
    this.setState((initialState) => ({
      isName: !initialState.isName,
    }));
  };

  
  onSelect = () => {
    this.getSelectedValues();
  };

  handleChange(event) {
    const inputValue = event.target.value;

    this.setState({
      upid: inputValue,
    });
    console.log(this.state);
  }

  // Event handler for submitting a search request for the form
  async handleSubmit(event) {
    var searchparameters = {
      "all": "all",
      "upid": "UUID",
      "name": "name",
      "acctNum": "Account number",
      "vin": "vin",
    }
 
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
    )
    .catch(function (error) {
      console.log(error.toJSON());
      console.log(error.toJSON().status);
      this.props.passToHeader(null, error.toJSON().status, null, null);
    });

    // eslint-disable-next-line react/prop-types
    this.props.passToHeader(response, 200, [searchparameters[this.state.sparam]], this.state.filters);

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
          styles={selectStyles}
          name="filters"
          placeholder="Filters"
          defaultValue ={{ value: "Party", label: "Party" }}
          options={this.state.filterOptions}
          onChange={this.handleMultiChange}
          isMulti={true}
        />

        <FormControl required sx={{ m: 1, minWidth: 150 }} id="search_param">
          <InputLabel id="demo-simple-select-required-label">
            Search by:{" "}
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
            <MenuItem value="all">All Data</MenuItem>
            <MenuItem value="upid">UPID</MenuItem>
            <MenuItem value="name">Customer Name</MenuItem>
            <MenuItem value="acctNum">Account No</MenuItem>
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