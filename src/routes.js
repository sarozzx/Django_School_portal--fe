import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";
import home from "./containers/home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import AssignmentList from "./containers/AssignmentList";
// import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/assigncreate";

import Hwsubmit from "./containers/hwsubmit";
import Hw from "./containers/hw";
import HwList from "./containers/hwlist";
import home1 from "./containers/home1";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/home" component={home} />
    <Route exact path="/" component={home1} />
    <Route exact path="/addhw" component={Hw} />
    <Route exact path="/hwlist" component={HwList} />
    <Route exact path="/hwsubmit/:id" component={Hwsubmit} />
    <Route exact path="/tests" component={AssignmentList} />
    <Route exact path="/assignments/:id" component={AssignmentDetail} />
    <Route exact path="/create" component={AssignmentCreate} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/profile/:id" component={Profile} />
  </Hoc>
);

export default BaseRouter;
