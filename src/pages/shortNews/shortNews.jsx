import React from 'react';
import {connect} from "react-redux";
import Cards from "./cards";

const ShortNews = (props) => {

    const category = props.category_reducer.categories;
    console.log(category);

    const categoryList = category&&category.map((item)=>(<Cards id={item.id} key={item.id} title={props.langReducer.type=="uz"?item.nameUz:item.nameRu}/>));

    return (<div>
        {categoryList}
    </div>);
};

const mstp = (state) =>(state);

export default connect(mstp, null)(ShortNews);