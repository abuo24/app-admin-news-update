import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Form, Input, Row} from "antd";
import Title from "antd/lib/typography/Title";
import {authApi} from "../../../redux/service/authApi";
import {ToastContainer, toast} from "react-toastify";
import {getMe, getMeByToken} from "../../../redux/action/authApis";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getToggle} from "../../../redux/action/toggle";

const EditProfile = (props) => {
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const buttonItemLayout = {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    };


    const note = () => toast.info("O'zgartirish kiritildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");

    const edit = () => {
        console.log(data);
        authApi.editUser(data).then(res => {
            console.log(res);
            console.log(localStorage.getItem("token"));
            props.getMe();
            note();
            if (localStorage.getItem("token") !== res.data.token) {
                localStorage.setItem("token", res.data.token);
                window.location.reload()
            }
        }).catch(err => {
            console.log(err)
            danger()
        })
    };

    useEffect(() => {
        props.getMe();

        const user = props.user && props.user;

        const user1 = props.auth_reducer.user && props.auth_reducer.user.data;

    }, []);

    const user = props.user && props.user;

    const user1 = props.auth_reducer.user && props.auth_reducer.user.data;

    console.log(user);
    console.log(user1);

    const [data, setData] = useState({
        fullname: "",
        phone: "",
        social: "",
        username: ""
    });

    useEffect(() => {
        user && setData({
            fullname: user.fullname,
            phone: user.phone,
            social: user.social,
            username: user.username
        });
        console.log(user)
    }, [user]);

    return (
        <div>
            <Row>
                <Col span={12}>
                    {user && <Form
                        form={form}
                        {...formItemLayout}
                        layout={'vertical'}
                        initialValues={{
                            layout: 'vertical'
                        }}
                        onFinish={edit}
                    >

                        <Title
                            className={"d-flex justify-content-start"} type="primary" level={5}>
                            Profil Malumotlarini o'zgartirish
                        </Title>

                        <Form.Item label="Fullname">
                            <Input placeholder="Fullname" defaultValue={user1.fullname}
                                   onChange={e => setData({...data, fullname: e.target.value})}
                                   required/>
                        </Form.Item>

                        <Form.Item label="Username">
                            <Input placeholder="Username"
                                   defaultValue={user.username}
                                   onChange={e => setData({...data, username: e.target.value})}
                                   required/>

                        </Form.Item>
                        <Form.Item label="PhoneNumber">
                            <Input placeholder="Phone Number" defaultValue={user.phone}
                                   onChange={e => setData({...data, phone: e.target.value})}
                                   required
                            />
                        </Form.Item>
                        <Form.Item label="telegram">
                            <Input placeholder="telegram" defaultValue={user.social}
                                   onChange={e => setData({...data, social: e.target.value})}
                                   required/>
                        </Form.Item>
                        <Form.Item>
                            <Button {...buttonItemLayout} className={"d-flex justify-content-start"}
                                    type="primary"
                                    htmlType={"submit"}
                            >Saqlash</Button>
                        </Form.Item>
                        <ToastContainer autoClose={2000}/>

                    </Form>}
                </Col>
                <Col span={12}>
                    <Reset/>
                </Col>
            </Row>
        </div>
    );
};

const Reset = (props) => {

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const buttonItemLayout = {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    };
    const [reset, setReset] = useState({
        old_password: "",
        new_password: "",
    });

    const [confirm, setConfirm] = useState({
        confirm_password: ""
    });

    const [error, setError] = useState(false
    );

    const [succes, setSucces] = useState(false);

    const note = () => toast.info("O'zgartirish kiritildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");

    const resetPassword = () => {
        console.log(reset);
        console.log(confirm);
        if (confirm.confirm_password === reset.new_password) {
            authApi.resetPassword(reset).then(res => {
                const newValues = {...confirm};
                newValues.confirm_password = ""
                const newValuesSet = {...reset};
                newValues.new_password = "";
                newValues.old_password = "";
                setConfirm(newValues);
                setReset(newValuesSet);
                console.log(res);
                note();
                setSucces(true);
                window.location.reload()
            }).catch(err => {
                console.log(err);
                danger()
            });
            setError(false)
        } else {
            setError(true)
        }
    };

    useEffect(() => {
        if (succes) {
            const newValues = {...confirm};
            newValues.confirm_password = ""
            const newValuesSet = {...reset};
            newValues.new_password = "";
            newValues.old_password = "";
            setConfirm(newValues);
            setReset(newValuesSet);

        }
    },[props])

    return (
        <Form
            form={form}
            {...formItemLayout}
            layout={'vertical'}
            initialValues={{
                layout: 'vertical'
            }}
            onFinish={resetPassword}
        >

            <Title
                className={"d-flex justify-content-start"} level={5} type="primary">
                Parollarni o'zgartirish
            </Title>
            <Form.Item label="Current Password">
                {<Input.Password placeholder="Current Password" required
                                 // value={succes&&""}
                                onChange={e => setReset({...reset, old_password: e.target.value})}
                />}
            </Form.Item>
            <Form.Item label="New Password">
                <Input.Password placeholder="New Password" required
                                // value={succes&&""}
                                onChange={e => setReset({...reset, new_password: e.target.value})}
                />
            </Form.Item>
            {error && <Row><Col span={14}><Alert
                // message="Xatolik"
                description="Parollar bir xil emas"
                type="error"
                showIcon
            /></Col></Row>}
            <Form.Item label="Confirm Password">
                <Input.Password placeholder="Confirm Password" required
                                // value={succes&&""}
                                onChange={e => setConfirm({
                                    ...confirm,
                                    confirm_password: e.target.value
                                })}
                />
            </Form.Item>
            <Form.Item>
                <Button {...buttonItemLayout} className={"d-flex justify-content-start"}
                        type="primary"

                        htmlType={"submit"}>Saqlash</Button>
            </Form.Item>

        </Form>
    )
}

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getMe, getMeByToken, getToggle}, dispatch));

export default connect(mstp, mdtp)(EditProfile);