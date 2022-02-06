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
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";
import "./Header.css";
import { withRouter } from "react-router";
import React from "react";
import APIForm from "services/apicall";

const Header = (props) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    history.push("/admin/visualize");
  };
  return (
    <>
      <div className="header bg-gradient-toyota pb-9">
        <Container fluid>
          <div className="header-body">
            <Row>
              <div className=" col d-flex justify-content-center">
                <img
                  alt="TFS Logo"
                  className="header-logo img-responsive center-block"
                  src={
                    require("../../assets/img/brand/TFS-logo-white.png").default
                  }
                ></img>
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
                  <APIForm></APIForm>
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
