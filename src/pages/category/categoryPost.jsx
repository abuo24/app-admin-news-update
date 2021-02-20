import React, {useState} from 'react';
import {Col, Row} from "antd";
import {CardItem} from "../index";

const CategoryPost = ({postList, title}) => {


    const getPosts = postList.map((item, key) => (<Col key={key} span={12}><CardItem post={item} key={item.id}/></Col>));


    return (
        <div>
            <Row style={{margin: +"10px 0"}}>
                <Col>
                    <div className="section-top-bar">
                        <h4>{title}</h4>
                    </div>
                    <Row>
                        {getPosts}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default CategoryPost;