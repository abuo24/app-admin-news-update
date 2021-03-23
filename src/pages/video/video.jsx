import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Row, Select, Upload} from "antd";
import {postsApi} from "../../redux/service/postsApi";
import {toast, ToastContainer} from "react-toastify";
import {shortNewsApi} from "../../redux/service/shortNewsApi";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {Option} from "antd/lib/mentions";
import CKEditor from "ckeditor4-react";
import {videosApi} from "../../redux/service/videosApi";

const Video = (props) => {

    const [dataPost, setDataPost] = useState({
        titleUz: "",
        titleRu: "",
        link: ""
    })


    const note = () => toast.info("Yaratildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");


    const onFinish = () => {
         videosApi.add(dataPost).then(res => {
            console.log(res);
            note();
            form.resetFields();
        }).catch(err => {
            console.log(err);
            danger()
        })
    };
    const [form] = Form.useForm();

    useEffect(() => {
        // console.log(props.category_reducer.categories)
    }, [props]);

    console.log(dataPost);

    return (
        <div className="App">

            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={[16]}>

                    <Col span={24}>
                        <Form.Item
                            label={"Post mavzusi"}
                            name="title1Uz"
                            rules={[
                                {
                                    required: true,
                                    message: `Mavzu nomi!`,
                                }
                            ]}
                        >
                            <Input
                                placeholder={"Mavzu"}
                                name="title1Uz"
                                onChange={e => setDataPost({
                                    ...dataPost,
                                    titleUz: e.target.value
                                })}
                                required
                            />
                        </Form.Item><Form.Item
                        label={"Тема Пост"}
                        name="title1Ru"
                        rules={[
                            {
                                required: true,
                                message: `please required`,
                            }
                        ]}
                    >
                        <Input
                            placeholder={"Тема"}
                            name="title1Ru"
                            onChange={e => setDataPost({
                                ...dataPost,
                                titleRu: e.target.value
                            })}
                            required
                        />
                    </Form.Item>
                        <Form.Item
                            label={"Youtube Link"}
                            name="link"
                            rules={[
                                {
                                    required: true,
                                    message: `please required`,
                                }
                            ]}
                        >
                            <Input
                                placeholder={"YouTube Link"}
                                name="link"
                                onChange={e => setDataPost({
                                    ...dataPost,
                                    link: e.target.value
                                })}
                                required
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="form-footer" justify="end" gutter={[8]}>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                // loading={isSubmitting}
                            >
                                Ok
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <ToastContainer autoClose={3000}/>
            </Form>
        </div>
    );
};

export default Video;