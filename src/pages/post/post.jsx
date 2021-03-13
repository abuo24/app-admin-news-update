import React, {Component} from 'react';
import Blog from "./blog/Blog";
import {bindActionCreators} from "redux";
import {getPost} from "../../redux/action/posts";
import {connect} from "react-redux";

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.props.getPost(this.state.id);
    }


    componentDidUpdate() {
        if (this.state.id !== this.props.match.params.id) {
            this.setState({id: this.props.match.params.id});
            this.props.getPost(this.props.match.params.id);
        } else if (this.state.id !== undefined) {
            this.props.getPost(this.state.id);
        }
    }

    render() {
        return (
            <div className="bg-white text-left">
                <Blog/>
            </div>
        );
    }
};

const mstp = (state) => (state);

const mdtp = dispatch => (bindActionCreators({getPost}, dispatch));


export default connect(mstp, mdtp)(Post);