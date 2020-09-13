import React from "react";
import { connect } from "react-redux";
import { Form, Input,  Button, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import QuestionForm from "./QuestionForm";
import Hoc from "../hoc/hoc";
import { createASNT } from "../store/actions/assignments";



class AssignmentCreate extends React.Component {


        state = {

            formCount: 1

        };


  remove = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount - 1
    });
  };

  add = () => {
    const { formCount } = this.state;
    this.setState({
      formCount: formCount + 1
    });
    console.log(formCount)
  };

  render() {
      const questions = [];
    const onFinish = values => {
    console.log('Received values of form:', questions);
  };
        for(let i=0;i<this.state.formCount;i+=1){
        questions.push(
        <Hoc key={i}>
          {questions.length > 0 ? (
            <MinusCircleOutlined
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={questions.length === 0}
              onClick={() => this.remove()}
            />
          ) : null}
          <QuestionForm id={i} {...this.props} />

          <Divider />
        </Hoc>
        );
    }
    return (
      <Form onFinish={onFinish}>
        <h1>Create an assignment</h1>
        <Form.Item label={"Title: "}
          name={`title`}
            validateTrigger={ ["onChange", "onBlur"]}
            rules={ [
              {
                required: true,
                message: "Please input a title"
              }
            ]}

          ><Input placeholder="Add a title" style={{width: '60%'}}/>
        </Form.Item>
        {questions}
        <Form.Item>
          <Button type="secondary" onClick={this.add}>
            <PlusOutlined type="plus" /> Add question
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}



export default AssignmentCreate;
