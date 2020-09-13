import React from "react";
import { Progress } from 'antd';
import axios from "axios";
import Result from "./Result";
import {getGASNTS} from "../store/actions/gassignments";
import * as actions from "../store/actions/assignments";
import {connect} from "react-redux";
import {ListGroup} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";


class Grades extends React.Component{
    constructor(props) {
    super(props);
    this.state={
      grades:[],


  };
  }
    componentDidMount() {
        axios
      .get(`https://class-ro-om.herokuapp.com/application/gassignment1/?assign_id=${this.props.id}`)
      .then(res => {
        this.setState({ grades: res.data});
          console.log(this.state.grades)

      })
      .catch(err => {
        console.log(err)
      });
    }
    componentWillReceiveProps(nextProps, nextContext) {

    if (nextProps.token !== this.props.token) {
      if (nextProps.token !== undefined && nextProps.token !== null) {
        this.props.getGASNTS(nextProps.username, nextProps.token);
      }

    }

  }
    render() {
        const {grades}=this.state
    this.grade=grades.map((item)=>
                  <div>
                <Col sm={8}>

                    <br/>{item.student}<br/>
                    <Result key={item.id} grade={item.grade}/>
                </Col>
                    </div>

          )
        return(<div>
                <Container>
                          <Row>
                <ListGroup horizontal  variant="flush">
                {this.grade}
                </ListGroup>
                              </Row>
                        </Container>
            </div>

        )
    }
}

const mapStateToProps = state => {

  return {
    token: state.auth.token,
    username: state.auth.username,
    gassignments:state.gassignments.assignments,
    loading:state.gassignments.loading,
    is_teacher:state.auth.is_teacher,


  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGASNTS:(username,token)=> dispatch(getGASNTS(username,token)),

  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Grades);


