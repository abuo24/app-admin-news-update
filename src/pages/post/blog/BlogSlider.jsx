import React from 'react';
import "./../../dashboard/Card/Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'

const BlogSlider = () => {
    return (
        <div >
            <div className="blog-post-slider">
                <div className="container">
                    <div className="row">
                        <div className="blg-slider-text">
                            <a href="#" className="blg-post-cat">home > Photography</a>
                            <div className="col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                                <a href="#" className="blog-post-title">Dream Interpretation How to learn to easy to use
                                    how can do</a>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="https://picsum.photos/700/100" alt="blog post image"/>
            </div>
        </div>
    );
};

export default BlogSlider;