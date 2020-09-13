import React,{Component} from 'react';
import {Form, Input, Select, Button} from 'antd';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";


class Registration extends Component{
        render()
    {

    const { Option } = Select;


    const onFinish = values => {
        let is_student=false;
        if(values.userType== "student") is_student=true;
        console.log(is_student)
        this.props.onAuth(
            values.username,
            values.email,
            values.password,
            is_student);
        this.props.history.push('/')
        console.log('Received values of form: ', values);
    };


    return (
        <Form

            name="register"
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="email"

                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item
                name="userType"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please select your identity',
                    },

                ]}
            >
                <Select placeholder="Select a user type">
                    <Option value="student">Student</Option>
                    <Option value="teacher">Teacher</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                                    Signup
                                </Button>
                                Already have an account :
                                <NavLink style={{marginRight: '10px'}}
                                    to='/login/'> Login
                                </NavLink>
                            </Form.Item>

        </Form>
    );
}
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(username,email,password1,is_student)=>dispatch(actions.authSignup(username,email,password1,is_student))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Registration);