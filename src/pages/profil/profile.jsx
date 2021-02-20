import React, {useState} from 'react';
import {Row, Col, Divider, Menu, Skeleton} from "antd";
import {Switch, Route, withRouter, Link} from 'react-router-dom';
import "./profile.scss";
import ResetPassword from "./ResetPassword/ResetPassword";
import EditProfile from "./EditProfile/EditProfile";

const Profile = ({langs, lang, match, location, history, currentUser}) => {
    const [currentMenu, setMenu] = useState(location.pathname);

    return (
        <Row className="bg-white site-border profile">
            <Col xs={24} sm={24} md={6} lg={6}>
                <Row className="padding-box">
                    <Col span={24}>
                        {
                            currentUser ? (
                                <img
                                    src={'https://picsum.photos/200/200'}
                                    alt="Img error"/>
                            ) : (
                                <Row justify="center">
                                    <Col>
                                        <Skeleton.Image/>
                                    </Col>
                                </Row>
                            )
                        }
                    </Col>
                    <Col span={24} className="text-box">
                        <h3 className="username">
                            Boltayev Teshavoy
                        </h3>
                    </Col>
                    <Divider className="m-0"/>
                </Row>
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
                <div className="profile-route-box padding-box">
                    <Switch>
                        <EditProfile/>
                    </Switch>
                </div>
            </Col>
        </Row>
    );
}

export default Profile;