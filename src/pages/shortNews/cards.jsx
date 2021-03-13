import React, {useEffect, useState} from 'react';
import {Col, Row} from "antd";
import {CardItem} from "../index";
import {bindActionCreators} from "redux";
import {getNewsByCategoryId} from "../../redux/action/posts";
import {connect} from "react-redux";
import ShortNewsItem from "./shortNewsItem";
import {getPostByCategoryId} from "../../redux/action/shortPostApi";

const Cards = (props) => {

    const [postList,setPostList] =useState(null);

    useEffect(()=>{
        props.getPostByCategoryId(props.id).then(res=>{setPostList({posts: res.payload.data&&res.payload.data.shortnews})
            console.log(res)
        }).catch(err=>console.log(err))
    },[]);

    console.log(postList&&postList.posts)
    const getPosts = postList&&postList.posts&&postList.posts.map((item, key) => (<Col key={key} span={6}><ShortNewsItem post={item} key={item.id}/></Col>));

    if (postList&&postList.posts&&postList.posts.length>0){
        return (
            <div>
                <Row style={{margin: +"10px 0"}}>
                    <Col>
                        <div className="section-top-bar">
                            <h4>{props.title}</h4>
                        </div>
                        <Row gutter={[24]}>
                            <Col span={24}>
                                <Row>
                            {getPosts}</Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )}
    else {return ""}
}

const mstp = (state) =>(state);

const mdtp = (dispatch) => (bindActionCreators({getPostByCategoryId},dispatch))

export default connect(mstp, mdtp)(Cards);