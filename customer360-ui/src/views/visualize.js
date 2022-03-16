import React from "react";
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
  const state = JSON.parse(props.history.location.state);
  let data = "";
  // If state null, probably didn't search, just clicked visualization tab
  if (state != null) {
    var searchParams = state.searchParams;
    // Check if data was sent
    if (state.data == null) dataReceived = false;
    else {
      data = state.data.data;
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

  // Scroll to visualization view
  React.useEffect(() => {
    window.scrollTo({
      top: 600,
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
            {state == null ? (
              <Card style={{ width: "100%", height: "30vw", marginTop: 80 }}>
                <div class="error-container">
                  <h2 class="error-message">
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
                        searchParams={searchParams}
                        nodeHoverTooltip={nodeHoverTooltip}
                      />
                      <div id="sidepanel">
                        <div id="nodeInfo" className="panel_off">
                          {/* <button id="drilldown">Drill down</button> */}
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card
                    style={{ width: "100%", height: "30vw", marginTop: 80 }}
                  >
                    <div class="error-container">
                      <h2 class="error-message">
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
