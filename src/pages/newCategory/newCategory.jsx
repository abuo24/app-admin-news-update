import React, {useEffect, useState} from 'react';
import {Button, Col, Collapse, DatePicker, Form, Input, Row, Select, Upload, message} from "antd";
import CategoryTable from "../newPost/categoryTable";
import {connect} from "react-redux";
import {categoriesApi} from "../../redux/service/categoriesApi";
import {toast, ToastContainer} from "react-toastify";
import {bindActionCreators} from "redux";
import {getCategories} from "../../redux/action/posts";
import {tagsApi} from "../../redux/service/tagsApi";
import {getTags} from "../../redux/action/tagsApi";
import NewCategoryCategories from "../newPost/items/newCategoryCategories";
import NewCategoryTags from "../newPost/items/newCategoryTags";

const NewCategory = (props) => {
    const {Panel} = Collapse;

    function callback(key) {
        console.log(key);
    }

    let cat = null;
    let tag = null;

    useEffect(() => {
        props.getCategories();
        props.getTags();
    }, []);

    const [toggle, setToggle] = useState(false);

    const onClickToogle = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    };

    return (
        <div className="App ">
            <div className="d-flex justify-content-start">
                <Button
                    type={!toggle ? "primary" : ""}
                    onClick={onClickToogle}>Kategoriya</Button>
                <Button
                    type={toggle ? "primary" : ""}
                    onClick={onClickToogle}>Teg</Button>
            </div>
            <Form
                name="basic"
                layout="vertical"
            >
                <Row gutter={[16]}>
                    {!toggle?<NewCategoryCategories/>:<NewCategoryTags/>}
                </Row>
            </Form>
        </div>
    );
};

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getCategories, getTags}, dispatch))

export default connect(mstp, mdtp)(NewCategory);

