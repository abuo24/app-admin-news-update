import React, {Component} from 'react';
import BlogSlider from "./BlogSlider";
import BlogContent from "./BlogContent";
import "./../../dashboard/Card/Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPost} from "../../../redux/action/posts";

class Blog extends Component {


    render() {

        return (
            <>
                <BlogSlider/>
                <BlogContent/>
            </>
        );
    }
}

const mstp = (state) => (state);

const mdtp = dispatch => (bindActionCreators({getPost}, dispatch));


export default connect(mstp, mdtp)(Blog);