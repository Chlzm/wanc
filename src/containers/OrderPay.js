import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Button, Carousel, Icon, Radio} from 'antd-mobile';
import {getOrderDetail} from "../api/orderMine";
import Loading from '../components/Loading'
import '../assets/css/orderPay.less';

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
export default class List1 extends React.Component {
    constructor(options) {
        super(options);
        this.state = {
            data: null,
            chooseWX: true
        }
    }


    componentWillMount() {
        this.props.setTitle('支付订单');
        this.getOrderDetail();
    }

    async getOrderDetail() {
        let ret = await getOrderDetail({
            orderId: this.props.match.params.id,
        })
        this.setState({
            data: ret.body,
        })
    }

    render() {
        let {data} = this.state;
        if (!data) {
            return <Loading></Loading>
        }
        return (
            <div className="order-confirm order-pay">
                <div className="order-pay-count">
                    <div className="order-pay-c-text">支付剩余时间</div>
                    <div className="order-pay-count-down">
                        <em>23</em> : <em>23</em> : <em>29</em>
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
                        <li onClick={()=>{
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
                        <li onClick={()=>{
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
                    </ul>
                    <div className="order-pay-submit">
                        <Button type="primary">确认支付 ¥{data.paymoney}</Button>
                    </div>
                </div>
            </div>
        )
    }
}