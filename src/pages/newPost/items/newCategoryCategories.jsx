import React, {useState} from "react";
import {categoriesApi} from "../../../redux/service/categoriesApi";
import {toast, ToastContainer} from "react-toastify";
import {Button, Col, Form, Input, Row} from "antd";
import CategoryTable from "../categoryTable";
import {bindActionCreators} from "redux";
import {getCategories} from "../../../redux/action/posts";
import {getTags} from "../../../redux/action/tagsApi";
import {connect} from "react-redux";

const NewCategoryCategories = (props) => {

    const [data, setData] = useState({
        name: ""
    });

    const onFinish = () => {
        console.log(data);
        categoriesApi.add(data).then(
            res => {
                console.log(res);
                note();
                props.getCategories();
                props.getTags();
                form.resetFields()
            }
        ).catch(err => danger())
    };
    const note = () => toast.info("Yaratildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");
    const [form] = Form.useForm();

    console.log(data);

    return (
        <Col span={24} className={"mt-4"}>
            <Form
                name="basic"
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Row gutter={[16]}>
                    <Col span={24}>
                        <Form.Item
                            label={"Kategoriya nomini kiriting"}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: `kategoriya nomini kiriting!`,
                                },
                            ]}
                        >
                            <Input
                                placeholder={"Kategoriya nomi"}
                                onChange={e => setData({
                                    name: e.target.value
                                })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="form-footer" justify="end" gutter={[8]}>

                    <Col>
                        <Form.Item>
                            <Button type="primary"
                                    onClick={onFinish}
                            >
                                Ok
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <ToastContainer autoClose={3000}/>
            <CategoryTable
            />

        </Col>
    );
};

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getCategories, getTags}, dispatch))

export default connect(mstp, mdtp)(NewCategoryCategories);

