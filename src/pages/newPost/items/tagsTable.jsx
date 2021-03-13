import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Popconfirm, Table} from "antd";
import {Component} from "react";
import {toast} from "react-toastify";
import {categoriesApi} from "../../../redux/service/categoriesApi";
import {getTags} from "../../../redux/action/tagsApi";
import {tagsApi} from "../../../redux/service/tagsApi";

class TagsTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Tags',
                dataIndex: 'tag',
                width: '30%',
            },
            {
                title: 'Amallar',
                dataIndex: 'amallar',
                render: (_, record) =>
                    this.props && this.props.tags_reducer && this.props.tags_reducer.tags.data.length >= 1 ? (
                        <Popconfirm title="Olib tashlansinmi?" onConfirm={() => this.handleDelete(record.id)}>
                            <Button>Delete</Button>
                        </Popconfirm>
                    ) : null,
            },
        ];
    }

    componentDidMount() {
        this.setState({data: this.props && this.props.tags_reducer && this.props.tags_reducer.tags.data});
        console.log(this.props)
    }

    note = () => toast.info("O'chirildi");
    danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");

    handleDelete = (key) => {
        tagsApi.delete(key).then(res => {
            console.log(res);
            this.props.getTags();
            this.note()
        }).catch(err => this.danger())
    };


    render() {
        const columns = this.columns.map((col) => {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    dataIndex: col.dataIndex,
                    title: col.title,
                }),
            };
        });
        return (
            <div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.props && this.props.tags_reducer && this.props.tags_reducer.tags.data}
                />
            </div>
        );
    }
}

const mstp = (state) => (state);

const mdtp = (dispatch) => (bindActionCreators({getTags}, dispatch));

export default connect(mstp, mdtp)(TagsTable)
