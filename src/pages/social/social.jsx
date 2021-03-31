import React, {Component, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import {ToastContainer} from "react-toastify";
import {counts} from "../../redux/action/socialApi";
import ItemSocial from "./ItemSocial";

const Social = (props) => {

    useEffect(() => {
            props.counts()
        },
        []
    )

    return (
        <div className={"container"}>
            <Form
                name="basic"
                layout="vertical"
            >
                <Row gutter={[16]}>

                    <Col span={24}>
                        <ItemSocial/>
                    </Col>
                </Row>


            </Form>

        </div>
    );
};

const mstp = state => state;

const mdtp = dispatch => (bindActionCreators({counts}, dispatch));


export default connect(mstp, mdtp)(Social);