import React, {useState} from 'react';
import {Card, Col, Meta, Row, Statistic} from "antd";
import "./../dashboard/Card/Card.css"
import Title from "antd/lib/typography/Title";
import {NavLink} from "react-router-dom";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {EyeOutlined, HeartOutlined} from "@ant-design/icons";
import TimelineItem from "antd/es/timeline/TimelineItem";
import ClockCircleOutlined from "@ant-design/icons/lib/icons/ClockCircleOutlined";
import {CardItem} from "./../index";


const StatisticPage = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "blog1",
            views: 123,
            likes: 123,
            date: "07 Yanvar 2020",
            comments: 1900
        },
        {
            id: 2,
            title: "blog2",
            views: 123,
            likes: 123,
            date: "07 Yanvar 2020",
            comments: 1900
        },
        {
            id: 3,
            title: "blog3",
            views: 123,
            likes: 123,
            date: "07 Yanvar 2020",
            comments: 1900
        },
        {
            id: 3,
            title: "blog3",
            views: 123,
            likes: 123,
            date: "07 Yanvar 2020",
            comments: 1900
        },
    ]);

    const getPosts = posts.map((item, key) => (<Col key={key} span={12}><CardItem post={item} key={item.id}/></Col>));

    return (
        <>
            <Row>
                <Col span={6}>
                    <Statistic title="Umumiy Postlar" value={112893}/>
                </Col>
                <Col span={6}>
                    <Statistic title="Umumiy Commentlar" value={112893} precision={2}/>
                </Col>
                <Col span={6}>
                    <Statistic title="Umumiy Yoqtirishlar" value={112893}/>
                </Col>
                <Col span={6}>
                    <Statistic title="Umumiy Ko'rishlar" value={112893} precision={2}/>
                </Col>
            </Row>
            <Row style={{margin: +"10px 0"}}>
                <Col>
                    <div className="section-top-bar">
                        <h4>Eng ko'p ko'rishlar</h4>
                    </div>
                    <Row>
                        {getPosts}
                    </Row>
                </Col>
            </Row>
            <Row style={{margin: +"10px 0"}}>
                <Col>
                    <div className="section-top-bar">
                        <h4>Eng ko'p yoqtirishlar</h4>
                    </div>
                    <Row>
                        {getPosts}
                    </Row>
                </Col>
            </Row>
            <Row style={{margin: +"10px 0"}}>
                <Col>
                    <div className="section-top-bar">
                        <h4>Eng ko'p Commentlar</h4>
                    </div>
                    <Row>
                        {getPosts}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default StatisticPage;