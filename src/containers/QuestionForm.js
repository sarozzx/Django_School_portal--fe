
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from "react";



class QuestionForm extends React.Component {
    constructor() {
    super();
    this.state = {
      name: "",
      shareholders: [{ name: "" }]
    };
  }

    render() {
        let id=0;

        return (

            <div>

                  <Form.Item
                                    label="Question: "
                                    name={`question[${this.props.id}]`}

                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={ [
                                      {
                                        required: true,
                                        message: "Please input a question"
                                      }
                                    ]}>
                                  <Input   placeholder="Add a question" style={{width: '60%'}}/>
                                </Form.Item>

                                <Form.Item label="Answer: "
                                  name={`answers[${this.props.id}]`}
                                    validateTrigger={ ["onChange", "onBlur"]}
                                    rules={ [
                                      {
                                        required: true,
                                        message: "Please input an answer to this question"
                                      }
                                    ]}
                                  ><Input placeholder="What is the answer?" style={{width: '60%'}}/>

                                </Form.Item>

        <Form.List name={`questions[${this.props.id}]`}>
         {(fields, {add, remove}) => {
                        return (
                            <div>
             {fields.map((field, index) => (
        <Form.Item

            label={index === 0 ? "Choices" : ""}

                  required={false}
                    key={field.key}
                >
            < Form.Item
                {...field}


              validateTrigger={ ["onChange", "onBlur"]}
              rules={ [
                {
                  required: true,

                  message: "Please input a choice to the question"
                }
              ]}
            noStyle>

        <Input placeholder="Answer choice" style={{ width: '60%' }} value={this.state.shareholders.name}/>
        {id=id+1}
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
                                        style={{width: '60%'}}
                                    >
                                        <PlusOutlined/> Add an answer choice
                                    </Button>
          <Button
                                        type="dashed"


                                        style={{width: '60%'}}
                                    >
                                        <PlusOutlined/> Add
                                    </Button>

                                </Form.Item>

                            </div>
                        );
                    }}
        </Form.List>


            </div>
        );

    }

};

export default QuestionForm