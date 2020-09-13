import React from "react";
import { connect } from "react-redux";
import Result from "../components/Result";
import { List, Skeleton } from 'antd';
import { getGASNTS } from '../store/actions/gassignments';
import logo from '../images/maxresdefault.jpg';
import  '../css/Main.css'
import axios from "axios";
import {ListGroup} from "react-bootstrap";
import * as actions from "../store/actions/assignments";
import Grades from "../components/Grades";

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      grades:[],
      asnt:[],

  };
  }
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getGASNTS(this.props.username, this.props.token);
    }
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTS(this.props.token);
    }
    axios
      .get(`https://class-ro-om.herokuapp.com/application/gassignment/`)
      .then(res => {
            console.log(res.data)
           this.setState({ grades: res.data });



        })
  }

  componentWillReceiveProps(nextProps, nextContext) {

    if (nextProps.token !== this.props.token) {
      if (nextProps.token !== undefined && nextProps.token !== null) {
        this.props.getGASNTS(nextProps.username, nextProps.token);
      }
      if (nextProps.token !== undefined && nextProps.token !== null) {
        this.props.getASNTS(nextProps.token);
      }
    }
  }

  render() {


    console.log("hello")
    const {grades}=this.state
    const assign=this.props.assignments
    console.log(assign)
    this.assignm=assign.map((item)=>
                    <div>

                      <ListGroup.Item>
                        <b className="test-title">{item.title}</b>
                        <Grades id={item.id}/>

                  </ListGroup.Item>
                    </div>
    )

    this.grade=grades.map((item)=>
                  <div>

                  <ListGroup.Item>
                    <b className="test-title">{item.assignment}</b>
                    <br/>{item.student}<br/>
                    <Result key={item.id} grade={item.grade}/>
                  </ListGroup.Item>
                    </div>

          )
    const name=this.props.username
    this.gradde=grades.map((item)=>
        item.student===name?(

                  <ListGroup.Item><b>{item.assignment}</b><br/>{item.student}<br/><Result key={item.id} grade={item.grade}/></ListGroup.Item>)
                      :null

          )
    return (

        <div>
          {
            this.props.loading ?
                <Skeleton active/>
                :
                <div>
                  <section className="container-banner">
                  <img id="profilepic" src={logo}  width="170" height="170" alt="profilepic"/>
                    <h1> {this.props.username} </h1>
                    {this.props.is_teacher?(
                    <p id="paragarph1"> Teacher <br/></p>)
                    :(
                        <p id="paragarph1"> Student <br/>
                    </p>
                        )}

                  </section>
                  {this.props.is_teacher?(
                      <section id="container-about" className="container-about">
                    <h1>Tests Details</h1>


                    {this.assignm}

            </section>
                  ) :(
                      <section id="container-about" className="container-about">
                    <h1> My Test Details</h1>


                    <ListGroup  variant="flush">{this.gradde}</ListGroup>

            </section>
                      )}



                </div>

          }


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
    assignments: state.assignments.assignments,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGASNTS:(username,token)=> dispatch(getGASNTS(username,token)),
    getASNTS: token => dispatch(actions.getASNTS(token))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profile);



