import React, {useEffect, useState} from 'react';
import {Col, Comment, Form, Input, Modal, Row, Select, Skeleton} from "antd";
import {Link, NavLink} from "react-router-dom";
import "./Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {ClockCircleOutlined, CommentOutlined, EyeOutlined} from "@ant-design/icons";
import HeartOutlined from "@ant-design/icons/lib/icons/HeartOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {getFile} from "../../../server/host";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";


const CardItem = (props) => {
    const [modall, setModall] = useState({
        isModalVisible: false
    });

    useEffect(() => {
    }, [props]);

    function confirm() {
        Modal.confirm({
            title: "Postni o'chirishni xoxlaysizmi",
            icon: <ExclamationCircleOutlined/>,
            okText: 'Ha',
            cancelText: "Yo'q",
        });
    }

    const showModal = () => {
        setModall({...modall, isModalVisible: true});
    };

    const handleOk = () => {
        setModall({...modall, isModalVisible: false});
    };

    const handleCancel = () => {
        setModall({...modall, isModalVisible: false});
    };

    const {post} = props;
    return (
        <div className="fitness-area m-0 p-0">
            <div className="container">
                <div className="ft-slider-area mt-2">
                    <div className="ft-slider-item">
                        {post.headAttachment && post.headAttachment.hashId !== null ?
                            <img src={getFile + post.headAttachment.hashId} alt="slider image"/> : <img src={"https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"}/>}

                        <div className="ft-slider-text">
                            {post && <><Link to={'/blog/' + post.id} className="sl-post-cat">{post.category.name}</Link>
                                <br/>
                                <Link to={'/blog/' + post.id} className="sl-post-title">{post && post.title}</Link></>}
                            <div className="clearfix"></div>
                            <Row span={12} className=" meta-tag-area mt-1">
                                <Col className={"d-flex justify-content-start pr-5 mr-5"}>
                                    <span><ClockCircleOutlined></ClockCircleOutlined>{post && post.createAt}</span>
                                    <span><HeartOutlined></HeartOutlined>{post && post.likesCount !== null ? post.likesCount : 0}</span>
                                    <span><CommentOutlined></CommentOutlined>{post && post.comments !== null ? post.comments.length : 0}</span>
                                    <span><EyeOutlined/>{post && post.viewsCount}</span>
                                </Col>
                                <Col span={4} className={"d-flex justify-content-end ml-5 pl-5"}>
                                    <span onClick={showModal}><EditOutlined></EditOutlined></span>
                                    <span onClick={confirm}><DeleteOutlined></DeleteOutlined></span>
                                </Col>
                            </Row>
                            <Modal title="Malumotlarni o'zgartirish" visible={modall.isModalVisible}
                                   onOk={handleOk} onCancel={handleCancel}>
                                <Form
                                    name="basic"
                                    layout="vertical"
                                >
                                    <Row gutter={[16]}>

                                        <Col span={24}>
                                            <Form.Item
                                                label={"Kategoriyalar"}
                                                name="blogCategoryName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `Kategoriya!`,
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder={"Blog kategoriylarini tanlang"}
                                                    // mode="multiple"
                                                    // onChange={(value) => this.handleSelectChange('blogCategoryId', value)}
                                                >
                                                    {
                                                        // Array.isArray(categoryProps) ? categoryProps.map((item, key) => (
                                                        //     <Option value={item[key]} key={item[key]}>
                                                        //         {item[key]}
                                                        //     </Option>
                                                        // )) : "null"
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label={"Qisqa Xabar matnini kirgizing"}
                                                name="title"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: `Mavzu nomi!`,
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    placeholder={"Mavzu "}
                                                    name="blogTitleRu"
                                                    // onChange={this.handleInputChange}
                                                />
                                            </Form.Item>


                                        </Col>
                                    </Row>
                                </Form>
                            </Modal>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default CardItem;