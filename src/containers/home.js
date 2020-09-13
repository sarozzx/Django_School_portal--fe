import React from "react";
import './home.css';
import {createASNT} from "../store/actions/assignments";
import {connect} from "react-redux";
import {createFeeds} from "../store/actions/feeds";
import Post from "./feedlist";

import PostForm from "./feedcreate";

class home extends React.Component {
  render() {
    console.log(this.props.is_teacher)
    return (
      <div className="App">
        <h1 style={{fontFamily:"cursive"}}>Feed</h1>

        <Feed is_teacher={this.props.is_teacher} />
      </div>
    );
  }
}

class Feed extends React.Component {

  render() {
    console.log(this.props.username)
    return (
      <div className="feed">
        {this.props.is_teacher? (<PostForm/>)
        :null}

        <Post />


      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.feeds.loading,
    is_teacher:state.auth.is_teacher
  };
};


export default connect(mapStateToProps)(home);
