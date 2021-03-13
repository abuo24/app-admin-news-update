import React, {useEffect} from 'react';
import {StatisticPage} from "./../index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const Dashboard = (props) => {
    useEffect(() => {

    }, []);

    return (
        <StatisticPage/>
    );
};

const mstp = (state) => (state);
const mdtp = (dispatch) => (bindActionCreators({}, dispatch));

export default connect(mstp, mdtp)(Dashboard);