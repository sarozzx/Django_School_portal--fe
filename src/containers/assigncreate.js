import React from "react";
import { connect } from "react-redux";
import { Form, Input,  Button, Divider,Space } from "antd";
import { MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import QuestionForm from "./QuestionForm";
import Hoc from "../hoc/hoc";
import { createASNT } from "../store/actions/assignments";



class AssignmentCreate extends React.Component {

  render() {

    const onFinish = values => {

        const questions = [];
        for (let i = 0; i < values.questions.length; i += 1) {
          questions.push({
            question: values.questions[i].question,
            choices: values.questions[i].choices,
            answer: values.questions[i].answer,
          });
        }
        console.log('Received values of form:', questions);
        const asnt={
            teacher:this.props.username,
            title:values.title,
            questions
        }
        this.props.createASNT(this.props.token,asnt);
        this.props.history.push('/tests');
  };




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

        <Form.List name="questions">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (

                <div >
                    <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                  <Form.Item
                      label={"Question: "}
                    {...field}
                    name={[field.name, 'question']}
                    fieldKey={[field.fieldKey, 'question']}
                    rules={[{ required: true, message: 'Missing question' }]}
                  >
                    <textarea  placeholder="Add a Question" style={{width: '100%', display: 'flex'}} />
                  </Form.Item>


                  <Form.Item
                      label={"Answer: "}
                    {...field}
                    name={[field.name, 'answer']}
                    fieldKey={[field.fieldKey, 'answer']}
                    rules={[{ required: true, message: 'Missing answer' }]}
                  >
                    <Input placeholder="Add the answer"/>
                  </Form.Item>

                    <Form.List name={[field.name,"choices"]}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item

                  label={index === 0 ? 'Choices' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Add an answer choice",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Add a Choice" style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add Choice
                </Button>

              </Form.Item>
            </div>
          );
        }}
      </Form.List>


                    <Divider/>
                    </div>



              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add Question
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.assignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createASNT: (token, asnt) => dispatch(createASNT(token, asnt))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentCreate);
