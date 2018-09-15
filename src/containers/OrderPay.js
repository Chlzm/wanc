import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Button, Carousel, Icon, Radio} from 'antd-mobile';
import {getOpenId, getOrderDetail} from "../api/orderMine";
import Loading from '../components/Loading'
import '../assets/css/orderPay.less';
import {isWeiXin} from "../util/util";
import {submitPay} from "../api/subscribe";

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
            isWX:false,
        }
    }


    componentWillMount() {
        this.props.setTitle('支付订单');
        this.getOrderDetail();
        this.setState({
            isWX: isWeiXin()
        })
    }

    componentDidMount() {

    }

    async getOrderDetail() {
        let seconds = 0;
        let ret = await getOrderDetail({
            orderId: this.props.match.params.id,
        })
        if (ret.code === "00000") {
            let has = ret.body.orderCreateTime - Date.now();
            seconds = Math.floor(has / 1000);
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

    async submitPay() {
        let ret;
        // 支付宝
        if (!this.state.chooseWX) {
            submitPay({
                orderId: this.props.match.params.id,
                channel: 'alipay',
                openId: ''
            }).then(res=>{
                document.write(res.body.result)
                /*if (!window.ap) {
                    let script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"
                    script.onload = () => {
                        pay(res);

                    }
                    document.getElementsByTagName("head")[0].appendChild(script)
                    return;
                }
                function pay(res){
                    ap.tradePay( {
                        orderStr: res.body.result,//"timestamp=2016-12-27%2018%3A00%3A00&method=alipay.trade.app.pay&app_id=2014073000007292&sign_type=RSA&charset=utf-8&version=1.0&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%222088411964605312%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A0.01%2C%22subject%22%3A1%2C%22body%22%3A%22%E5%95%86%E5%93%81%E4%B8%AD%E6%96%87%E6%8F%8F%E8%BF%B0%E4%BF%A1%E6%81%AF%22%2C%22out_trade_no%22%3A%22ALIPAYTEST2016081622560194853%22%7D&sign=aueDw0PaUqVMvbiButPCmWy8VsNJIgNKRV4tDEz3mSgIpa5ODnZKVCd1GGCtu7hNzxnwLOiku%2BTRJUVM24aHkKWrdyBHECjkUBvrziWiZBESLCyJPwT1YHGnioRUhLvL1MqTTm85urPeqAUUir4UyxyWowHitjkxh3ru6nSLkLU%3D"
                    }, function(result) {
                        alert(JSON.stringify(result));
                    });
                }
                pay(res)*/
            })
            return;
        }
        if (isWeiXin()) {
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
                        {this.state.isWX ? <div></div>:
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