import React, {useEffect, useState} from "react";
import {render} from "react-dom";

import {Card, Button, Row, Col, Modal, message, Form, Upload, Select, Input} from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getAllFiles} from "../../redux/action/filesApi";
import {BsPlus, MdContentCopy} from "react-icons/all";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {ToastContainer} from "react-toastify";
import {postsApi} from "../../redux/service/postsApi";

const styles = {
    fontFamily: "sans-serif",
    fontSize: "8px",
    padding: "1rem"
};

const AllFiles = (props) => {

    useEffect(() => {
        props.getAllFiles()
    }, []);

    const info = () => {
        message.info('Nusxalandi');
    };

    const test = new FormData();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const propsFile = {
        customRequest: (options) => {
            test.append('file', options.file);
            postsApi.addImg(test).then(res => {
                    options.onSuccess(res.data, options.file);
                    console.log(res);
                }
            ).catch(err => console.log(err))
        }
    }
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const allFiles = props.files_reducer && props.files_reducer.all && props.files_reducer.all.reverse().map(
        (item) => (
            <Col span={8}>
                <Card title={item.name}>
                    <a href={item.url} style={{fontSize: "8px!important"}} target={"_blank"}>
                        <p style={{fontSize: "8px!important"}}>{item.url}</p>
                    </a>
                    <MdContentCopy style={{color: "black", display: "inline-block"}} onClick={() => {
                        navigator.clipboard.writeText(item.url)
                        info()
                    }}/>

                </Card>
            </Col>
        )
    );

    return (
        <div style={styles}>
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
                   okButtonProps={{ disabled: true }}
                   cancelButtonProps={{ disabled: true }}
            >
                <Form
                    // form={form}
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
                                    <Button icon={<UploadOutlined/>}>Yuklash</Button>
                                </Upload></Form.Item>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Row>
                {allFiles}
            </Row>
            <ToastContainer autoClose={3000}/>

        </div>)
};

const mstp = state => state;

const mdtp = dispatch => (bindActionCreators({getAllFiles}, dispatch))


export default connect(mstp, mdtp)(AllFiles)