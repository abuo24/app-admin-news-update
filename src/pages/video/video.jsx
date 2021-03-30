import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Pagination, Row, Select, Upload} from "antd";
import {postsApi} from "../../redux/service/postsApi";
import {toast, ToastContainer} from "react-toastify";
import {shortNewsApi} from "../../redux/service/shortNewsApi";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {Option} from "antd/lib/mentions";
import CKEditor from "ckeditor4-react";
import {videosApi} from "../../redux/service/videosApi";
import LatestVideoItem from "./latestVideoItem";
import {bindActionCreators} from "redux";
import {getVideos} from "../../redux/action/videosApi";
import {connect} from "react-redux";

const Video = (props) => {

    const [dataPost, setDataPost] = useState({
        titleUz: "",
        titleRu: "",
        link: ""
    });
    const [postList, setPostList] = useState(null);

    const [paginationList, setPaginationList] = useState({
        totalPage: 0,
        totalItems: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        pageSize: 0
    });

    useEffect(() => {
        props.getVideos().then(res => {
            setPostList({posts: res.payload.data.videos})
            setPaginationList({
                ...paginationList,
                current: res.payload.data.currentPage + 1,
                minIndex: 0,
                totalItems: res.payload.data.totalItems,
                maxIndex: res.payload.data.videos.length,
                pageSize: res.payload.data.videos.length,
                totalPage: res.payload.data.totalPages
            });

        }).catch(err => console.log(err))

    }, []);


    // const [videos, setVideos] = useState(props.videos_reducer && props.videos_reducer.all && props.videos_reducer.all.data)

    useEffect(() => {
        // setPostList({...postList,posts:props.videos_reducer && props.videos_reducer.all && props.videos_reducer.all.data && props.videos_reducer.all.data.videos});
    })
    const getVideos = postList && postList.posts&& postList.posts.map((item, key) => (
        <LatestVideoItem key={key} title={item.titleUz} link={item.link} id={item.id}/>
    ));

    const note = () => toast.info("Yaratildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");


    const onFinish = () => {
        videosApi.add(dataPost).then(res => {
            props.getVideos().then(res => {
                setPostList({posts: res.payload.data.videos})
                setPaginationList({
                    ...paginationList,
                    // current: res.payload.data.currentPage + 1,
                    minIndex: 0,
                    totalItems: res.payload.data.totalItems,
                    maxIndex: res.payload.data.videos.length,
                    pageSize: res.payload.data.videos.length,
                    totalPage: res.payload.data.totalPages
                });
                handleChange(paginationList.current)
            }).catch(err => console.log(err))

            note();
            form.resetFields();
        }).catch(err => {
             danger()
        })
    };
    const [form] = Form.useForm();

    useEffect(() => {
        setPostList({posts:props.videos_reducer && props.videos_reducer.all && props.videos_reducer.all.data && props.videos_reducer.all.data.videos});
    }, [props]);

    const handleChange = (page) => {
        props.getVideos(page - 1).then(res => {
            setPostList({posts: res.payload.data.videos})
            setPaginationList({
                ...paginationList,
                current: page,
                minIndex: 0,
                maxIndex: res.payload.data.videos.length,
            });
        }).catch(err => console.log(err))
    };

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
                <Row>
                    {getVideos}
                </Row>
                {paginationList.totalPage > 0 ? <Pagination
                    pageSize={paginationList.pageSize && paginationList.pageSize}
                    current={paginationList.current && paginationList.current}
                    total={paginationList.totalItems && paginationList.totalItems}
                    onChange={handleChange}
                    style={{marginTop: "10px"}}
                /> : ""}
            </div>
    );
};


const mstp = state => state;

const mdtp = dispatch => (bindActionCreators({getVideos}, dispatch))
export default connect(mstp, mdtp)(Video);