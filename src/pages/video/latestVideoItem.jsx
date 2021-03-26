import React, {Component} from 'react';
import {IoPlayOutline, IoTrashOutline, RiDeleteBin5Line} from "react-icons/all";
import {Button, Col, Modal, Space} from "antd";
import {IconContext} from "react-icons";
import {videosApi} from "../../redux/service/videosApi";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import {toast} from "react-toastify";

const {confirm} = Modal;

class LatestVideoItem extends Component {

    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    componentDidMount() {
        console.log(this)
    }


    hideModal = () => {
        this.setState({
            visible: false
        });
        stopVideo();
    };

    handleDelete = () => {

    };

    note = () => toast.info("O'chirildi");
    // noteEdit = () => toast.info("O'zgartirildi");
    danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");


    showDeleteConfirm(props) {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined/>,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                videosApi.delete(props.props.id).then(
                    res => {
                        props.note();
                        window.location.reload();
                    }
                ).catch(err => props.danger())
            }
        });
    }

    render() {
        return (

            <Col span={6}>
                <div className="lt-video-item item mx-1">
                    <div className="ltv-thumb position-relative">
                        <img
                            src={`http://img.youtube.com/vi/` + this.props.link.slice(this.props.link.length - 11) + `/0.jpg`}/>
                        <a onClick={this.showModal} className="lt-video"><IoPlayOutline/></a>
                    </div>
                    <div
                        className={" text-center text-white bg-light"}>
                        <p style={{fontSize: "20px", color: "black"}}>{this.props.title}</p>
                        <IconContext.Provider style={{position: "absolute", top: "0", left: "0"}}
                                              value={{color: "black", size: "2em", className: "global-class-name"}}>

                            <Space>
                                <div onClick={e => this.showDeleteConfirm(this)}>
                                    <IoTrashOutline/>
                                </div>
                            </Space>
                        </IconContext.Provider>
                    </div>
                    <Modal
                        title={this.props.title}
                        visible={this.state.visible}
                        footer={null}
                        onCancel={this.hideModal}
                        afterClose={this.pause}
                        bodyStyle={{padding: 0}}
                    >
                        <iframe src={this.props.link}
                                width={"100%"}
                                height={"200px"}
                                title={this.props.title} frameBorder="0"
                        />
                    </Modal>
                </div>
            </Col>
        )
    }

}

var stopVideo = function (element) {
    var iframe = document.querySelector('iframe');
    var video = document.querySelector('video');
    if (iframe !== null) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if (video !== null) {
        video.pause();
    }
};

export default LatestVideoItem;
