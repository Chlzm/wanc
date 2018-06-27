import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button, Carousel} from 'antd-mobile';
import '../assets/css/orderConfirm.less';
import '../assets/css/orderSuccess.less';

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
    }

    state = {
        data: ['1', '2', '3'],
        imgHeight: 90,

    }

    componentWillMount() {
        this.props.setTitle('试驾预约');
    }

    render() {
        return (
            <div className="order-confirm order-success">
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <img src={require('../assets/images/icon-car-logo.jpg')} />
                    </div>
                    <div className="order-sub-content">
                        <h1>C200  E300L</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    试驾时间：
                                </div>
                                <div className="order-s-date">
                                    2018-05-20  9:00-11:00
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    试驾人数：
                                </div>
                                <div className="order-s-date">8人以上　（已约：<em>10</em>人）</div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    车辆来源：
                                </div>
                                <div className="order-s-date">
                                    利星奔驰汽车销售（南京溧水区店）
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <span className="title">预约信息</span>
                        <a href="tel:13818668621" className="icon-phone">&nbsp;</a>
                    </div>
                    <div className="wanc-module-content">
                        <ul className="order-owner">
                            <li>
                                <div className="order-owner-label">预约截止时间：</div>
                                <div className="order-owner-content">2018-05-18   24:00</div>
                            </li>
                            <li>
                                <div className="order-owner-label">我的预约状态：</div>
                                <div className="order-owner-content"><em>未预约</em> <em className="blue">未预约</em></div>
                            </li>
                            <li>
                                <div className="order-owner-label">联系人：</div>
                                <div className="order-owner-content">刘立</div>
                            </li>
                            <li>
                                <div className="order-owner-label">联系方式：</div>
                                <div className="order-owner-content">186*****015</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wanc-module">
                    <div className="order-running-other">
                        <span className="title">其他事项说明</span>
                        <ol>
                            <li>1.如发生意外事件；</li>
                            <li>2.如提供免费午餐；</li>
                            <li>3.如预约试驾者可领取卡丁车优惠券；</li>
                            <li>4.其他其他其他；</li>
                        </ol>
                    </div>
                </div>
                <div className="order-running-button">
                    <Button type="primary" disbaled>我要试驾</Button>
                </div>
            </div>
        )
    }
}