import React from 'react';
import {Skeleton, Card, Modal, Form, Row, Col, Upload, Button, Select, Input} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {RiDeleteBinLine} from "react-icons/all";
import {Option} from "antd/lib/mentions";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import {shortNewsApi} from "../../redux/service/shortNewsApi";
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
        category_id: this.props.post.category.id,
        titleUz: this.props.post.titleUz,
        titleRu: this.props.post.titleRu
    };
    componentDidMount() {
        if (this.props.post != null) {
            this.setState({loading: false,category_id: this.props.post.category.id})
        }
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
        const {type} = this.props.langReducer;
        const note = () => toast.info("O'chirildi");
        const dark = () => toast.error("Xatolik");
        const showModal = () => {
            this.setState({isModalVisible: true});
        };

        const handleOk = () => {
            shortNewsApi.edit(this.props.post.id,this.state).then(res => {
                noteEdit();
                window.location.reload()
            }).catch(err => {
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
                        title={type=="uz"?this.props.post.category.nameUz:this.props.post.category.nameRu}
                        description={type=="uz"?this.props.post.titleUz:this.props.post.titleRu}

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
                                                    {type=="uz"?item.nameUz:item.nameRu}
                                                </Option>
                                            ))
                                        }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={"Qisqa Xabar matnini kirgizing"}
                                        name="titleUz"
                                        rules={[
                                            {
                                                required: true,
                                                message: `Mavzu nomi!`,
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder={"Mavzu "}
                                            name="titleUz"
                                            defaultValue={this.props.post.titleUz}
                                            onChange={e=>this.setState({
                                                ...this.state,
                                                titleUz: e.target.value
                                            })}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={"Введите текст короткого сообщения"}
                                        name="titleRu"
                                        rules={[
                                            {
                                                required: true,
                                                message: `Mavzu nomi!`,
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder={"Mavzu "}
                                            name="titleRu"
                                            defaultValue={this.props.post.titleRu}
                                            onChange={e=>this.setState({
                                                ...this.state,
                                                titleRu: e.target.value
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