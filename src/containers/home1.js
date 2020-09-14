import React from "react";
import '../css/Main.css';


class home1 extends React.Component {
  render() {
    console.log(this.props.is_teacher)
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




export default (home1);
