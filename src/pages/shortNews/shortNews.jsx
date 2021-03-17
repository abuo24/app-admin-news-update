import React, {useEffect, useState} from 'react';
import {Col} from "antd";
import {CardItem} from "../index";
import CategoryPost from "../category/categoryPost";
import {connect} from "react-redux";
import Cards from "./cards";

const ShortNews = (props) => {

    const category = props.category_reducer.categories;
    console.log(category);

    const categoryList = category&&category.map((item)=>(<Cards id={item.id} key={item.id} title={item.name}/>));

    return (<div>
        {categoryList}
    </div>);
};

const mstp = (state) =>(state);

export default connect(mstp, null)(ShortNews);