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
import data from "../data/c360-test-data.json";
// import styling
import "../assets/css/visualize.css";

const Visualize = () => {
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
      <div
        className="mt--9 container"
        fluid
        style={{ width: "100%", height: "auto" }}
      >
        {
          <div class="main-container">
            <div>
              <h2>Customer Insights</h2>
            </div>
            <Card style={{ width: "100%", height: "auto", marginTop: 80 }}>
              <CardBody>
                <ForceGraph
                  graphData={data.results.bindings}
                  nodeHoverTooltip={nodeHoverTooltip}
                />
              </CardBody>
            </Card>
          </div>
        }
      </div>
    </>
  );
};
export default Visualize;
