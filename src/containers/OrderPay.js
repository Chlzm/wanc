import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Toast, Button, Radio} from 'antd-mobile';
import {getOpenId, getOrderDetail} from "../api/orderMine";
import Loading from '../components/Loading'
import '../assets/css/orderPay.less';
import {isWeiXin, isAPP} from "../util/util";
import qc from '../util/qiancheng'
import {submitPay, submitAPP, getPayResult} from "../api/subscribe";

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
export default class OrderPay extends React.Component {
    constructor(options) {
        super(options);
        this.state = {
            data: null,
            hours: null,
            min: null,
            sec: null,
            chooseWX: true,
            isWX: false,
        }
    }


    componentWillMount() {
        this.props.setTitle('支付订单');
        this.getOrderDetail();
        this.setState({
            isWX: isWeiXin()
        });
    }

    componentDidMount() {
        this.isPayFail();
        sessionStorage.setItem("orderId", this.props.match.params.id);
    }

    isPayFail() {
        let hasMessage = location.href.indexOf('message') > -1;
        if (hasMessage) {
            Toast.fail('支付失败', 2);
        }
    }

    async getOrderDetail() {
        let seconds = 0;
        let ret = await getOrderDetail({
            orderId: this.props.match.params.id,
        })
        if (ret.code === "00000") {
            let seconds = ret.body.payRemainSecond;
            //seconds = Math.floor(has);
            this.countdown(seconds)
        }
        this.setState({
            data: ret.body,
        })
    }

    countdown(seconds) {
        if (seconds === 0) {
            this.setState({
                hours: 0,
                min: 0,
                sec: 0,
            })
            return;
        }
        let i = 0;
        let loop = setInterval(() => {
            i++;
            let min, sec, hours;
            seconds = seconds - 1
            if (seconds == 0) {
                clearInterval(loop);
                this.setState({
                    disabled: true,
                });
            }
            hours = Math.floor(seconds / 60 / 60);
            hours = hours || 0;
            min = Math.floor((seconds - hours * 60 * 60) / 60);
            min = min || 0;
            sec = seconds - hours * 60 * 60 - min * 60;
            sec = sec < 10 ? "0" + sec : sec;
            min = min < 10 ? "0" + min : min;
            hours = hours < 10 ? "0" + hours : hours;
            this.setState({
                min,
                sec,
                hours,
            });
        }, 1000)
    }

    async pay() {
        let ret = await submitAPP({
            orderId: this.props.match.params.id,
            channel: 'alipay',
        });
        qc.track('alipay', {
            orderinfo: ret.body.result
        }).then(res => {
            Toast.info('支付中',10)
            this.appPayCallback(res)
        }).catch(error => {
            console.log(error)
        })
    }

    async appPayCallback() {
        for (let i = 0; i < 5; i++) {
            let ret = await getPayResult({orderId: this.props.match.params.id,})
            if (!ret.body) {
                this.appPayCallback();
                return;
            }else{
                Toast.info('支付成功',2);
                setTimeout(()=>{
                    Toast.hide();
                    this.props.history.replace({
                        pathname:`/subscribe/success/${this.props.match.params.id}`
                    })
                },2000)
                return;
            }
        }
    }

    async submitPay() {
        let ret;
        // 支付宝
        if (!this.state.chooseWX) {
            if (isAPP()) {
                this.pay()
                return;
            }
            submitPay({
                orderId: this.props.match.params.id,
                channel: 'alipay',
                openId: ''
            }).then(res => {
                document.write(res.body.result)
            })
            return;
        }
        if (isWeiXin()) {   // 微信公众号
            ret = await getOpenId();
            sessionStorage.setItem("orderId", this.props.match.params.id);
            location.href = ret.body;
        } else {
            ret = await submitPay({
                orderId: this.props.match.params.id,
                channel: 'wx',
                openId: ''
            });
            location.href = ret.body.redirectUrl;
        }

    }

    render() {
        let {data} = this.state;
        if (!data || this.state.hours === null) {
            return <Loading></Loading>
        }
        return (
            <div className="order-confirm order-pay">
                <div className="order-pay-count">
                    <div className="order-pay-c-text">支付剩余时间</div>
                    <div className="order-pay-count-down">
                        <em>{this.state.hours}</em> : <em>{this.state.min}</em> : <em>{this.state.sec}</em>
                    </div>
                </div>
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <img src={data.activityImgUrl}/>
                    </div>
                    <div className="order-sub-content order-pay-content">
                        <div className="order-pay-price">¥ {data.paymoney}</div>
                        <div className="order-pay-text">{data.activityName}</div>
                    </div>
                </div>
                <div className="order-pay-method">
                    <div className="order-pay-m-title">
                        请选择支付方式
                    </div>
                    <ul>
                        <li onClick={() => {
                            this.setState({
                                chooseWX: true
                            })
                        }}>
                            <div className="order-pay-m-left">
                                <img src={require('../assets/images/icon-wechat.png')}/>
                                <div className="order-pay-m-name">
                                    <p className="op-name">支付宝支付</p>
                                    <p className="op-note">推荐有支付宝账号的用户使用</p>
                                </div>
                            </div>
                            <Radio className="my-radio" checked={this.state.chooseWX}></Radio>
                        </li>
                        {this.state.isWX ? <div></div> :
                            <li onClick={() => {
                                this.setState({
                                    chooseWX: false
                                })
                            }}>
                                <div className="order-pay-m-left">
                                    <img src={require('../assets/images/icon-ant.png')}/>
                                    <div className="order-pay-m-name">
                                        <p className="op-name">支付宝支付</p>
                                        <p className="op-note">推荐有支付宝账号的用户使用</p>
                                    </div>
                                </div>
                                <Radio className="my-radio" checked={!this.state.chooseWX}></Radio>
                            </li>
                        }

                    </ul>
                    <div className="order-pay-submit">
                        <Button type="primary" onClick={() => {
                            this.submitPay();
                        }}>确认支付 ¥{data.paymoney}</Button>
                    </div>
                </div>
            </div>
        )
    }
}