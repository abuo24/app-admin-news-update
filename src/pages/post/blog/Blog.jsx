import React from 'react';
import BlogSlider from "./BlogSlider";
import BlogContent from "./BlogContent";
import "./../../dashboard/Card/Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'

const Blog = () => {
    return (
        <>
            <BlogSlider/>
            <BlogContent/>
        </>
    );
};

export default Blog;