import React from "react";
import { connect } from "react-redux";
import {Card, message, Skeleton} from "antd";
import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail } from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import { createGASNT} from "../store/actions/gassignments";
import axios from "axios";
import {Alert,Button} from "react-bootstrap";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

class AssignmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      ram:{hello:"asd"},
    status: '',
  };
  }


  componentDidMount() {
    // if (this.props.token !== undefined && this.props.token !== null) {
    //   this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
    // }
    const cassign={
      username:this.props.username,
      asntID:this.props.match.params.id

    }
    console.log(cassign.username)
    axios
      .post(`https://class-ro-om.herokuapp.com/application/check/`, cassign)
      .then(res => {

           this.setState({ status: res.data.exists });


        })

  }

  render() {
    const { status } = this.state;
    console.log(status)
    return (
      <Hoc>
        {

    }

          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (<div>

                <Alert  variant="info">
        <center><Alert.Heading>You seem to have already submitted your answers for this Test</Alert.Heading></center>

        <hr />
        <div className="d-flex justify-content-end">
          <Button  variant="outline-info">
            Get Back
          </Button>
        </div>
      </Alert>

                </div>

            )}
          </Hoc>
        ) : null}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id)),
    createGASNT:(token,asnt) => dispatch(createGASNT(token,asnt))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetail);
