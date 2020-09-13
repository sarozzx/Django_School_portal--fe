import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import  '../css/Main.css'
import Hoc from "../hoc/hoc";
import {Nav,NavDropdown} from "react-bootstrap";
import  Navbar from "react-bootstrap/Navbar";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
          <div className="layout1">


            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
              <Navbar.Brand className="navbrand">ClassRoom</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                </Nav>
                <Nav>
                    <Navbar.Text>
                        {this.props.isAuthenticated ? (<div>
                            Signed in as: <a href="#login">{this.props.username}</a></div>):null}
    </Navbar.Text>

                    {this.props.isAuthenticated ? (

              <Nav.Link onClick={this.props.logout} className="navbar1">
                  <Link to="/" style={{color:"lightgray"}}>
                Logout
                  </Link>
              </Nav.Link>

            ) : (

              <Nav.Link className="navbar1">
                  <Link to="/login" style={{color:"lightgray"}}>
                Login
                      </Link>
              </Nav.Link>

            )}

                </Nav>
              </Navbar.Collapse>
            </Navbar>


        <Content style={{ padding: "0 10px" }}>

              <Nav className="nav1">


                <Nav.Item>{this.props.isAuthenticated ?(
                    <Nav.Link>
                <Link to="/home">

                    Feed

                </Link>
                        </Nav.Link>):
                    <Nav.Link>
                <Link to="/">

                    Home

                </Link>
                        </Nav.Link>}
                    </Nav.Item>




              {
                this.props.token!==null?(


                            <Nav.Item>
                                <Nav.Link>

                                <Link to={`/profile/${this.props.userId}`}>

                                        Profile

                                </Link>
                                    </Nav.Link>

                                </Nav.Item>




                      ):null
              }
              {
                this.props.token!==null && this.props.is_teacher ?(
                    <NavDropdown title="Create" id="nav-dropdown">
                        <NavDropdown.Item ><Link to="/addhw"> Assignments</Link></NavDropdown.Item>

        <NavDropdown.Divider />
                        <NavDropdown.Item><Link to="/create">Tests</Link></NavDropdown.Item>
      </NavDropdown>





                      ):null
              }
                  {this.props.token!==null?(
              <NavDropdown title="Work" id="nav-dropdown">
                        <NavDropdown.Item ><Link to="/hwlist"> Assignments</Link></NavDropdown.Item>

        <NavDropdown.Divider />
                        <NavDropdown.Item><Link to="/tests">Tests</Link></NavDropdown.Item>
      </NavDropdown>):null}
              </Nav>


      <br/>
          <div className="div1" style={{ background: "#fff", padding: 24, minHeight: 400 }}>
            {this.props.children}
          </div>
        </Content>
              <br/>

      </div>

      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token:state.auth.token,
    is_teacher:state.auth.is_teacher,
      username:state.auth.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
