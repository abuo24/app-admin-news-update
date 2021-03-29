import React, {useState} from "react";
import {tagsApi} from "../../../redux/service/tagsApi";
import {toast, ToastContainer} from "react-toastify";
import {Button, Col, Form, Input, Row} from "antd";
import TagsTable from "./tagsTable";
import {bindActionCreators} from "redux";
import {getCategories} from "../../../redux/action/posts";
import {getTags} from "../../../redux/action/tagsApi";
import {connect} from "react-redux";

const NewCategoryTags = (props) => {
    const [data, setData] = useState({
        tagUz: "",
        tagRu: ""
    });

    const onFinish = () => {
        console.log(data)
        tagsApi.add(data).then(
            res => {
               note()
                props.getTags();
                form.resetFields()
            }
        ).catch(err => danger())
    };
    const note = () => toast.info("Yaratildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");
    const [form] = Form.useForm();
 return (
        <Col span={24}>

            <Form
                name="basic"
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label={"Tag nomi"}
                    name="titleUz"
                    rules={[
                        {
                            required: true,
                            message: `Mavzu nomi!`,
                        },
                    ]}
                >
                    <Input
                        placeholder={"Mavzu "}
                        name="titleUz"
                        onChange={e => setData({...data, tagUz: e.target.value})}
                    />
                </Form.Item>
                <Form.Item
                    label={"Название тэга"}
                    name="titleRu"
                    rules={[
                        {
                            required: true,
                            message: `Название тэга!`,
                        },
                    ]}
                >
                    <Input
                        placeholder={"Название тэга"}
                        name="titleRu"
                        onChange={e => setData({...data, tagRu: e.target.value})}
                    />
                </Form.Item>

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
            <TagsTable
             />
            <ToastContainer/>
        </Col>
    );
};

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getCategories, getTags}, dispatch))


export default connect(mstp, mdtp)(NewCategoryTags);