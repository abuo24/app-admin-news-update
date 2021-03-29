import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Upload} from "antd";
import {Link} from "react-router-dom";
import "./Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {ClockCircleOutlined, CommentOutlined, EyeOutlined} from "@ant-design/icons";
import HeartOutlined from "@ant-design/icons/lib/icons/HeartOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {getFile} from "../../../server/host";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import {postsApi} from "../../../redux/service/postsApi";
import {toast, ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import {Option} from "antd/lib/mentions";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import CKEditor from "ckeditor4-react";

const CardItem = (props) => {
        const [modall, setModall] = useState({
            isModalVisible: false
        });

        useEffect(() => {
        }, [props]);

        const note = () => toast.info("O'chirildi");
        const noteEdit = () => toast.info("O'zgartirildi");
        const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");

        function confirm(id) {
            Modal.confirm({
                title: "Postni o'chirishni xoxlaysizmi",
                icon: <ExclamationCircleOutlined/>,
                okText: 'Ha',
                cancelText: "Yo'q",
                onOk() {
                    postsApi.delete(id).then(res => {
                        console.log(res)
                        note();
                        window.location.reload()
                    }).catch(err => {
                        console.log(err)
                        danger()
                    })
                }
            });
        }

        const showModal = () => {
            setModall({...modall, isModalVisible: true});
        };

        const handleOk = () => {
            onFinish()
        };

        const handleCancel = () => {
            setModall({...modall, isModalVisible: false});
        };

        const {post} = props;
        const {categories} = props.category_reducer;
        const defaultTags = [];
        post && post.tags.map(item => (
            defaultTags.push(item.id)
        ))
        console.log(post)
        const [file, setFile] = useState({
            hashId: post.headAttachment != null ? (getFile + post.headAttachment && post.headAttachment.hashId && post.headAttachment.hashId) : ''
        });

        const test = new FormData()

        const propsFile = {
            // action: `${getFile+post.headAttachment&&post.headAttachment.hashId&&post.headAttachment.hashId}`,
            onChange({file, fileList}) {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                }
            },
            defaultFileList: [post.headAttachment != null ?
                {
                    uid: `${post.headAttachment && post.headAttachment.id && post.headAttachment.id}`,
                    name: `${post.headAttachment && post.headAttachment.name && post.headAttachment.name}`,
                    // status: 'done',
                    // response: 'Server Error 500',
                    url: `${getFile + post.headAttachment && post.headAttachment.hashId && post.headAttachment.hashId}`,
                    thumbUrl: `${getFile + post.headAttachment && post.headAttachment.hashId && post.headAttachment.hashId}`,
                } : ''
            ],
            customRequest: (options) => {
                test.append('file', options.file)

                postsApi.addImg(test).then(res => {
                        setFile({file: res.data.data})
                        options.onSuccess(res.data, options.file);
                        console.log(res);
                        setFile({hashId: res.data && res.data.data && res.data.data})
                    }
                ).catch(err => console.log(err))
            }
        };
        const [form] = Form.useForm();
        const handleSelectChange = (name, value) => {
            if (name) {
                setDataPost({
                    ...dataPost,
                    [name]: value
                })
            }
        };

        function handleChange(value) {
            console.log(`selected ${value}`);
            setDataPost({...dataPost, tags: value}, () => {
            })
            console.log(dataPost)
        }

        const [dataPost, setDataPost] = useState({
            titleUz: post.titleUz,
            titleRu: post.titleRu,
            contentUz: post.contentUz,
            contentRu: post.contentRu,
            tags: defaultTags,
            category_id: post.category.id
        });

        const onEditorChange = (evt) => {
            setDataPost({
                ...dataPost,
                contentUz: evt.editor.getData()
            });
        };
        const onEditorChange1 = (evt) => {
            setDataPost({
                ...dataPost,
                contentRu: evt.editor.getData()
            });
        };
        const onFinish = () => {
            const bodyFormData = new FormData();
            dataPost.tags.forEach((item) => {
                bodyFormData.append('tags', item);
            });
            bodyFormData.append("hash_id", file.hashId)
            bodyFormData.append("contentUz", dataPost.contentUz)
            bodyFormData.append("contentRu", dataPost.contentRu)
            bodyFormData.append("titleUz", dataPost.titleUz)
            bodyFormData.append("titleRu", dataPost.titleRu)
            bodyFormData.append("category_id", dataPost.category_id)
            console.log(bodyFormData)
            postsApi.editPost(post.id, bodyFormData).then(res => {
                console.log(res);
                noteEdit();
                // return <Redirect from={"/"} to={"/posts"}/>
                // form.resetFields()
                window.location.reload()
            }).catch(err => danger())
        }
        const {type} = props.langReducer;

        const [lang, setLang] = useState(type == "uz" ? true : false);

        return (
            <div className="fitness-area m-0 p-0">
                <div className="container">
                    <div className="ft-slider-area mt-2">
                        <div className="ft-slider-item">
                            {post.headAttachment && post.headAttachment.hashId !== null ?
                                <img src={getFile + post.headAttachment.hashId} alt="slider image"/> :
                                <img src={"https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"}/>}

                            <div className="ft-slider-text">
                                {post && <><Link to={'/blog/' + post.id}
                                                 className="sl-post-cat">{lang ? post.category.nameUz : post.category.nameRu}</Link>
                                    <br/>
                                    <Link to={'/blog/' + post.id}
                                          className="sl-post-title">{post && lang ? post.titleUz : post.titleRu}</Link></>}
                                <div className="clearfix"/>
                                <Row className=" meta-tag-area mt-1">
                                    <Col span={16} className={"d-flex justify-content-start pr-5 mr-5"}>
                                        <span><ClockCircleOutlined/>{post && post.createAt}</span>
                                        <span><HeartOutlined/>{post && post.likesCount !== null ? post.likesCount : 0}</span>
                                        <span><CommentOutlined/>{post && post.comments !== null ? post.comments.length : 0}</span>
                                        <span><EyeOutlined/>{post && post.viewsCount}</span>
                                    </Col>
                                    <Col span={2} className={"d-flex justify-content-end ml-5 pl-5"}>
                                        <span onClick={showModal}><EditOutlined/></span>
                                        <span
                                            onClick={e => confirm(post && post.id)}><DeleteOutlined></DeleteOutlined></span>
                                    </Col>
                                </Row>
                                <Modal title="Malumotlarni o'zgartirish" visible={modall.isModalVisible}
                                       onOk={handleOk} onCancel={handleCancel}>
                                    <Form
                                        form={form}
                                        name="basic"
                                        layout="vertical"
                                    >
                                        <Row gutter={[16]}>

                                            <Col span={24}>
                                                <div className={"mt-2 d-flex justify-content-start"}>
                                                    <Form.Item><Upload
                                                        maxCount={1}
                                                        accept=".jpg"
                                                        {...propsFile}
                                                    >
                                                        <Button icon={<UploadOutlined/>}>Post Rasmini yuklash</Button>
                                                    </Upload></Form.Item>
                                                </div>

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
                                                        defaultValue={post.category.id}
                                                        onChange={(e) => handleSelectChange('category_id', e)}
                                                        required
                                                    >
                                                        {
                                                            categories && categories.map((item, key) => (
                                                                <Option value={item.id} key={item.id}>
                                                                    {type ? item.nameUz : item.nameRu}
                                                                </Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    label={"Tags"}
                                                    name="blogDate">
                                                    <Select
                                                        mode="multiple"
                                                        allowClear
                                                        style={{width: '100%'}}
                                                        showSearch
                                                        placeholder={"Blog taglarini tanlang"}
                                                        required
                                                        defaultValue={defaultTags}
                                                        onChange={handleChange}
                                                    >{
                                                        props.tags_reducer && props.tags_reducer.tags && props.tags_reducer.tags.data.map((item, key) => (
                                                            <Option value={item.id} key={item.id}>
                                                                {type ? item.tagUz : item.tagRu}
                                                            </Option>
                                                        ))
                                                    }
                                                    </Select>
                                                </Form.Item>


                                                <Form.Item
                                                    label={"Post mavzusi"}
                                                    name="title1"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: `Mavzu nomi!`,
                                                        }
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder={"Mavzu"}
                                                        name="title1"
                                                        defaultValue={post.titleUz}
                                                        onChange={e => setDataPost({
                                                            ...dataPost,
                                                            titleUz: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label={"Тема Пост"}
                                                    name="title2"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: `Mavzu nomi!`,
                                                        }
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder={"Mavzu"}
                                                        name="title2"
                                                        defaultValue={post.titleRu}
                                                        onChange={e => setDataPost({
                                                            ...dataPost,
                                                            titleRu: e.target.value
                                                        })}
                                                        required
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label={"Content"}
                                                    name="contentUz"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: `Content!`,
                                                        }
                                                    ]}
                                                >
                                                    <CKEditor
                                                        data={post.contentUz}
                                                        onChange={onEditorChange}
                                                        type="classic"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label={"Содержание"}
                                                    name="contentRu"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: `Content!`,
                                                        }
                                                    ]}
                                                >
                                                    <CKEditor
                                                        data={post.contentRu}
                                                        onChange={onEditorChange1}
                                                        type="classic"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>


                                    </Form>
                                </Modal>
                                <ToastContainer autoClose={3000}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
;

const mstp = (state) => (state)


export default connect(mstp, null)(CardItem);