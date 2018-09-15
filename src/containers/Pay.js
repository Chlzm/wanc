import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import qs from 'qs'
import {submitPay} from "../api/pay";
import '../assets/css/about.less';


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
export default class Index extends Component {
    constructor(options) {
        super(options);
    }

    state = {}

    componentWillMount() {
        this.props.setTitle('支付');
        this.getOpenId();
    }

    componentDidMount() {

    }

    onBridgeReady(params) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', params,
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
            });
    }
    getQuery(){
        return qs.parse(this.props.location.search.replace(/\?/,''));
    }
    async getOpenId() {
        let openId = this.getQuery().openid;
        let ret = await submitPay({
            orderId: sessionStorage.getItem("orderId"),
            channel: 'wx',
            openId
        });
        function onBridgeReady(){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', ret.body,
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }else if(res.err_msg == "get_brand_wcpay_request:cancel"){

                    }
                });
        }
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            onBridgeReady();
        }
        //this.onBridgeReady(ret.body);
    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-about">

            </div>
        )
    }
}
