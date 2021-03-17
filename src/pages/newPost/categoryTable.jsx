import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Select, Table} from 'antd';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {categoriesApi} from "../../redux/service/categoriesApi";
import {toast, ToastContainer} from "react-toastify";
import {getCategories} from "../../redux/action/posts";
import {Option} from "antd/lib/mentions";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];


const EditableContext = React.createContext(null);

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class CategoryTable extends React.Component {

    state = {
        selectedRowKeys: [],
        isModalVisible: false,
        id: ""
    };


    showModal = () => {
        this.setState({...this.state, isModalVisible: false});
    };
    asss = "";
    handleDelete = (key) => {
        // this.showModal()
        this.setState({...this.state, isModalVisible: true});
        this.asss = key;
    };


    constructor(props) {
        super(props);
        this.columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
            {
                title: 'Amallar',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.props.category_reducer && this.props.category_reducer.categories.length >= 1 ? (
                        <Popconfirm title="Olib tashlashni xoxlaysizmi?" onConfirm={() => this.handleDelete(record.id)}>
                            <Button>Delete</Button>
                        </Popconfirm>
                    ) : null,
            }
        ];
    }

    handleSelectChange = (name, value) => {
        if (name) {
            this.setState({
                ...this.state,
                [name]: value
            })
        }
    };

    note = () => toast.info("O'chirildi");
    danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");

    note1 = () => toast.info("O'zgartirildi");

    handleSave = (row) => {
        console.log(row);
        categoriesApi.edit(row.id, row).then(
            res => {
                console.log(res)
                this.props.getCategories();
                this.note1()
            }
        ).catch(
            err => {
                this.danger()
                console.log(err)
            }
        )
    };

    componentDidMount() {
        this.setState({data: this.props.category_reducer && this.props.category_reducer.categories});
        console.log(this.props)
    }

    render() {
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        const handleOk = () => {

            console.log(this.props)
            console.log(this.state)
            categoriesApi.delete(this.asss, this.state.category&&this.state.category).then(res => {
                console.log(res);
                // this.state.isModalVisible = false
                this.showModal()
                this.props.getCategories();
                this.note()
            }).catch(err => this.danger())

        };

        const handleCancel = () => {
            this.setState({...this.state, isModalVisible: false});
        };


        return (<>
            <Table
                size={"small"}
                components={components}
                rowClassName={() => 'editable-row'}
                columns={columns}
                dataSource={this.props && this.props.category_reducer && this.props.category_reducer.categories}
            />
            <>
                <Modal title="Kategoriyani olib tashlash uchun undagi postlarni boshqa kategoriyaga almashtirish"
                       visible={this.state.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        name="basic"
                        layout="vertical"
                        // form={form}
                        // onFinish={onFinish}
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
                                        defaultValue={this.asss}
                                        onChange={(value) => this.handleSelectChange('category', value)}
                                    > {
                                        this.props && this.props.category_reducer && this.props.category_reducer.categories && this.props.category_reducer.categories.map((item, key) => {
                                            if (this.asss === item.id) {
                                                return <Option disabled={true} value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>

                                            } else {
                                                return <Option value={item.id} key={item.id}>
                                                    {item.name}
                                                </Option>

                                            }
                                        })
                                    }
                                    </Select>
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                    <ToastContainer autoClose={3000}/>


                </Modal>
            </>

        </>)
    }
}

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getCategories}, dispatch));

export default connect(mstp, mdtp)(CategoryTable)