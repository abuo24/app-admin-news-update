import React, {useEffect, useState} from 'react';
import {Col, Pagination, Row} from "antd";
import {CardItem} from "../index";
import {bindActionCreators} from "redux";
import {getNewsByCategoryId} from "../../redux/action/posts";
import {connect} from "react-redux";
import ShortNewsItem from "./shortNewsItem";
import {getPostByCategoryId} from "../../redux/action/shortPostApi";

const Cards = (props) => {

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
        props.getPostByCategoryId(props.id).then(res=>{setPostList({posts: res.payload.data&&res.payload.data.shortnews})
            setPaginationList({
                ...paginationList,
                current:  res.payload.data.currentPage+1,
                minIndex: 0,
                totalPage: res.payload.data.totalPages,
                totalItems: res.payload.data.totalItems,
                maxIndex:  res.payload.data.shortnews.length,
                pageSize:  res.payload.data.shortnews.length,
            });
        }).catch(err=>console.log(err))
    },[]);


    const getPosts = postList&&postList.posts&&postList.posts.map((item, key) => (<Col key={key} span={6}><ShortNewsItem post={item} key={item.id}/></Col>));

    const {data, current, minIndex, maxIndex, pageSize} = paginationList;

    const handleChange = (page) => {
        props.getPostByCategoryId(props.id,page-1).then(res=>{setPostList({posts: res.payload.data.shortnews})
            setPaginationList({
                ...paginationList,
                current:  page,
                minIndex: 0,
                totalPage: res.payload.data.totalPages,
                maxIndex:  res.payload.data.shortnews.length,
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
                        <Row gutter={[24]}>
                            <Col span={24}>
                                <Row>
                            {getPosts}</Row>
                            </Col>
                        </Row>
                        {paginationList.totalPage>1?
                            <Pagination
                                pageSize={paginationList.pageSize && paginationList.pageSize}
                                current={paginationList.current && paginationList.current}
                                total={paginationList.totalItems && paginationList.totalItems}
                                onChange={handleChange}
                                style={{marginTop: "10px"}}
                            />:""
                        }

                    </div>
                </div>
            </div>
        )}
    else {return ""}
}

const mstp = (state) =>(state);

const mdtp = (dispatch) => (bindActionCreators({getPostByCategoryId},dispatch))

export default connect(mstp, mdtp)(Cards);