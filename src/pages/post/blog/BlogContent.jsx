import React from 'react';
import "./../../dashboard/Card/Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {ArrowRightOutlined, EyeOutlined} from "@ant-design/icons";

const BlogContent = () => {
    return(
        <div className={" bg-white "}>
        <div className="col-md-12 col-sm-12 bg-white pt-4">
            <div className="blog-post-details">
                <p className="blog-text">Staying calm, composed and maintaining strong self esteem in
                    today’s tough environment can be difficult but is not impossible if you follow a few
                    simple guidelines. Here are 6 tips you can use as a starter guide to self
                    improvement.</p>
                <p className="blog-text"></p>
                <p className="blog-text">Everything and everyone else around you can affect your self
                    esteem. Other people can deliberately or inadvertently damage your self image.
                    Unchecked people and circumstances can ultimately destroy your self esteem and pull
                    you down in ways you won’t even notice. Don’t let these influences get the best of
                    you. But what should you avoid?</p>
                <blockquote>
                    <p>You’ve heard the expression, “Just believe it and it will come.” Well,
                        technically, that is true, however, ‘believing’ is not just thinking that you
                        can have it; it is also feeling that it is possible. </p>
                </blockquote>
                <img src={"https://picsum.photos/200/300"} alt="" className="blg-post-img"/>
                <img src={"https://picsum.photos/200/300"} alt=""
                     className="blg-post-img"/>
                <p className="blog-text">I can stop looking for events, people and circumstances
                    to blame. I only need to look inside. No matter how influential you are you
                    cannot control the circumstances and events of your life. There are only
                    three things over which you have absolute and total control and these are
                    all you need. It forms the total experience of life. </p>
                <h4>My thoughts, my actions and my words are always under my conscious</h4>
                <div className="bp-list">
                    <ul>
                        <li>Hypnotherapy For Motivation Getting The Drive Back</li>
                        <li>Roar With Confidence</li>
                        <li>Motivational Sayings Ten Great Ones</li>
                        <li>Harness The Power Of Words In Your Life</li>
                    </ul>
                </div>
                <div className="bp-tag-area">
                    <h4>Tags</h4>
                    <div className="row">
                        <div className="col-xs-7">
                            <div className="bp-tags">
                                <a href="#">Photography</a>
                                <a href="#">Illustration</a>
                                <a href="#">Art</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post-navigation">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 clearfix">
                            <img src={"https://picsum.photos/200/300"}
                                 alt="next post image"/>
                            <div className="blg-nav-text">
                                <a href="#" className="nav-link"><i
                                    className="fa fa-long-arrow-left"></i>previous post</a>
                                <a href="#">Sometimes Typhoons Come</a>
                                <span className="post-views"><EyeOutlined></EyeOutlined>820</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 clearfix">
                            <div className="blg-nav-text right-nav-text">
                                <a href="#" className="nav-link">newer post<i
                                    className="fa fa-long-arrow-right"></i></a>
                                <a href="#">Burn The Ships</a>
                                <span className="post-views"><EyeOutlined></EyeOutlined>404</span>
                            </div>
                            <img src={"https://picsum.photos/200/300"}
                                 alt="newer post image"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="comments">
                <div className="comments-count">
                    <h4><span>3</span>COMMENTS</h4>
                </div>
                <ul>
                    <li>
                        <article>
                            <div className="comment-status-text">
                                <div className="comment-img">
                                    <img src={"https://picsum.photos/200/300"} alt="author image"/>
                                </div>
                                <div className="comment-author-metadata">
                                    <h4 className="author">JOHAN SMITH <span
                                        className="date">June 2, 2016</span>
                                    </h4>
                                    <p className="comment-content">Morbi gravida, sem non egestas
                                        ullamcorper, tellus ante laoreet nisl, id iaculis urna eros vel
                                        turpis curabitur tristique mauris eget lacus rutrum lobortis. Ut
                                        id elem <a href="#" className="comment-reply-link">
                                            <ArrowRightOutlined></ArrowRightOutlined>
                                        </a></p>
                                </div>
                            </div>
                        </article>
                        <ul className="children">
                            <li>
                                <article>
                                    <div className="comment-status-text">
                                        <div className="comment-img">
                                            <img src={"https://picsum.photos/200/300"}
                                                 alt="author image"/>
                                        </div>
                                        <div className="comment-author-metadata">
                                            <h4 className="author">LUCAS NEWAR <span className="date">June 2, 2016</span>
                                            </h4>
                                            <p className="comment-content">Morbi gravida, sem non
                                                egestas ullamcorper, tellus ante laoreet nisl, id
                                                iaculis urna eros vel turpis curabitur tristique mauris
                                                eget lacus rutrum lobortis. Ut id elem <a href="#"
                                                                                          className="comment-reply-link">
                                                    <ArrowRightOutlined></ArrowRightOutlined>

                                                </a></p>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <article>
                            <div className="comment-status-text">
                                <div className="comment-img">
                                    <img src={"https://picsum.photos/200/300"} alt="author image"/>
                                </div>
                                <div className="comment-author-metadata">
                                    <h4 className="author">LUCAS NEWAR <span
                                        className="date">June 2, 2016</span>
                                    </h4>
                                    <p className="comment-content">Morbi gravida, sem non egestas
                                        ullamcorper, tellus ante laoreet nisl, id iaculis urna eros vel
                                        turpis curabitur tristique mauris eget lacus rutrum lobortis. Ut
                                        id elem <a href="#" className="comment-reply-link">
                                            {/*<MdReplyAll></MdReplyAll>*/}
                                        </a></p>
                                </div>
                            </div>
                        </article>
                    </li>
                </ul>
            </div>

            <div className="comment-responsd">
                <h4>LEAVE A REPLY</h4>
                <div className="contact-form">
                    <div className="cf-msg"></div>
                    <form
                        action="http://themeinnovation.com/demo2/html/newsupdate-preview/newsupdate/mail.php"
                        method="post" id="cf">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <label htmlFor="name">Your Name (required)</label>
                                <input type="text" id="name" name="name"/>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <label htmlFor="email">Your Mail (required)</label>
                                <input type="text" id="email" name="email"/>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <label htmlFor="msg">Your Message</label>
                                <textarea className="contact-textarea" id="msg" name="msg"></textarea>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <button className="cont-submit" id="submit" name="submit">SEND COMMENT
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default BlogContent;