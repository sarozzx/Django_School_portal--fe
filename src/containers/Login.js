import React from "react";
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox,Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth'
import LoginCheck from "./logincheck";

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            authen:undefined
        }



    }
     componentDidMount() {
        console.log(this.props.isAuthenticated);
    }


    onFinish = values => {
            this.props.onAuth(values.username,values.password)
            console.log(this.props.isAuthenticated)
        };
    render() {
        let errorMessage = null;
        if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
        }
        const onFinish = values => {
            this.props.onAuth(values.username,values.password)
            // this.setState({authen:this.props.isAuthenticated})

        };

        return (
            <div>
                {errorMessage}
                {
                    this.props.loading ?

                        <Spin />

                        :
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                        ><h1 >Login : </h1>
                                <Form.Item
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Username!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                                    />
                                </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"

                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                                    Login
                                </Button>
                                Or
                                <NavLink style={{marginRight: '10px'}}
                                    to='/signup/'> Signup
                                </NavLink>
                            </Form.Item>
                        </Form>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        err:state.auth.error,
            isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(username,password)=>dispatch(actions.authLogin(username,password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NormalLoginForm);