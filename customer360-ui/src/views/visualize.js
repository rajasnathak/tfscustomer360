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

const Visualize = (props) => {
  // eslint-disable-next-line react/prop-types
  let dataReceived = true;
  const state = JSON.parse(props.history.location.state);
  let data = "";
  let searchParams = state.searchParams;
  // Check if data was sent
  if (state.data == null) dataReceived = false;
  else {
    data = JSON.parse(state.data.data);
  }

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
            {dataReceived == true ? (
              <Card style={{ width: "100%", height: "auto", marginTop: 80 }}>
                <CardBody>
                  <ForceGraph
                    graphData={data.results.bindings}
                    searchParams={searchParams}
                    nodeHoverTooltip={nodeHoverTooltip}
                  />
                </CardBody>
              </Card>
            ) : (
              <Card style={{ width: "100%", height: "auto", marginTop: 80 }}>
                <div id="error-container">
                  <h2>
                    {" "}
                    Sorry, no data was available for the provided {searchParams}
                    .
                  </h2>
                </div>
              </Card>
            )}
          </div>
        }
      </div>
    </>
  );
};
export default Visualize;
