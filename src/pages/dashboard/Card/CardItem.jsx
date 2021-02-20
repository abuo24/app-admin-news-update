import React from 'react';
import {Col, Comment, Row} from "antd";
import {NavLink} from "react-router-dom";
import "./Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {ClockCircleOutlined, CommentOutlined, EyeOutlined} from "@ant-design/icons";
import HeartOutlined from "@ant-design/icons/lib/icons/HeartOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";


const CardItem = (props) => {
    return (
        <div className="fitness-area m-0 p-0">
            <div className="container">
                <div className="ft-slider-area mt-2">
                        <div className="ft-slider-item">
                            <img src="https://picsum.photos/600/200" alt="slider image"/>
                            <div className="ft-slider-text">
                                <NavLink to={"/blog/id"} className="sl-post-cat">world</NavLink>
                                <br/>
                                <NavLink to="/blog/2" className="sl-post-title">{props.post&&props.post.title}</NavLink>
                                <div className="clearfix"></div>
                                <Row span={12} className=" meta-tag-area mt-1">
                                    <Col className={"d-flex justify-content-start pr-5 mr-5"}>
                                        <span><ClockCircleOutlined></ClockCircleOutlined>{props.post&&props.post.date}</span>
                                        <span><HeartOutlined></HeartOutlined>{props.post&&props.post.likes}</span>
                                        <span><CommentOutlined></CommentOutlined>{props.post&&props.post.comments}</span>
                                        <span><EyeOutlined/>{props.post&&props.post.views}</span>
                                    </Col>
                                    <Col span={4} className={"d-flex justify-content-end ml-5 pl-5"}>
                                        <span><EditOutlined></EditOutlined></span>
                                        <span><DeleteOutlined></DeleteOutlined></span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default CardItem;