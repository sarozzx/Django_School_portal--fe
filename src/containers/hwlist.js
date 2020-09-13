import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton } from "antd";
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";
import axios from "axios";

class HwList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      assignments:[],
  };
  }


  componentDidMount() {

    axios
      .get(`https://class-ro-om.herokuapp.com/application/hw/`)
      .then(res => {

           this.setState({ assignments: res.data});


        })
  }


  renderItem(item) {

    return (
        <div>
          <a className="list-group-item list-group-item-action">
      <Link to={`/hwsubmit/${item.id}`}>
        <List.Item >{item.title}</List.Item>

      </Link>
          </a>


    </div>
        );
  }

  render() {
    const {assignments} =this.state
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <div>
            <h3 style={{ margin: "16px 0" }}>Assignment List</h3>

            <List
              size="large"

              dataSource={assignments}
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
      userId:state.auth.userId,

  };
};

export default connect(
  mapStateToProps
)(HwList);
