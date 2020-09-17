import React from "react";
import { connect } from "react-redux";
import {Card, List, message, Skeleton} from "antd";
import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail } from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import { createGASNT} from "../store/actions/gassignments";
import axios from "axios";
import {Alert, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

class AssignmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      usersAnswers:{},
    status: '',
  };
  }


  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
    }
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

  componentWillReceiveProps(nextProps, nextContext) {

    if (nextProps.token !== this.props.token) {
      if (nextProps.token !== undefined && nextProps.token !== null) {
        this.props.getASNTSDetail(nextProps.token, this.props.match.params.id);
      }
    }
  }

  onChange = (e, qId) => {
    console.log("radio checked", e.target.value);
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({ usersAnswers });
  };

  handleSubmit(){
    console.log(this.state.usersAnswers);
      const { usersAnswers } =this.state;
      const asnt={
        username:this.props.username,
        asntID:this.props.currentAssignment.id,
        answer: usersAnswers
      }
      message.success("Submitting your answers");
      this.props.createGASNT(this.props.token, asnt);
  }

  render() {
    const { currentAssignment } = this.props;

    const {title}=currentAssignment

    const { usersAnswers } = this.state;
    const {status} =this.state

    return (
      <Hoc>
        {status===true?(
            <Alert  variant="info">
        <center><Alert.Heading>You seem to have already submitted your answers for this Assignment</Alert.Heading></center>

        <hr />
        <div className="d-flex justify-content-end">
          <Link to={`/assignments/`}>
          <Button  variant="outline-info">
            Get Back
          </Button>
          </Link>
        </div>
      </Alert>
        ) :
            (
    Object.keys(currentAssignment).length > 0 ? (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
                this.props.is_teacher?(
                    <div>
                      <h3 style={{ margin: "16px 0" }}>Tests List</h3>


                      <List
                        size="large"

                        dataSource={this.props.assignments}
                        renderItem={item => this.renderItem(item)}
                      />
                    </div>
                    )
                    :
                    (<div>

              <Card title={title}>
                <Questions
                    submit={()=>this.handleSubmit()}
                  questions={currentAssignment.questions.map(q => {


                    return (
                    <Card
                      style={cardStyle}
                      type="inner"
                      key={q.id}
                      title={`${q.order}. ${q.question}`}
                    >
                      <Choices
                        questionId={q.order}
                        choices={q.choices}
                        change={this.onChange}
                        usersAnswers={usersAnswers}
                      />
                      </Card>

                  )


                  })
                  }

                />
                                    </Card>
                </div>)

            )}
          </Hoc>
        ) : null
            )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading,
    is_teacher:state.auth.is_teacher,
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
