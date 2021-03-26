import React from 'react';
import "./../../dashboard/Card/Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from "react-redux";
import {getFile} from "../../../server/host";

const BlogSlider = (props) => {

    return (
        <div>
            <div className="blog-post-slider">
                <div className="container">
                    <div className="row">
                        <div className="blg-slider-text">
                            <div className="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                                <a href="#" className="blog-post-title">{props.post_reducer.post&&props.post_reducer.post.data&&props.post_reducer.post.data.titleUz}</a>
                            </div>
                        </div>
                    </div>
                </div>
                {props.post_reducer.post && props.post_reducer.post.data && props.post_reducer.post.data.headAttachment && props.post_reducer.post.data.headAttachment.hashId&& props.post_reducer.post.data.headAttachment.hashId !== null ?
                    <img src={getFile + props.post_reducer.post.data.headAttachment.hashId} alt="slider image"/> :
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"}
                         alt="blog post image"/>
                }
            </div>
        </div>
    );
};

const mstp = (state) => (state);

export default connect(mstp, null)(BlogSlider);