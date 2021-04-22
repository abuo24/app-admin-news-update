import React, {useEffect, useState} from "react";

import {Card, Button, Row, Col, Modal, message, Form, Upload, Select, Input, Pagination} from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getAllFiles} from "../../redux/action/filesApi";
import {BsPlus, MdContentCopy} from "react-icons/all";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {toast, ToastContainer} from "react-toastify";
import {postsApi} from "../../redux/service/postsApi";
import copyToClipboard from '@svc/react-copy-to-clipboard'

const styles = {
    fontFamily: "sans-serif",
    fontSize: "8px",
    padding: "1rem"
};

const AllFiles = (props) => {
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
        props.getAllFiles().then(res => {
            setPostList({posts: res.payload.data.files})
            setPaginationList({
                ...paginationList,
                current: res.payload.data.currentPage + 1,
                minIndex: 0,
                totalItems: res.payload.data.totalItems,
                maxIndex: res.payload.data.files.length,
                pageSize: res.payload.data.files.length,
                totalPage: res.payload.data.totalPages
            });

        }).catch(err => console.log(err))

    }, []);

    const info = () => {
        message.info('Nusxalandi');
    };
    const info1 = () => {
        message.info("Qo'shildi");
    };

    const test = new FormData();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const propsFile = {
        customRequest: (options) => {
            test.append('file', options.file);
            postsApi.addImg(test).then(res => {
                    message.info("Qo'shildi");
                    options.onSuccess(res.data, options.file);
                    props.getAllFiles().then(res => {
                        setPostList({posts: res.payload.data.files})
                        setPaginationList({
                            ...paginationList,
                            current: res.payload.data.currentPage + 1,
                            minIndex: 0,
                            totalItems: res.payload.data.totalItems,
                            maxIndex: res.payload.data.files.length,
                            pageSize: res.payload.data.files.length,
                            totalPage: res.payload.data.totalPages
                        });

                    }).catch(err => console.log(err))
                }
            ).catch(err => message.error("Maksimal File Hajmi 10MB"))
        }
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };

    const allFiles = postList && postList.posts && postList.posts.map(
        (item) => (
            <Col span={8}>
                <Card title={item.name}>
                    <a href={item.url} style={{fontSize: "8px!important"}} target={"_blank"}>
                        <p style={{fontSize: "8px!important"}}>{item.url}</p>
                    </a>
                    <Clips url={item.url}/>

                </Card>
            </Col>
        )
    );
    const handleChange = (page) => {
        props.getAllFiles(page - 1).then(res => {
            setPostList({posts: res.payload.data.files})
            setPaginationList({
                ...paginationList,
                current: page,
                minIndex: 0,
                maxIndex: res.payload.data.files.length,
            });
        }).catch(err => console.log(err))
    };
    const [form] = Form.useForm();

    return (
        <div style={styles}>
            {paginationList&&paginationList.totalItems==0?"Fayllar xali mavjud emas":""}
            <div onClick={showModal} style={{
                zIndex: "1",
                position: "fixed",
                top: "20px",
                right: "20px",
                background: "#79ade6",
                width: "40px",
                height: "auto"
            }}>
                <div>
                    <BsPlus style={{fontSize: "30px", color: "white"}}/>
                </div>
            </div>
            <Modal title="Fayl yuklash" visible={isModalVisible}
                   onOk={handleOk} onCancel={handleCancel}
                   okButtonProps={{disabled: true, display: "none!important"}}
            >
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                >
                    <div className={"mt-2 d-flex justify-content-start"}>
                        <Form.Item><Upload
                            maxCount={1}
                            accept=".jpg"
                            {...propsFile}
                        >
                            <Button icon={<UploadOutlined/>}>Yuklash</Button>
                        </Upload></Form.Item>
                    </div>
                </Form>
            </Modal>
            <Row>
                {allFiles}
            </Row>
            {paginationList.totalPage > 1 ? <Pagination
                pageSize={paginationList.pageSize && paginationList.pageSize}
                current={paginationList.current && paginationList.current}
                total={paginationList.totalItems && paginationList.totalItems}
                onChange={handleChange}
                style={{marginTop: "10px"}}
            /> : ""}
            <ToastContainer autoClose={3000}/>

        </div>)
};

const Clips = (props) =>{
    const [change, setChange] = copyToClipboard();

    return(
        <span
            onClick={() => {
                setChange();
            }}
        >
            <input ref={change} value={props.url} style={{display: "none"}}/>
             <MdContentCopy style={{color: "black", display: "inline-block"}} onClick={() => {
                 message.info("Nusxalandi")
             }}/>
                                  <ToastContainer autoClose={2000}/>
        </span>
    )
}

const mstp = state => state;

const mdtp = dispatch => (bindActionCreators({getAllFiles}, dispatch))


export default connect(mstp, mdtp)(AllFiles)