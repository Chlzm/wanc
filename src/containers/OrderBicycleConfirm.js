import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button} from 'antd-mobile';
import {getConfirmDetail} from '../api/running'
import {getOrderDetail} from "../api/orderMine";
import Loading from '../components/Loading'
import '../assets/css/orderConfirm.less';

function matchStateToProps(state) {
    //...
    return {
        state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...headerActions
    }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)
export default class OrderConfirm extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: ['1', '2', '3'],
        imgHeight: 90,
        detail: null
    }

    componentWillMount() {
        this.props.setTitle('确认订单');
        this.getDetail();
    }

    async getDetail() {
        let ret = await getOrderDetail({
            orderId: this.props.match.params.id
        });
        this.setState({
            detail: ret.body
        });
    }
    submit() {
        this.props.history.push({
            pathname: `/order/pay/${this.props.match.params.id}`
        });
    }
    render() {
        const {detail} = this.state;
        if (!detail) {
            return <Loading></Loading>
        }
        return (
            <div className="order-confirm">
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                            <img src={detail.activityImgUrl}/>
                    </div>
                    <div className="order-sub-content">
                        <h1>{detail.activityName}</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    活动时间：
                                </div>
                                <div className="order-s-date">
                                    {detail.activityDateStr} &nbsp;
                                    {detail.activityStartHour}-{detail.activityEndHour}
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    场次编号：
                                </div>
                                <div className="order-s-date">
                                    {detail.activityCode}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="order-confirm-price">
                    <div className="order-price">
                        <p>¥{detail.paymoney}</p>
                        {/*<p>
                            <del>¥{detail.price}</del>
                        </p>*/}
                    </div>
                    <div className="order-count-time">
                        {/* <div className="order-c-tt">
                            预约倒计时
                        </div>
                        <div className="order-count-value">
                            2 天 23 : 58 : 29
                        </div>*/}
                    </div>
                </div>
                <div className="order-confirm-submit">
                    <div className="order-price">
                        总金额：<em>¥{detail.paymoney}</em>
                    </div>
                    <div className="order-submit-button">
                        <Button type="primary" onClick={()=>{
                            this.submit()
                        }}>提交订单</Button>
                    </div>
                </div>
            </div>
        )
    }
}