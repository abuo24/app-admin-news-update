import React, {useEffect} from 'react';
import {Card, Comment, Tooltip} from "antd";
import moment from 'moment';
import {connect} from "react-redux";

const Message = (props) => {
    console.log(props.message_reducer.messages);


    const getMessage = props.message_reducer.messages&&props.message_reducer.messages.data&&props.message_reducer.messages.data!=null?props.message_reducer.messages&&props.message_reducer.messages.data&&props.message_reducer.messages.data.map((item, key)=>(
        <MessageItem key={key} message={item} />
    )):"";

    return (
        <div>
            {getMessage}
        </div>
    );
};
const MessageItem = (props)=>{
    // useEffect(()=>{
    //     moment.local(true)
    // },[])
    // moment.local(true);
    return(
        <div className={"my-2 px-2 bg-white text-left"} style={{background: +"white"}}>
            <div
                className={"ml-5"}
            >
            <Comment
                author={<a>{props.message.firstName+" "+props.message.lastName}</a>}
                content={
                    <p>{props.message.message}</p>
                }
                datetime={
                    <Tooltip title={props.message.createAt.toString()}>
                        <span>{moment(props.message.createAt.toString().slice(0,10),'yyyy.MM.DD' , true).fromNow()}</span>
                    </Tooltip>
                }
            />
            </div>
         </div>
    )
};

const mstp = (state) =>(state);

export default connect(mstp, null)(Message);