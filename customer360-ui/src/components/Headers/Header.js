/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "reactstrap";
import "../../assets/css/Header.css";
import React from "react";
import APIForm from "services/apicall";
// import { useHistory } from "react-router";
import { withRouter } from "react-router";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
// import { withRouter } from "react-router";

// eslint-disable-next-line react/prop-types
const Header = ({ history }) => {
  // var history = useHistory();

  let callbackFunction = (response, searchParams, filters) => {
    console.log(filters);
    let results = response.data.results.bindings;
    console.log(results);
    if (results.length == 0) {
      history.push(
        "/admin/visualize",
        JSON.stringify({ data: null, searchParams: searchParams, filters: filters })
      );
      window.location.reload();
    } else {
      history.push(
        "/admin/visualize",
        JSON.stringify({ data: response, searchParams: searchParams, filters: filters })
      );
      window.location.reload();
    }
  };
  // history.forward();
  return (
    <>
      <div className="header bg-gradient-toyota pb-9">
        <Container fluid>
          <div className="header-body">
            <Row>
              <div className=" col d-flex justify-content-center">
                <a href =  "/admin/index">
                <img
                  alt="TFS Logo"
                  className="header-logo img-responsive center-block"
                  src={
                    require("../../assets/img/brand/TFS-logo-white.png").default
                  }
                ></img>
                 </a>
              </div>
            </Row>
            <Row>
              <div className=" col d-flex justify-content-center">
                <h3 className="center-block justify-content-center title">
                  CUSTOMER 360
                </h3>
              </div>
            </Row>
            {/* Search bar for customers */}
            <Row>
              <Col>
                <Card className="my-5 bg-transparent">
                  <APIForm passToHeader={callbackFunction} />
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Header);
