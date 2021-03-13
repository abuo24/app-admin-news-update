import React from 'react';
import {Skeleton, Switch, Card, Modal, Form, Row, Col, Upload, Button, Select, Input} from 'antd';
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons';
import {RiDeleteBinLine} from "react-icons/all";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {Option} from "antd/lib/mentions";
import CKEditor from "ckeditor4-react";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import {shortNewsApi} from "../../redux/service/shortNewsApi";
import {Redirect} from "react-router-dom";
// import * as toast from "react-toastify";
import {ToastContainer, toast} from "react-toastify";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {allPosts} from "../../redux/action/shortPostApi";

const {Meta} = Card;

class ShortNewsItem extends React.Component {
    state = {
        loading: true,
        isModalVisible: false,
        category: "",
        title: ""
    };
    componentDidMount() {
        if (this.props.post != null) {
            this.setState({loading: false})
        }
        console.log(this.props)
    }

    handleSelectChange = (name, value) => {
        if (name) {
            this.setState({
                ...this.state,
                category: value
            })
        }
    };


    render() {
        const noteEdit = () => toast.info("O'zgartirildi");

        const note = () => toast.info("O'chirildi");
        const dark = () => toast.error("Xatolik");
        const showModal = () => {
            this.setState({isModalVisible: true});
        };

        const handleOk = () => {
            shortNewsApi.edit(this.props.post.id,this.state).then(res => {
                console.log(res);
                noteEdit();
                window.location.reload()
            }).catch(err => {
                console.log(err);
                dark()
            })
        };


        const handleCancel = () => {
            this.setState({isModalVisible: false});
        };

        function confirm(props) {
            Modal.confirm({
                title: "Postni o'chirishni xoxlaysizmi",
                icon: <ExclamationCircleOutlined/>,
                okText: 'Ha',
                cancelText: "Yo'q",
                onOk() {

                    shortNewsApi.delete(props.post && props.post.id).then(
                        res => {
                            // console.log(res)
                            // props.allPosts()
                            note();
                            window.location.reload()
                        }
                    ).catch(err => dark());
                }
            });
        }

        return (
            <Card
                style={{width: 270, marginTop: 16}}
                actions={[
                    <div onClick={showModal}>
                        <EditOutlined key="edit"/></div>,
                    <div onClick={e => confirm(this.props)}>
                        <RiDeleteBinLine key="delete"/>
                    </div>,
                ]}
            >
                <Skeleton loading={this.state.loading} avatar active>
                    <Meta
                        title={this.props.post.category.name}
                        description={this.props.post.title}

                    />
                    <Modal title="Malumotlarni o'zgartirish" visible={this.state.isModalVisible}
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
                                            defaultValue={this.props.post.category.id}
                                            onChange={(value) => this.handleSelectChange('category', value)}
                                        > {
                                            this.props.category_reducer && this.props.category_reducer.categories.map((item, key) => (
                                                <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))
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
                                            defaultValue={this.props.post.title}
                                            onChange={e=>this.setState({
                                                ...this.state,
                                                title: e.target.value
                                            })}
                                        />
                                    </Form.Item>


                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                    <ToastContainer autoClose={3000}/>

                    <div className="">
                        <p className="mt-2">  {this.props.post.createAt.slice(0, 16)}</p>
                    </div>
                </Skeleton>
            </Card>
        );
    }
}

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({allPosts},dispatch))

export default connect(mstp, mdtp)(ShortNewsItem)