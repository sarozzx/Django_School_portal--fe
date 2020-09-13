import React,{ useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {message} from "antd";
import axios from "axios";
import {connect} from "react-redux";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import  '../css/Main.css'



class hwsubmit1 extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
      title:'',
        hwlink:'',
        id:0,
        hw:undefined,
        hwsub: []
    };
  }

  componentDidMount() {
         axios
      .get(`https://class-ro-om.herokuapp.com/application/hw/${this.props.match.params.id}`)
      .then(res => {
        const data1 = res.data;
        this.setState({ title: data1.title });
        this.setState({ hwlink: data1.hw });
        this.setState({id:data1.id})

      })
      .catch(err =>error=>console.log(error));

         axios
      .get(`https://class-ro-om.herokuapp.com/application/hwsubmit/?assign_id=${this.props.match.params.id}`)
      .then(res => {
        const data1 = res.data;
        this.setState({ hwsub: data1 });


      })
      .catch(err =>error=>console.log(error));
  }


    newHw=()=>{
        const {id}=this.state;
        const {hw}=this.state;


        const uploadData =new FormData();
        uploadData.append('assignment',this.props.match.params.id);
        uploadData.append('hwsubmitted',hw,hw.name);
        uploadData.append('student',this.props.userId)

        fetch(`https://class-ro-om.herokuapp.com/application/hwsubmit/`,{
            method:'POST',
            body: uploadData
        })
            .then(
                message.success("Done ! ")
            )
            .catch(error=>console.log(error))
    }





    render() {
        const {title}=this.state;
        const {hwlink}=this.state;
        const {hwsub}=this.state;
        this.print=hwsub.map((item)=>
            <Col sm={4}>
                <b>{item.student}</b>
                <a href={item.hwsubmitted} download>
            <img src="https://www.pinclipart.com/picdir/big/41-414384_eps-to-png-converter-free-download-file-icon.png" width="10%"/>
        </a>
            </Col>

        )

        return(
            <div className="hwdiv">
                {this.props.is_teacher?(
                    <div className="title12">
                        <h3 >{title}</h3>
                        <br/><div className="assign12"> Assignment:<br/>
                        <a href={hwlink} download>
            <img src="https://i7.uihere.com/icons/943/985/216/file-download-cdca8a6e3bbce5dc496180c66276c693.png" width="5%"/>
        </a><br/></div><hr/>
        Submitted:
                        <Container>
                          <Row>
                              {this.print}
                          </Row>
                        </Container>
                    </div>
                    )
                    :
                    <div>
                <h3>Submit assignments</h3>

                <Form>
                    <Form.Group>

                        Download assignment file :<br/>

                        <a href={hwlink} download>
            <img src="https://i7.uihere.com/icons/943/985/216/file-download-cdca8a6e3bbce5dc496180c66276c693.png" width="20%"/>
        </a>


                        <br />

            <Form.File id="hw" label="Attach File : " onChange={(evt)=>this.setState({hw:evt.target.files[0]})}/>
                  </Form.Group>
                    <Button variant="primary" type="submit" onClick={()=>this.newHw()}>
                    Submit
                  </Button>

                </Form>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
      userId:state.auth.userId,
      is_teacher:state.auth.is_teacher

  };
};


export default connect(
  mapStateToProps
)(hwsubmit1);