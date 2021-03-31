import {Button, Col, Form, InputNumber, Row} from "antd";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {socialApi} from "../../redux/service/socialApi";
import {bindActionCreators} from "redux";
import {counts} from "../../redux/action/socialApi";

const ItemSocial = (props) => {

    let count = props.social_reducer && props.social_reducer.all && props.social_reducer.all.data && props.social_reducer.all.data;

    useEffect(() => {
        count = props.social_reducer && props.social_reducer.all && props.social_reducer.all.data && props.social_reducer.all.data;
    }, []);

    useEffect(() => {
        count = props.social_reducer && props.social_reducer.all && props.social_reducer.all.data && props.social_reducer.all.data;
    });

     const [data, setData] = useState({
        facebook:  count&&count.facebook,
        instagram: count&&count.instagram,
        telegram: count&&count.telegram,
        twitter: count&&count.twitter,
        youtube: count&&count.youtube
    })

    const onSubmit = () =>{
        socialApi.edit(data,count).then(res=>{noteEdit()
        props.counts()}).catch(err=>danger())

    }
    const noteEdit = () => toast.info("O'zgartirildi");
    const danger = () => toast.error("Biror nima Xato Iltimos qaytadan harakat qiling");


    return (<>{count && <Row>
            <Col span={4}>
                Facebook:
                <input min={1} type={"number"} defaultValue={count.facebook}
                             onChange={e => setData({...data, facebook: e.target.value})}

                />
            </Col>
            <Col span={4}>
                Instagram:
                <input min={1} defaultValue={count.instagram}
                             onChange={e => setData({...data, instagram: e.target.value})}
                             type={"number"}
                />
            </Col>
            <Col span={4}>
                Telegram:
                <input min={1} defaultValue={count.telegram}
                             onChange={e => setData({...data, telegram: e.target.value})}
                             type={"number"}
                />
            </Col>
            <Col span={4}>
                Youtube:
                <input min={1} defaultValue={count.youtube}
                             onChange={e => setData({...data, youtube: e.target.value})}
                             type={"number"}
                />
            </Col>
            <Col span={4}>
                Twitter:
                <input min={1} defaultValue={count.twitter}
                             onChange={e => setData({...data, twitter: e.target.value})}
                             type={"number"}
                />
            </Col>
                    </Row>}
            <Row className="form-footer mt-2" justify="start" gutter={[8]}>
                <Col>
                    <Form.Item>
                        <Button type="primary"
                            // loading={isSubmitting}
                            onClick={onSubmit}
                        >
                            Ok
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <ToastContainer autoClose={3000}/>
        </>
    )
};

const mstp = state => state;

const mdtp = dispatch => (bindActionCreators({counts}, dispatch));


export default connect(mstp, mdtp)(ItemSocial);