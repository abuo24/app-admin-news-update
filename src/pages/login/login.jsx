import {Form, Input, Button, Checkbox, Layout, Row, Col} from 'antd';
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/lib/layout/layout";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import React from "react";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Title from "antd/lib/typography/Title";

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

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{height: "100vh"}}
        ><Col  xs={20} sm={12} md={8} lg={6}>
            <Content>
                <Title level={2}>
                    Admin NewsUpdate
                </Title>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button style={{width: +"100%"}} block  type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form></Content>
        </Col>
        </Row>);
};

export default Login;