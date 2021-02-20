// import React from 'react';
// import { connect } from "react-redux";
// import { Modal, Button, Form, Input, message, Row, Col } from 'antd';
// import { UnlockOutlined } from '@ant-design/icons';
//
//
// const initialParams = {
//     old_password: null,
//     new_password: null,
// };
//
// class ModalForm extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             visible: false,
//             isSubmitting: false,
//             params: {...initialParams}
//         }
//         this.currentForm = React.createRef();
//     }
//
//     onFinish = () => {
//         this.setState({
//             isSubmitting: true,
//         }, () => {
//             resetPassword(this.state.params).then((res) => {
//                 if (res) {
//                     this.setState({ isSubmitting: false, visible: false });
//                     message.success('Success');
//                 } else {
//                     this.setState({ isSubmitting: false, visible: false });
//                 }
//             })
//             this.currentForm.current.setFieldsValue(initialParams);
//         })
//     }
//
//     handleInputChange = (e) => {
//         const { name, value } = e.target;
//         this.setState({
//             params: {
//                 ...this.state.params,
//                 [name]: value,
//             }
//         })
//     }
//
//     render() {
//         const { isSubmitting } = this.state;
//         const { langs, lang } = this.props;
//         const content = langs[lang];
//
//         return (
//             <React.Fragment>
//                 <Form
//                     name="basic"
//                     layout="vertical"
//                     onFinish={this.onFinish}
//                     ref={this.currentForm}
//                 >
//                     <Form.Item
//                         label={content.old_password}
//                         name="old_password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Required!',
//                             },
//                         ]}
//                     >
//                         <Input.Password placeholder={content.old_password} name="old_password" onChange={this.handleInputChange} />
//                     </Form.Item>
//
//                     <Form.Item
//                         label={content.new_password}
//                         name="new_password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Required!',
//                             },
//                         ]}
//                     >
//                         <Input.Password placeholder={content.new_password} name="new_password" onChange={this.handleInputChange} />
//                     </Form.Item>
//
//
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" loading={isSubmitting}>
//                             {content.btn_submit}
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </React.Fragment>
//         );
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         lang: state.initial_data.lang,
//         langs: state.initial_data.langs,
//     }
// }
//
// export default connect(mapStateToProps)(ModalForm);