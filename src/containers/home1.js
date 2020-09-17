import React from "react";
import '../css/Main.css';
import { connect } from "react-redux";

class home1 extends React.Component {
    componentDidMount() {
        console.log(this.props.isAuthenticated);
    }
  render() {

    return (
        <div className="centered">

            <h1 > --- </h1>
            <br/>
            <h1 > CLASS ROOM </h1>
            <br/>
            <h1 > --- </h1>
        </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};



export default connect(mapStateToProps)(home1);
