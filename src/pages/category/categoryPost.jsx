import React, {useEffect, useState} from 'react';
import {Col, Pagination, Row} from "antd";
import {CardItem} from "../index";
import {bindActionCreators} from "redux";
import {getNewsByCategoryId} from "../../redux/action/posts";
import {connect} from "react-redux";

const CategoryPost = (props) => {

    const [postList,setPostList] =useState(null);

    const [paginationList, setPaginationList] = useState({
        totalPage: 0,
        totalItems: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0,
        pageSize: 0
    });

    useEffect(()=>{
        props.getNewsByCategoryId(props.id).then(res=>{setPostList({posts: res.payload.data.news})
        setPaginationList({
            ...paginationList,
            current:  res.payload.data.currentPage+1,
            minIndex: 0,
            totalItems: res.payload.data.totalItems,
            maxIndex:  res.payload.data.news.length,
            pageSize:  res.payload.data.news.length,
            totalPage: res.payload.data.totalPages
        });
            console.log(res.payload.data)
        }).catch(err=>console.log(err))
    },[]);

    console.log(postList&&postList.posts)
    const getPosts = postList&&postList.posts.map((item, key) => (<Col span={12}><CardItem post={item} key={item.id}/></Col>));

    const {data, current, minIndex, maxIndex, pageSize} = paginationList;
    const handleChange = (page) => {

        props.getNewsByCategoryId(props.id,page-1).then(res=>{setPostList({posts: res.payload.data.news})
            setPaginationList({
                ...paginationList,
                current:  page,
                minIndex: 0,
                maxIndex:  res.payload.data.news.length,
                });
        }).catch(err=>console.log(err))
    };
    if (postList&&postList.posts&&postList.posts.length>0){
    return (
        <div>
            <div style={{margin: +"10px 0"}}>
                <div>
                    <div className="section-top-bar">
                        <h4>{props.title}</h4>
                    </div>
                    <Row>
                        {getPosts}
                    </Row>
                    {paginationList.totalPage>1?<Pagination
                        pageSize={paginationList.pageSize&&paginationList.pageSize}
                        current={paginationList.current&&paginationList.current}
                        total={paginationList.totalItems&&paginationList.totalItems}
                        onChange={handleChange}
                        style={{marginTop: "10px"}}
                    />:""}
                </div>
            </div>
        </div>
    )}else{return ""}
}

const mstp = (state) =>(state);

const mdtp = (dispatch) => (bindActionCreators({getNewsByCategoryId},dispatch))

export default connect(mstp, mdtp)(CategoryPost);