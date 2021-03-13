import {Form, Input, Button, Checkbox, Layout, Row, Col, Alert} from 'antd';
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/lib/layout/layout";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import React, {useState} from "react";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Title from "antd/lib/typography/Title";
import {authApi} from "../../redux/service/authApi";
import userActions from "../../redux/action/userActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = (props) => {

    const [data, setData] = useState({
        password: "",
        username: ""
    })
    const [request, setRequest] = useState(false)

    const [error, setError] = useState(null)

    const onFinish = (values) => {
        setRequest(true);
        console.log(data);
        authApi.login(data).then(
            res => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                console.log(res.data.token)
                setRequest(false)
                console.log(localStorage.getItem("token"));
                // props.isLoggedIn();
                // <Redirect to={'/dashboard'}/>
                window.location.reload();
            }
        ).catch(
            err => {
                console.log(err)
                setRequest(false)
                setError("Username yoki password xato!")
            }
        )
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{height: "100vh"}}
        ><Col xs={20} sm={12} md={8} lg={6}>
            <Content>
                <Title level={2}>
                    Admin NewsUpdate
                </Title>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            }
                        ]}

                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                               onChange={e => (setData({...data, username: e.target.value}))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password" onChange={e => (setData({...data, password: e.target.value}))}/>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{width: "100%"}} block type="primary" htmlType="submit"
                                className="login-form-button"
                                disabled={request}
                        >
                            Kirish
                        </Button>
                        {error && <Alert message="Username yoki password xato" type="error" showIcon/>
                        }
                    </Form.Item>
                </Form></Content>
        </Col>
        </Row>);
};


const mstp = state => (state);
// const mdtp = dispatch => ({
    // isLoggedIn : () => {
    //     dispatch(userActions.loggedIn())
    // }
// });

export default connect(mstp, null)(Login);