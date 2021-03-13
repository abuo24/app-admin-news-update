import React, {Component, useEffect, useState} from 'react';
import {Row, Col, Divider} from "antd";
import {Switch} from 'react-router-dom';
import "./profile.scss";
import EditProfile from "./EditProfile/EditProfile";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getMe} from "../../redux/action/authApis";
import {render} from "@testing-library/react";

class Profile extends Component {

    componentDidMount() {
        this.props.getMe()
    }

    render() {
        const user = this.props.auth_reducer && this.props.auth_reducer.user && this.props.auth_reducer.user.data;
        return (
            <Row className="bg-white site-border profile">
                <Col xs={24} sm={24} md={6} lg={6}>
                    <Row className="padding-box">
                        <Col span={24} className="text-box">
                            <h3 className="username">
                                {user && user.fullname}
                            </h3>
                        </Col>
                        <Divider className="m-0"/>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={18} lg={18}>
                    <div className="profile-route-box padding-box">
                        <Switch>
                            <EditProfile user={user && user}/>
                        </Switch>
                    </div>
                </Col>
            </Row>
        );
    }
}
;


const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getMe}, dispatch));

export default connect(mstp, mdtp)(Profile);