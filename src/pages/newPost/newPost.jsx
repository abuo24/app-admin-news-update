import React, {useState} from 'react';
import CKEditor from 'ckeditor4-react'
import {Button, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {Option} from "antd/lib/mentions";

const NewPost = () => {
    const categoryProps = ["Jahon", "Ijtiomoiy", "siyosiy","internet"];

    return (
        <div className="App">
            <h2>Using CKEditor 4 in React</h2>
            <Form
                name="basic"
                layout="vertical"
            >
                <Row gutter={[16]}>

                    <Col span={24}>
                        <Form.Item
                            label={"Kategoriyalar"}
                            name="blogCategoryName"
                            rules={[
                                {
                                    required: true,
                                    message: `Kategoriya!`,
                                },
                            ]}
                        >
                            <Select
                                showSearch
                                placeholder={"Blog kategoriylarini tanlang"}
                                mode="multiple"
                                // onChange={(value) => this.handleSelectChange('blogCategoryId', value)}
                            >
                                {
                                    Array.isArray(categoryProps) ? categoryProps.map((item,key) => (
                                        <Option value={item[key]} key={item[key]}>
                                            {item[key]}
                                        </Option>
                                    )): "null"
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={"Taqdimot vaqti"}
                            name="blogDate"
                        >
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                className="w-100"
                                placeholder={"Taqdimot Vaqti"}
                                // onChange={this.dateTimeChangeHandler}
                                showTime={{
                                    // defaultValue: moment('00:00:00', 'HH:mm:ss')
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={"Mavzu"}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: `Mavzu nomi!`,
                                },
                            ]}
                        >
                            <Input
                                placeholder={"Mavzu "}
                                name="blogTitleRu"
                                // onChange={this.handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item
                            label={"Content"}
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: `Content!`,
                                },
                            ]}
                        >
                            <CKEditor
                                data="<i>Contentni chiroyli ko'rinishda yozing</i>"
                                onChange={evt => console.log(evt)}
                                type="classic"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="form-footer" justify="end" gutter={[8]}>
                    <Col>
                        <Form.Item>
                            <Button
                                // onClick={this.handleCancel}
                                // disabled={isSubmitting}
                            >
                                Отмена
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                // loading={isSubmitting}
                            >
                                Ok
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>


            </Form>

        </div>
    );
};

export default NewPost;