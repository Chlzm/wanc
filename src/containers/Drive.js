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
        this.props.setTitle('试驾预约');
    }

    render() {
        return (
            <div className="order-confirm order-success">
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
                                <div className="order-owner-content">未预约</div>
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