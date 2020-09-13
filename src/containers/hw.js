import React,{ useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {message} from "antd";

function Hw() {

    const [title,setTitle] = useState("");
    const [hw,setHw]=useState();
    const newHw=()=>{

        const uploadData =new FormData();
        uploadData.append('title',title);
        uploadData.append('hw',hw,hw.name);

        fetch('https://class-ro-om.herokuapp.com/application/hw/',{
            method:'POST',
            body: uploadData
        })
            .then(
                message.success("Done ! ")
            )
            .catch(error=>console.log(error))
    }
        return(
            <div className="hwdiv">
                <h3>Upload assignment</h3>

                <Form>
                  <Form.Group>
                      <Form.Control type="text" placeholder="Title" value={title}
                                   onChange={(evt)=>setTitle(evt.target.value)}/>

                        <br />
                    <Form.File id="hw" label="Attach File : " onChange={(evt)=>setHw(evt.target.files[0])}/>
                  </Form.Group>
                    <Button variant="primary" type="submit" onClick={()=>newHw()}>
                    Submit
                  </Button>
                </Form>
            </div>
        )

}

export default Hw