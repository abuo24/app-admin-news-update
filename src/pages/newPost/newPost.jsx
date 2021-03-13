import React, {useEffect, useRef, useState} from 'react';
import CKEditor from 'ckeditor4-react'
import {Button, Col, Collapse, DatePicker, Form, Input, Row, Select, Upload, message} from "antd";
import {Option} from "antd/lib/mentions";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {shortNewsApi} from "../../redux/service/shortNewsApi";
import {toast, ToastContainer} from "react-toastify";
import {postsApi} from "../../redux/service/postsApi";

const NewPost = (props) => {

    const [dataPost, setDataPost] = useState({
        title: "",
        content: ""
    })
    const test = new FormData()

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
                console.log(info.file);
            },
            customRequest: (options) => {
                console.log(options)
                test.append('file', options.file)
                postsApi.addImg(test).then(res => {
                    setFile({file: res.data.data})
                        options.onSuccess(res.data, options.file);
                        console.log(res)
                    }
                ).catch(err => console.log(err))

            }
        }
    ;

    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState({
        category: "",
        title: ""
    });

    const onClickToogle = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    };

    const note = () => toast.info("Yaratildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");

    const [form] = Form.useForm();
    const [product_id_list, setProductIdList] = useState({
        tags: []
    });

    const onFinish = () => {
        if (toggle) {
            shortNewsApi.add(data).then(res => {
                console.log(res)
                note();
                form.resetFields();
            }).catch(err => {
                console.log(err)
                danger()
            })
        } else {
            const bodyFormData = new FormData();
            product_id_list.tags.forEach((item) => {
                bodyFormData.append('tags', item);
            });
            bodyFormData.append("hash_id", file.file)
            bodyFormData.append("content", dataPost.content)
            bodyFormData.append("title", dataPost.title)
            bodyFormData.append("category_id", data.category)
            console.log(bodyFormData.keys())
            console.log(bodyFormData.values())
            postsApi.addPost(bodyFormData).then(res => {
                console.log(res)
                note()
                document.getElementById("for_clear").remove();
                form.resetFields()
            }).catch(err => danger())
        }
    };
    useEffect(() => {
        // console.log(props.category_reducer.categories)
    }, [props]);

    const handleSelectChange = (name, value) => {
        if (name) {
            setData({
                ...data,
                // ...data.category,
                [name]: value
            })
        }
    };
    const [file, setFile] = useState({
        file: null
    });

    function handleChange(value) {
        console.log(`selected ${value}`);
        setProductIdList({tags: value}, () => {
        })
        console.log(product_id_list)
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

    const onEditorChange = (evt) => {
        setDataPost({
            ...dataPost,
            content: evt.editor.getData()
        });
    }


    console.log(data);
    console.log(dataPost);

    return (
        <div className="App ">
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
                            // onChange={handleupload}
                            listType={"picture"}>
                            <Button icon={<UploadOutlined/>}>Post Rasmini yuklash</Button>
                        </Upload></Form.Item>
                        </div>
                        }
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
                                placeholder={"Blog kategoriylarini tanlang"}
                                onChange={(e) => handleSelectChange('category', e)}
                                required
                                id="for_clear"
                                value={data.category}
                            >
                                {
                                    props.category_reducer && props.category_reducer.categories && props.category_reducer.categories.map((item, key) => (
                                        <Option value={item.id} key={item}>
                                            {item.name}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        {!toggle && <Form.Item
                            label={"Tags"}
                            name="blogDate">
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
                                        {item.tag}
                                    </Option>
                                ))
                            }
                            </Select>
                        </Form.Item>
                        }
                        {toggle && <Form.Item
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
                                id="for_clear"
                                name="blogTitleRu"
                                required onChange={e => setData({...data, title: e.target.value})}
                                value={data.title}
                            />
                        </Form.Item>
                        }
                        {!toggle && <Form.Item
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
                                name="blogTitleRu"
                                onChange={e => setDataPost({
                                    ...dataPost,
                                    title: e.target.value
                                })}
                                required
                            />
                        </Form.Item>
                        }
                        {!toggle &&
                        <Form.Item
                            label={"Content"}
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: `Content!`,
                                },
                            ]}
                        >
                            <CKEditor
                                data="<i>Contentni chiroyli ko'rinishda yozing</i>"
                                onChange={onEditorChange}
                                type="classic"
                            />
                        </Form.Item>
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