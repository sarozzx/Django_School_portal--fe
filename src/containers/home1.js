import React from "react";
import '../css/Main.css';


class home1 extends React.Component {
  render() {
    console.log(this.props.is_teacher)
    return (
        <div className="centered">

            <h1 style={{fontFamily:"cursive"}}> --- </h1>
            <br/>
            <h1 style={{fontFamily:"cursive"}}> CLASS ROOM </h1>
            <br/>
            <h1 style={{fontFamily:"cursive"}}> --- </h1>
        </div>

    );
  }
}




export default (home1);
