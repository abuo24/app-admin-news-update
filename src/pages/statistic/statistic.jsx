import React, {useEffect, useState} from 'react';
import {Col, Row, Statistic} from "antd";
import "./../dashboard/Card/Card.css"
import {CardItem} from "./../index";
import axios from "axios";
import {host} from "../../server/host";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const StatisticPage = (props) => {

    const [commentsCounts, setCommentsCounts] = useState(0);
    const [viewsCounts, setViewsCounts] = useState(0);
    const [likesCounts, setLikesCounts] = useState(0);
    const [postCount, setPostCount] = useState(0);
    console.log(props);

    const posts = props.post_reducer.most_views && props.post_reducer.most_views.data;
    const list = posts && posts.sort((a, b) => (a.viewsCount > b.viewsCount) ? -1 : 1);
    const getPosts = list && list.slice(0, 4).map((item, key) => (
        <Col key={key} span={12}><CardItem post={item} key={item.id}/></Col>));

    const likes = posts && posts.sort((a, b) => (a.likesCount > b.likesCount) ? -1 : 1);
    const getLikes = likes && likes.slice(0, 4).map((item, key) => (
        <Col key={key} span={12}><CardItem post={item} key={item.id}/></Col>));

    const comments = posts && posts.sort((a, b) => (a.comments.length > b.comments.length) ? -1 : 1);
    const getComments = likes && likes.slice(0, 4).map((item, key) => (
        <Col key={key} span={12}><CardItem post={item} key={item.id}/></Col>));

    useEffect(() => {
        axios.get(`${host}/admin/news/all`).then(res => {
            setPostCount(res.data.data.length);
        }).catch(err => console.log(err)
        );
        axios.get(`${host}/admin/summa`).then(res => {
            setCommentsCounts(res.data.data.comments);
            setLikesCounts(res.data.data.likes);
            setViewsCounts(res.data.data.views);
        }).catch(
            err => console.log(err)
        );
    }, []);

    return (
        <>
            <Row>
                <Col span={6}>
                    <Statistic title="Umumiy Postlar" value={postCount}/>
                </Col>
                <Col span={6}>
                    <Statistic title="Umumiy Commentlar" value={
                        commentsCounts
                    }/>
                </Col>
                <Col span={6}>
                    <Statistic title="Umumiy Yoqtirishlar" value={
                        likesCounts
                    }/>
                </Col>
                <Col span={6}>
                    <Statistic title="Umumiy Ko'rishlar" value={
                        viewsCounts
                    }/>
                </Col>
            </Row>
            <Row style={{margin: +"10px 0px"}}>
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
                        {getLikes}
                    </Row>
                </Col>
            </Row>
            <Row style={{margin: +"10px 0px"}}>
                <Col>
                    <div className="section-top-bar">
                        <h4>Eng ko'p Commentlar</h4>
                    </div>
                    <Row>
                        {getComments}
                    </Row>
                </Col>
            </Row>
        </>
    );
};

const mstp = (state) => (state);

// const mdtp = (dispatch) =>(bindActionCreators({},dispatch))

export default connect(mstp,
    null
    // mdtp
)(StatisticPage);