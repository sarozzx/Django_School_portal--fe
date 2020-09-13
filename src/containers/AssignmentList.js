import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import axios from "axios";
import  '../css/Main.css'

class AssignmentList extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTS(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getASNTS(newProps.token);
      }
    }
  }


  renderItem(item) {

    return (
        <div>
          <a className="list-group-item list-group-item-action">
      <Link to={`/assignments/${item.id}`}>
        <List.Item >{item.title}</List.Item>

      </Link>
          </a>


    </div>
        );
  }

  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <div className="title12">
            <h3 style={{ margin: "16px 0" }}>Tests List</h3>


            <List
              size="large"

              dataSource={this.props.assignments}
              renderItem={item => this.renderItem(item)}
            />
          </div>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    assignments: state.assignments.assignments,
    loading: state.assignments.loading,
    username: state.auth.username,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getASNTS: token => dispatch(actions.getASNTS(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentList);
