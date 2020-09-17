import React from "react";
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox,Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth'

class LoginCheck extends React.Component {

    componentDidMount() {
        console.log(this.props.isAuthenticated);
    }

    render() {

        return (
            <div>
                HELLO
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


export default connect(mapStateToProps)(LoginCheck);