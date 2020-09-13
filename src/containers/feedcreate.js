import React from "react";
import {createFeeds, getFeeds} from "../store/actions/feeds";
import {connect} from "react-redux";
import '../css/Main.css'
import Button from "react-bootstrap/Button";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    feed: '',
  }
  }
  //  componentDidMount() {
  //   console.log(this.props.username)
  //    if (this.props.token !== undefined && this.props.token !== null) {
  //      this.props.getFeeds(this.props.token);
  //    }
  //  }
  //
  //
  // componentWillReceiveProps(nextProps, nextContext) {
  //
  //   if (nextProps.token !== this.props.token) {
  //     if (nextProps.token !== undefined && nextProps.token !== null) {
  //       this.props.getFeeds(nextProps.token);
  //     }
  //   }
  // }

   handleChange = event => {
    this.setState({ feed: event.target.value });

  }
  handleSubmit=()=> {
    console.log(this.props.username)
    const data={
      teacher:this.props.username,
      feedtxt:this.state.feed
    }
    console.log(data)
    this.props.createFeeds(this.props.token,data);
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit} className="form1">


            <input type="text" className="input1" name="feed" onChange={this.handleChange} placeholder="Share Something"/>
          {' '}
          <Button className="button" variant="success" size="lg">Share</Button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.feeds.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFeeds:(token)=>dispatch(getFeeds(token)),
    createFeeds: (token, data) => dispatch(createFeeds(token, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
