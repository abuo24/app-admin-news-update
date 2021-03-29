import React, {useEffect, useState} from 'react';
import CKEditor from 'ckeditor4-react'
import {Button, Col, Form, Input, Row, Select, Upload, message} from "antd";
import {Option} from "antd/lib/mentions";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {shortNewsApi} from "../../redux/service/shortNewsApi";
import {toast, ToastContainer} from "react-toastify";
import {postsApi} from "../../redux/service/postsApi";
// import {host} from "../../server/host";
import "ckeditor4-react/dist/ckeditor"

const NewPost = (props) => {


    const [dataPost, setDataPost] = useState({
        titleUz: "",
        titleRu: "",
        contentUz: "",
        contentRu: ""
    })
    const test = new FormData();

    const propsData = {
            beforeUpload: file => {
                if (file.type !== 'image/jpeg') {
                    message.error(`${file.name} file jpg formatda emas qaytadan urining`);
                    file = null;
                    return null;
                } else {
                    return file.type === 'image/jpeg' ? true : Upload.LIST_IGNORE;
                }
            },
            onChange: info => {
            },
            customRequest: (options) => {
                test.append('file', options.file)
                postsApi.addImg(test).then(res => {
                        setFile({file: res.data.data})
                        options.onSuccess(res.data, options.file);
                     }
                ).catch(err => console.log(err))

            }
        }
    ;

    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState({
        category: "",
        titleUz: "",
        titleRu: ""
    });

    const onClickToogle = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    };

    const note = () => toast.info("Yaratildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");
    const danger1 = () => toast.error("Iltimos Postni Rasmini yuklang");

    const [form] = Form.useForm();
    const [product_id_list, setProductIdList] = useState({
        tags: []
    });

    const onFinish = () => {
        if (toggle) {
            shortNewsApi.add(data).then(res => {
                note();
                form.resetFields();
            }).catch(err => {
                 danger()
            })
        } else {
            if (file.file != null) {
                const bodyFormData = new FormData();
                product_id_list.tags.forEach((item) => {
                    bodyFormData.append('tags', item);
                });
                bodyFormData.append("hash_id", file.file)
                bodyFormData.append("contentUz", dataPost.contentUz)
                bodyFormData.append("contentRu", dataPost.contentRu)
                bodyFormData.append("titleUz", dataPost.titleUz)
                bodyFormData.append("titleRu", dataPost.titleRu)
                bodyFormData.append("category_id", data.category)
                postsApi.addPost(bodyFormData).then(res => {
                    console.log(res)
                    note()
                    form.resetFields()
                }).catch(err => console.log(err))
            } else {
                danger1()
            }
        }
    };
    useEffect(() => {
        }, [props]);

    const handleSelectChange = (name, value) => {
        if (name) {
            setData({
                ...data,
                [name]: value
            })
        }
    };
    const [file, setFile] = useState({
        file: null
    });

    function handleChange(value) {
        setProductIdList({tags: value}, () => {
        })
     }

    const handleSelectChange1 = (name, value) => {
        if (name) {
            setData({
                ...data,
                ...data.category,
                [name]: value
            })
        }
    };

    const onEditorChangeUz = (evt) => {
        setDataPost({
            ...dataPost,
            contentUz: evt.editor.getData()
        });
    };

    const onEditorChangeRu = (evt) => {
        setDataPost({
            ...dataPost,
            contentRu: evt.editor.getData()
        });
    };
    return (
        <div className="App">
            <div className="d-flex justify-content-start">
                <Button
                    type={!toggle ? "primary" : ""}
                    onClick={onClickToogle}>Post</Button>
                <Button
                    type={toggle ? "primary" : ""}
                    onClick={onClickToogle}>Qisqa Postlar</Button>
            </div>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={[16]}>

                    <Col span={24}>
                        {!toggle && <div className={"mt-2 d-flex justify-content-start"}>
                            <Form.Item><Upload
                                maxCount={1}

                                id="for_clear"
                                {...propsData}
                                accept=".jpg"
                                listType={"picture"}>
                                <Button icon={<UploadOutlined/>}>Post Rasmini yuklash</Button>
                            </Upload></Form.Item>
                        </div>
                        }
                        <Form.Item
                            label={"Kategoriyalar"}
                            name="categoryUz"
                            rules={[
                                {
                                    required: true,
                                    message: `Kategoriya!`,
                                },
                            ]}

                        >
                            <Select
                                placeholder={"Blog kategoriylarini tanlang"}
                                onChange={(e) => handleSelectChange('category', e)}
                                required
                                id="for_clear"
                                value={data.category}
                            >
                                {
                                    props.category_reducer && props.category_reducer.categories && props.category_reducer.categories && props.category_reducer.categories.map((item, key) => (
                                        <Option value={item.id} key={item}>
                                            {props.langReducer.type == "uz" ? item.nameUz : item.nameRu}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        {!toggle && <Form.Item
                            label={"Tags"}
                            name="tagsA;;">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{width: '100%'}}
                                showSearch
                                placeholder={"Blog taglarini tanlang"}
                                required
                                onChange={handleChange}
                            >{
                                props.tags_reducer && props.tags_reducer.tags && props.tags_reducer.tags.data.map((item, key) => (
                                    <Option value={item.id} key={item.id}>

                                        {props.langReducer.type == "uz" ? item.tagUz : item.tagRu}
                                    </Option>
                                ))
                            }
                            </Select>
                        </Form.Item>
                        }
                        {toggle && <> <Form.Item
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
                                id="for_clear"
                                name="titleUz"
                                required onChange={e => setData({...data, titleUz: e.target.value})}
                                value={data.title}
                            />
                        </Form.Item><Form.Item
                            label={"Введите текст короткого сообщения"}
                            name="titleRu"
                            rules={[
                                {
                                    required: true,
                                    message: `please required!`,
                                },
                            ]}
                        >
                            <Input
                                placeholder={"Mavzu "}
                                id="for_clear"
                                name="titleRu"
                                required onChange={e => setData({...data, titleRu: e.target.value})}
                                value={data.title}
                            />
                        </Form.Item></>
                        }
                        {!toggle && <> <Form.Item
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
                        </Form.Item></>
                        }
                        {!toggle && <>
                            <Form.Item
                                label={"Content"}
                                name="content1"
                                rules={[
                                    {
                                        required: true,
                                        message: `Content!`,
                                    },
                                ]}
                            >
                                <CKEditor
                                    data="<i>Contentni chiroyli ko'rinishda yozing uzbek tilida</i>"
                                    onChange={onEditorChangeUz}
                                    type="classic"
                                />
                            </Form.Item>
                            <Form.Item
                                label={"Содержание"}
                                name="content2"
                                rules={[
                                    {
                                        required: true,
                                        message: `Content!`,
                                    },
                                ]}
                            >
                                <CKEditor
                                    data="<i>Пишите контент красиво на русском языке </i>"
                                    onChange={onEditorChangeRu}
                                    type="classic"

                                />
                            </Form.Item>
                        </>
                        }
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

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({}, dispatch));

export default connect(mstp, mdtp)(NewPost);