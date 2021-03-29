import React, {useState} from 'react';
import "./../../dashboard/Card/Card.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from "react-redux";
import {AiOutlineArrowRight, IoTrashOutline} from "react-icons/all";
import {ToastContainer, toast} from "react-toastify"
import {postsApi} from "../../../redux/service/postsApi";
import CKEditor from "ckeditor4-react";
import {Modal, Space} from "antd";
import {IconContext} from "react-icons";
import ExclamationCircleOutlined from "@ant-design/icons/lib/icons/ExclamationCircleOutlined";
import {videosApi} from "../../../redux/service/videosApi";
import {commentsApi} from "../../../redux/service/commentsApi";

const BlogContent = (props) => {

    const {confirm} = Modal;

    const [commentData, setCommentData] = useState({
        comments_id: "",
        message: ""
    });


    const note = () => toast.success("Saqlandi");
    const note1 = () => toast.success("O'chirildi");
    const danger = () => toast.error("Biror nimada xatolik");

    const post = props.post_reducer.post && props.post_reducer.post.data;

    const onSubmit = (e) => {
        e.preventDefault();
        postsApi.createComment(post && post.id, commentData).then(
            res => {
                setCommentData(null);
                Array.from(document.querySelectorAll(".for_input")).forEach(
                    input => (input.value = "")
                );
                note()
            }).catch(err => console.log(err))
    };

    const [obj, setObj] = useState(null);
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Commnetni olib tashlaysizmi?',
            icon: <ExclamationCircleOutlined/>,
            content: '',
            okText: 'HA',
            okType: 'danger',
            cancelText: "Yo'q",
            onOk() {
                commentsApi.delete(id).then(
                    res => {
                        note1();
                     }
                ).catch(err => danger())
            }
        });
    }


    return (<div className={" bg-white "}>
            {post &&
            <div className="col-md-12 col-sm-12 bg-white pt-4">
                <div className="blog-post-details">
                    <p className="blog-text" dangerouslySetInnerHTML={{__html: post.contentUz}}>
                    </p>

                    <div className="bp-tag-area">
                        <h4>Teglar</h4>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="bp-tags">
                                    {
                                        post && post.tags.map((item) => (
                                            <a key={item.id}>{item.tagUz}</a>
                                        ))
                                    }</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="comments">
                    <div className="comments-count">
                        <h4>
                            <span>{post && post.comments !== undefined && post.comments.length !== 0 ? post.comments.length : "0"}</span>Izohlar
                        </h4>
                    </div>
                    <ul>{post && post.comments && post.comments.map((item) => (
                        <li key={item.id}>
                            <article>
                                <div className="comment-status-text">
                                    <div className="comment-img">
                                        {item.author.slice(0, 1).toUpperCase()}
                                    </div>
                                    <div className="comment-author-metadata">
                                        <h4 className="author">{item.author} <span
                                            className="date">{item.createAt.slice(0, 16)}</span>
                                        </h4>
                                        <p className="comment-content">
                                            {item.message}
                                        </p>
                                        <span
                                        style={{padding: "10px"}}>
                                                <IconContext.Provider
                                                    value={{color: "grey", className: "global-class-name"}}>

                                                    <Space>
                                                        <div onClick={e => showDeleteConfirm(item.id)}>
                                                            <IoTrashOutline/>
                                                        </div>
                                                    </Space>
                                                </IconContext.Provider>
                                                </span>
                                        <span
                                            style={{padding: "10px"}} onClick={
                                                e => {
                                                    e.preventDefault();
                                                    setCommentData({...commentData, comments_id: item.id});
                                                    setObj(item)
                                                }
                                            }
                                            onDoubleClick={
                                                e => {
                                                    e.preventDefault();
                                                    setCommentData({...commentData, comments_id: ""});
                                                    setObj(null)
                                                }
                                            }
                                            className="comment-reply-link"><AiOutlineArrowRight/>
                                        </span>
                                    </div>
                                </div>
                            </article>
                            {item.comments &&
                            <ul className="children">
                                <li>
                                    <article>
                                        <div className="comment-status-text">
                                            <div className="comment-img">
                                                {item.comments.author.slice(0, 1).toUpperCase()}
                                            </div>
                                            <div className="comment-author-metadata">
                                                <h4 className="author">{item.comments.author} <span
                                                    className="date">{item.comments.createAt.slice(0, 16)}</span>
                                                </h4>
                                                <div>

                                                </div>

                                                <p className="comment-content">
                                                    {item.comments.message}
                                                </p>
                                                <span style={{padding: "10px"}}>
                                                <IconContext.Provider
                                                    value={{color: "grey", className: "global-class-name"}}>

                                                    <Space>
                                                        <div onClick={e => showDeleteConfirm(item.comments.id)}>
                                                            <IoTrashOutline/>
                                                        </div>
                                                    </Space>
                                                </IconContext.Provider>
                                                </span>
                                                <span style={{padding: "10px"}}
                                                      onClick={
                                                          e => {
                                                              e.preventDefault();
                                                              setCommentData({
                                                                  ...commentData,
                                                                  comments_id: item.comments.id
                                                              });
                                                              setObj(item.comments)
                                                          }}
                                                      onDoubleClick={
                                                          e => {
                                                              e.preventDefault();
                                                              setCommentData({...this.state, comments_id: ""})
                                                              setObj(null)
                                                          }
                                                      }
                                                      className="comment-reply-link">
                                                    <AiOutlineArrowRight/></span>

                                            </div>
                                        </div>
                                    </article>
                                </li>
                            </ul>}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="comment-responsd">
                    <h4>Izoh yoki Izohlarga Javob qoldiring:)</h4>
                    <div className="contact-form">
                        {obj && <ul className="children">
                            <li>
                                <article>
                                    <div className="comment-status-text">
                                        <div className="comment-img">
                                            {obj && obj.author.slice(0, 1).toUpperCase()}
                                        </div>
                                        <div className="comment-author-metadata">
                                            <h4 className="author">{obj && obj.author} <span
                                                className="date">{obj && obj.createAt.slice(0, 16)}</span>
                                            </h4>
                                            <p className="comment-content">
                                                {obj && obj.message}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>
                        }
                        <div className="cf-msg"></div>
                        <form
                            onSubmit={onSubmit}
                            method="post" id="cf">
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <label htmlFor="name">Ism</label>
                                    <input className="for_input"
                                           onChange={e => (setCommentData({...commentData, author: e.target.value}))}
                                           type="text" id="name" name="name" disabled={true} value={"Admin"} required/>
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <label htmlFor="email">EMail</label>
                                    <input className="for_input"
                                           onChange={e => (setCommentData({
                                               ...commentData,
                                               authorMail: e.target.value
                                           }))}
                                           type="text" id="email" name="email" disabled={true}
                                           value={"mryediniofficial9924@gmail.com"} required/>
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <label htmlFor="msg">Izoh</label>
                                    <textarea
                                        onChange={e => (setCommentData({...commentData, message: e.target.value}))}
                                        className="contact-textarea for_input" id="msg" name="msg" required/>
                                </div>
                                <div className="col-md-12 col-sm-12">
                                    <button className="cont-submit" id="submit" name="submit" type="submit">Yuborish
                                    </button>
                                    <ToastContainer autoClose={2000}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}


const mstp = (state) => (state);


export default connect(mstp, null)(BlogContent);