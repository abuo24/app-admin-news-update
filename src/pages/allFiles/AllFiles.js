import React, {useEffect} from "react";
import {render} from "react-dom";

import {Card, Button, Row, Col} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getAllFiles} from "../../redux/action/filesApi";
import {getFile} from "../../server/host";
import {MdContentCopy} from "react-icons/all";
import { message } from 'antd';

const styles = {
    fontFamily: "sans-serif",
    fontSize: "8px",
    padding: "1rem"
};


const AllFiles = (props) => {
    useEffect(() => {
        props.getAllFiles()
    }, []);
    const info = () => {
        message.info('Nusxalandi');
    };
    const allFiles = props.files_reducer&&props.files_reducer.all&&props.files_reducer.all.map(
        (item)=>(
            <Col span={8}>
                <Card title={item.name}>
                    <a href={item.url} style={{fontSize:"8px!important"}} target={"_blank"}>
                        <p style={{fontSize:"8px!important"}}>{item.url}</p>
                    </a>
                    <MdContentCopy style={{color:"black",display: "inline-block"}} onClick={()=>{
                        navigator.clipboard.writeText(item.url)
                        info()
                    }}/>

                </Card>
            </Col>
        )
    );

    return (
        <div style={styles}>
            <Row>
                {allFiles}
            </Row>
        </div>)
};

const mstp = state => state;

const mdtp = dispatch => (bindActionCreators({getAllFiles}, dispatch))


export default connect(mstp, mdtp)(AllFiles)