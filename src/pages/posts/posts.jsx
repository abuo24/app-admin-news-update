import React, {useEffect, useState} from 'react';
import {Col} from "antd";
import {CardItem} from "../index";
import CategoryPost from "../category/categoryPost";
import {bindActionCreators} from "redux";
import {getCategories, getNewsByViewsCount} from "../../redux/action/posts";
import {connect} from "react-redux";

const Posts = (props) => {

    useEffect(() => {
        props.getCategories()
    }, []);

    const category = props.category_reducer.categories;
    console.log(category);

    // const getPosts = posts.map((item, key) => (<CategoryPost postList={item.posts} key={key} title={item.categoryTitle}/>));

    const categoryList = category && category.map((item) => (
        <CategoryPost id={item.id} key={item.id} title={props.langReducer.type=="uz"?item.nameUz:item.nameRu}/>));

    return (<div>
        {categoryList}
    </div>);
};

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getCategories}, dispatch));

export default connect(mstp, mdtp)(Posts);
