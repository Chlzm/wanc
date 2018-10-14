import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import '../assets/css/alipay.less';
import qs from 'qs'

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
export default class AlipayMiddlePage extends Component {
    constructor(options) {
        super(options);
        this.state = {
            sec: 5,
            text: '',
            pageText: '订单详情页',
            message: '',
            success: true,
            orderid: 0
        }
    }


    componentWillMount() {
        //this.props.setTitle('支付成功');

    }

    componentDidMount() {
        this.initPayResult();

    }

    initPayResult() {
        let payResult = qs.parse(location.search.replace('?', ''));
        if(payResult.success){
            this.props.setTitle('支付成功');
            this.setState({
                pageText: '订单详情页'
            })
        }else{
            this.props.setTitle('支付失败');
            this.setState({
                pageText: '支付页'
            })
        }
        this.countdown(1,payResult);
    }

    countdown(seconds = 1,payResult) {
        let loop;
        let i = 0;
        clearInterval(loop);
        loop = setInterval(() => {
            i++;
            seconds = seconds - 1
            if (seconds == 0) {
                clearInterval(loop);
                if(payResult.success){
                    this.props.history.push({
                        pathname:`/subscribe/success/${payResult.orderid}`
                    });
                }else{
                    this.props.history.push({
                        pathname:`/order/pay/${sessionStorage.getItem("orderId")}`
                    });
                }
                return;
            }
            this.setState({
                sec: seconds,
                text: `${seconds} 秒后跳转到${this.state.pageText}面`
            });
        }, 1000)
    }


    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-alipay">
                {this.state.text}
            </div>
        )
    }
}
