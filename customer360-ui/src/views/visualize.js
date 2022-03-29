import React, {useState} from "react";
// import React from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import Accordion from 'react-bootstrap/Accordion';
// core components
import Header from "components/Headers/Header.js";
// Import Graph
import ForceGraph from "../components/Graph/Graph";
// Import hard-coded data
// import data from "../data/c360-test-data.json";
// import styling
import "../assets/css/visualize.css";
import CloseIcon from "@mui/icons-material/Close";

const Visualize = (props) => {
  // eslint-disable-next-line react/prop-types
  let dataReceived = true;
  const [value, setValue] = useState(JSON.parse(props.history.location.state));
  console.log(value);
  let data = "";
  // If state null, probably didn't search, just clicked visualization tab
  if (value != null) {
    var searchParams = value.searchParams;
    var filters = value.filters;
    console.log(filters);
    // Check if data was sent
    if (value.data == null) dataReceived = false;
    else {
      data = value.data.data;
      console.log(data);
    }
  }

  /* Change status of a panel from visible to hidden or viceversa
     id: identifier of the div to change
     status: 'on' or 'off'. If not specified, the panel will toggle status
  */
  let toggleDiv = function () {
    var nodeInfoDiv = document.getElementById("nodeInfo");
    let status = nodeInfoDiv.attr("class") == "panel_on" ? "off" : "on";
    nodeInfoDiv.attr("class", "panel_" + status);
  };

  let setClassName = function(categoryName) {
    // console.log(d);
    // var categoryName = d.target.children[1].innerHTML;
    if(value.filters.some(e => e.value == categoryName)) return "legend-row active-category";
    return "legend-row inactive-category";
  }

  let updateFilters = function (d) {
    
   
    // Update Class List for the category div
    var categoryName = d.target.children[1].innerHTML;
    console.log(categoryName);
    console.log("Clicked!");
    console.log(d);
    var classList = d.target.classList;
    if(classList.contains("inactive-category")) {
      classList.replace("inactive-category", "active-category");

      const newFilters = [...filters];
      newFilters.push({label: categoryName, value: categoryName});
      const newState = Object.assign({}, value);
      newState.filters = newFilters;
      setValue(newState);
      console.log(value.filters);
    }
    else {
      classList.replace("active-category", "inactive-category");
      let newFilters = filters.filter(function(e) {
        return e.value != categoryName;
      })
      console.log(newFilters);
      let newState = Object.assign({}, value);
      newState.filters = newFilters;
      setValue(newState);
      console.log(value.filters);
    }
    // Update filters state

  }

  // Scroll to visualization view
  React.useEffect(() => {
    window.scrollTo({
      top: 700,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`;
  }, []);
  return (
    <>
      <Header />
      <div className="mt--9 " style={{ width: "100%", height: "80%" }}>
        {
          <div className="main-container">
            <div>
              <h2>Customer Insights</h2>
            </div>
            {value == null ? (
              <Card style={{ width: "100%", height: "30vw", marginTop: 80 }}>
                <div className="error-container">
                  <h2 className="error-message">
                    {" "}
                    Looks like nothing on our end! Make sure to make a valid
                    search above. .
                  </h2>
                </div>
              </Card>
            ) : (
              <>
                {dataReceived == true ? (
                  <Card
                    style={{
                      width: "100%",
                      height: "auto",
                      marginTop: 80,
                      overflow: "hidden",
                    }}
                  >
                    <div>
                      
                      <ForceGraph
                        graphData={data.results.bindings}
                        filters={value.filters}
                        searchParams={value.searchParams}
                        nodeHoverTooltip={nodeHoverTooltip}
                      />
                      <div id="sidepanel">
                        <div id="nodeInfo" className="panel_off">
                          {/* <button id="drilldown">Drill down</button> */}
                        </div>
                      </div>
                      <Accordion defaultActiveKey="0" id="node-legend">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header className="btn btn-light">Node Legend</Accordion.Header>
                          <Accordion.Body>
                          <div>
                            <div id="category-info">
                              
                              <div className="legend-column justify-content-top">
                                <div className={setClassName("Party")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                    <circle cx="25" cy="25" r="10" fill="#eb0a1e"/>
                                  </svg>
                                  <h3 className="legend-label">Party</h3>
                                </div>
                                <div className={setClassName("Asset")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#2ca58d"/>
                                  </svg>
                                  <h3 className="legend-label">Asset</h3>
                                </div>
                                <div className={setClassName("Alternate Id")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#7a7c00"/>
                                  </svg>
                                  <h3 className="legend-label">Alternate Id</h3>
                                </div>
                                <div className={setClassName("Phone")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#bc5c00"/>
                                  </svg>
                                  <h3 className="legend-label">Phone</h3>
                                </div>
                                <div className={setClassName("Email")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#84bc9c"/>
                                  </svg>
                                  <h3 className="legend-label">Email</h3>
                                </div>
                              </div>
                              <div className="legend-column justify-content-top">
                                <div className={setClassName("Address")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#ff88a7"/>
                                  </svg>
                                  <h3 className="legend-label">Address</h3>
                                </div>
                                <div className={setClassName("Other")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#008c00"/>
                                  </svg>
                                  <h3 className="legend-label">Other</h3>
                                </div>
                                <div className={setClassName("Borrower")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#0a2342"/>
                                  </svg>
                                  <h3 className="legend-label">Borrower</h3>
                                </div>
                                <div className={setClassName("Product")} onClick={updateFilters}>
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#654a91"/>
                                  </svg>
                                  <h3 className="legend-label">Product</h3>
                                </div>
                                <div className="legend-row inactive-category" >
                                  <svg className="legend-node">
                                  <circle cx="25" cy="25" r="10" fill="#ffffff" className="drilldown-node"/>
                                  </svg>
                                  <h3 className="legend-label">Drill Down</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      
                    </div>
                  </Card>
                ) : (
                  <Card
                    style={{ width: "100%", height: "30vw", marginTop: 80 }}
                  >
                    <div className="error-container">
                      <h2 className="error-message">
                        {" "}
                        Sorry, no data was available for the provided{" "}
                        {searchParams}.
                      </h2>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>
        }
      </div>
    </>
  );
};
export default Visualize;
