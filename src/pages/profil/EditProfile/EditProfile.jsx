import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import Title from "antd/lib/typography/Title";

const EditProfile = () => {
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const buttonItemLayout = {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    };


    return (
        <div>
            <Form
                form={form}
                {...formItemLayout}
                layout={'vertical'}
                initialValues={{
                    layout: 'vertical'
                }}
            >
                <Row>
                    <Col span={12}>
                        <Title
                            className={"d-flex justify-content-start"} type="primary" level={5}>
                            Profil Malumotlarini o'zgartirish
                        </Title>

                        <Form.Item label="Fullname">
                            <Input placeholder="Fullname"/>
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            <Input placeholder="Phone Number"/>
                        </Form.Item>
                        <Form.Item label="telegram">
                            <Input placeholder="telegram"/>
                        </Form.Item>
                        <Form.Item label="instagram">
                            <Input placeholder="Instagram"/>
                        </Form.Item>
                        <Form.Item label="Facebook">
                            <Input placeholder="Facebook"/>
                        </Form.Item>
                        <Form.Item
                        >
                            <Button {...buttonItemLayout} className={"d-flex justify-content-start"}
                                    type="primary">Saqlash</Button>
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <Title
                            className={"d-flex justify-content-start"} level={5} type="primary">
                            Parollarni o'zgartirish
                        </Title>
                        <Form.Item label="Current Password">
                            <Input.Password placeholder="Current Password"/>
                        </Form.Item>
                        <Form.Item label="New Password">
                            <Input.Password placeholder="New Password"/>
                        </Form.Item>
                        <Form.Item label="Confirm Password">
                            <Input.Password placeholder="Confirm Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button {...buttonItemLayout} className={"d-flex justify-content-start"}
                                    type="primary">Saqlash</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default EditProfile;