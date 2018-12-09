import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button} from 'antd-mobile';
import {getOrderDetail, submitPay} from "../api/subscribe";
import {cancelOrder, getOpenId} from "../api/orderMine";
import Loading from '../components/Loading'
import '../assets/css/orderDetail.less';
import {Modal, Toast} from "antd-mobile/lib/index";
import {isWeiXin} from "../util/util";

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
export default class OrderDetail extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: null,
        min: null,
        sec: null,
        userInfo: {},
        disabled: false

    }

    componentWillMount() {
        this.props.setTitle('订单详情');
        this.getOrderDetail(this.props.match.params.id);
        this.getUserInfo();
    }

    getUserInfo() {
        let strUserInfo = localStorage.getItem("wanchi-USER-INFO");
        let objUserInfo = JSON.parse(strUserInfo);
        this.setState({
            userInfo: objUserInfo,
        })
    }

    async getOrderDetail(orderId) {
        let ret = await getOrderDetail({orderId})
        this.setState({
            data: ret.body
        });
        this.countdown(this.state.data.payRemainSecond)
    }

    cancelOrder(orderId) {
        let self = this;
        Modal.alert('温馨提示', '确定要取消订单吗？', [
            {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
            {
                text: '确定', onPress: () => {
                    cancelOrder({orderId}).then(ret => {
                        Toast.info('取消成功', 1);
                        setTimeout(() => {
                            self.props.history.go(-1)
                            //this.getOrderList()
                        }, 1000)
                    })
                }
            },
        ])
    }

    countdown(seconds = 0) {
        if (seconds === 0) {
            this.setState({
                disabled: true,
                min: 0,
                sec: 0,
            })
            return;
        }
        let i = 0;
        let loop = setInterval(() => {
            i++;
            let min, sec;
            seconds = seconds - 1
            if (seconds == 0) {
                clearInterval(loop);
                this.setState({
                    disabled: true,
                });
            }
            min = Math.floor(seconds / 60)
            min = min || 0;
            sec = seconds - min * 60
            this.setState({
                min,
                sec
            });
        }, 1000)
    }

    submitPay() {
        this.props.history.push({
            pathname: `/order/pay/${this.props.match.params.id}`
        })
        /*let ret;
        if(isWeiXin()){
            ret = await getOpenId();
            sessionStorage.setItem("orderId",this.props.match.params.id);
            location.href = ret.body;
        }else{
            ret = await submitPay({
                orderId: this.props.match.params.id,
                channel: 'wx',
                openId:''
            });
            location.href = ret.body.redirectUrl;
        }*/
    }

    render() {
        let {data, userInfo, min, sec} = this.state;
        if (!data) {
            return <Loading></Loading>
        }
        return (
            <div className="order-detail">
                {
                    min === null ? <Loading></Loading> :
                        <div className="order-pay-count">
                            <div className="order-detail-status">{(min ==0 && sec ==0) ? "支付超时":"待付款"}</div>
                            <div className="order-pay-c-text">支付剩余时间</div>
                            <div className="order-pay-count-down">
                                {/*<em>23</em> : */}<em>{min}</em> 分 <em>{sec}</em> 秒
                            </div>
                            <div className="order-detail-connect">
                                联系人：{data.s4applyDetail.applyUsername} <br/>联系电话：{data.s4applyDetail.phone.replace(/\s/g,'')}
                            </div>
                        </div>
                }

                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <img src={data.activityImgUrl}/>
                    </div>
                    <div className="order-sub-content">
                        <h1>{data.activityName}</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    试驾时间：
                                </div>
                                <div className="order-s-date">
                                    {data.activityDateStr} {data.activityStartHour}-{data.activityEndHour}
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    场次编号：
                                </div>
                                <div className="order-s-date">
                                    {data.activityCode}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="order-detail-price">
                    <li>
                        <span>订单总额</span>
                        <span>¥{data.orderTotalmoney}</span>
                    </li>
                    <li>
                        <span>优惠</span>
                        <span>-¥{data.diffMoney}</span>
                    </li>
                    <li className="price">
                        <span>实付金额</span>
                        <span>¥{data.paymoney}</span>
                    </li>
                </ul>


                <ul className="order-owner">
                    <li>
                        <div className="order-owner-label">订单编号：</div>
                        <div className="order-owner-content">{data.orderNo}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">订单金额：</div>
                        <div className="order-owner-content">¥{data.paymoney}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">订单状态：</div>
                        <div className="order-owner-content order-red">{data.orderStatusStr}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">支付方式：</div>
                        <div className="order-owner-content order-red">{data.paymethod ||'未支付'}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">创建时间：</div>
                        <div className="order-owner-content">{data.orderCreateTimeStr}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">手机号码：</div>
                        <div className="order-owner-content">{userInfo.username}</div>
                    </li>
                </ul>
                <div className="order-detail-submit">
                    <Button type="default" onClick={() => {
                        this.cancelOrder(data.orderId)
                    }} size="small">取消订单</Button>
                    <Button type="primary" size="small" disabled={this.state.disabled} onClick={() => {
                        this.submitPay()
                    }}>付款</Button>
                </div>
            </div>
        )
    }
}