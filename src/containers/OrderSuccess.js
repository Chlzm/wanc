import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Icon, Carousel} from 'antd-mobile';
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
        this.props.setTitle('预约成功');
    }

    render() {
        return (
            <div className="order-confirm order-success">
                <div className="order-subscribe-congra">
                    <img src={require('../assets/images/pay-success.png')}/>
                </div>
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <Carousel
                            autoplay
                            infinite
                            /*beforeChange
                            afterChange*/
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="http://www.alipay.com"
                                    style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
                                >
                                    <img
                                        src={require('../assets/images/test-car.png')}
                                        alt=""
                                        style={{width: '100%', verticalAlign: 'top'}}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({imgHeight: 'auto'});
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </div>
                    <div className="order-sub-content">
                        <h1>万驰赛车场试驾场次预约</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    试驾时间：
                                </div>
                                <div className="order-s-date">
                                    2018-06-01 | 星期五 | 五天后
                                    13:00-15:00 <em>（2个小时）</em>
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    场次编号：
                                </div>
                                <div className="order-s-date">SJ201805200001</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <span className="title">入场码</span>
                    </div>
                    <div className="wanc-module-content">
                        <div className="join-code">
                            <img src={require('../assets/images/icon-qr-code.png')}/>
                            <div>1234 5678 1325</div>
                            <div className="note">请在入场时出示（可在已预约的订单中查看）</div>
                        </div>
                    </div>
                </div>
                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <span className="title">江苏万驰赛车场</span>
                        <a href="tel:13818668621" className="icon-phone">&nbsp;</a>
                    </div>
                </div>
                <ul className="order-owner">
                    <li>
                        <h2>试驾信息</h2>
                    </li>
                    <li>
                        <div className="order-owner-label">联系人：</div>
                        <div className="order-owner-content">刘立 18652086015</div>
                    </li>
                    <li>
                        <div className="order-owner-label">预约单位：</div>
                        <div className="order-owner-content">利星奔驰汽车销售（南京溧水区店）</div>
                    </li>
                    <li>
                        <div className="order-owner-label">试驾品牌：</div>
                        <div className="order-owner-content">奔驰</div>
                    </li>
                    <li>
                        <div className="order-owner-label">试驾车型：</div>
                        <div className="order-owner-content">C200，E300L</div>
                    </li>
                    <li>
                        <div className="order-owner-label">最少试驾人数：</div>
                        <div className="order-owner-content">8人</div>
                    </li>
                    <li>
                        <div className="order-owner-label">客户报名截止：</div>
                        <div className="order-owner-content">2018-05-30 24:00</div>
                    </li>
                </ul>
                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <span className="title">实付金额</span>
                        <span className="price">¥3000.00</span>
                    </div>
                    <div className="wanc-module-content">
                        <ul className="order-owner">
                            <li>
                                <div className="order-owner-label">订单编号：</div>
                                <div className="order-owner-content">987654321</div>
                            </li>
                            <li>
                                <div className="order-owner-label">订单状态：</div>
                                <div className="order-owner-content">已付款</div>
                            </li>
                            <li>
                                <div className="order-owner-label">支付方式：</div>
                                <div className="order-owner-content">支付宝支付</div>
                            </li>
                            <li>
                                <div className="order-owner-label">创建时间：</div>
                                <div className="order-owner-content">2018-05-15 15:07:37</div>
                            </li>
                            <li>
                                <div className="order-owner-label">手机号：</div>
                                <div className="order-owner-content">18652086015</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <div className="wanc-module-text">
                            <span className="title">已申请</span>
                            <img src={require('../assets/images/icon-person.jpg')}/>
                            <img src={require('../assets/images/icon-person.jpg')}/>
                            <img src={require('../assets/images/icon-person.jpg')}/>
                            <img src={require('../assets/images/icon-person.jpg')}/>
                        </div>
                        <Icon type="right"></Icon>
                    </div>
                </div>
            </div>
        )
    }
}