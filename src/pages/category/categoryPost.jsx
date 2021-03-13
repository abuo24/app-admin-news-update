import React, {useEffect, useState} from 'react';
import {Col, Row} from "antd";
import {CardItem} from "../index";
import {bindActionCreators} from "redux";
import {getNewsByCategoryId} from "../../redux/action/posts";
import {connect} from "react-redux";

const CategoryPost = (props) => {

    const [postList,setPostList] =useState(null);

    useEffect(()=>{
        props.getNewsByCategoryId(props.id).then(res=>{setPostList({posts: res.payload.data&&res.payload.data.news})
            console.log(res)
        }).catch(err=>console.log(err))
    },[]);

    console.log(postList&&postList.posts)
    const getPosts = postList&&postList.posts&&postList.posts.map((item, key) => (<Col key={key} span={12}><CardItem post={item} key={item.id}/></Col>));

    if (postList&&postList.posts&&postList.posts.length>0){
    return (
        <div>
            <Row style={{margin: +"10px 0"}}>
                <Col>
                    <div className="section-top-bar">
                        <h4>{props.title}</h4>
                    </div>
                    <Row>
                        {getPosts}
                    </Row>
                </Col>
            </Row>
        </div>
    )}else{return ""}
}

const mstp = (state) =>(state);

const mdtp = (dispatch) => (bindActionCreators({getNewsByCategoryId},dispatch))

export default connect(mstp, mdtp)(CategoryPost);