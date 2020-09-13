import React from "react";
import {createFeeds} from "../store/actions/feeds";
import {connect} from "react-redux";
import {getFeeds} from "../store/actions/feeds";
import { Skeleton} from "antd";
import {Card,ListGroup} from "react-bootstrap";

class Post extends React.Component {
    componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getFeeds(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getFeeds(newProps.token);
      }
    }
  }


  render() {
    this.items=this.props.feeds.map((item)=>


                  <ListGroup.Item><b>{item.teacher}</b><br/>{item.feedtxt}<br/>{item.created}</ListGroup.Item>

          )
    return (
      <div className="post">
          {this.props.loading ? (
          <Skeleton active />):
              <div>{console.log(this.props.feeds)}

            <ListGroup variant="flush">{this.items}</ListGroup>
              </div>}

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loading:state.feeds.loading,
      feeds:state.feeds.feeds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFeeds: (token) => dispatch(getFeeds(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);