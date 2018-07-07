import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Button, Carousel} from 'antd-mobile';
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

    }

    componentWillMount() {
        this.props.setTitle('确认订单');
    }

    render() {
        return (
            <div className="order-confirm">
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
                                <div className="order-s-date">
                                    SJ201805200001
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="order-confirm-price">
                    <div className="order-price">
                        <p>¥3000.00</p>
                        <p>
                            <del>¥ 5000.00</del>
                        </p>
                    </div>
                    <div className="order-count-time">
                        <div className="order-c-tt">
                            预约倒计时
                        </div>
                        <div className="order-count-value">
                            2 天 23 : 58 : 29
                        </div>
                    </div>
                </div>
                <ul className="order-owner">
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
                <div className="order-confirm-submit">
                    <div className="order-price">
                        总金额：<em>¥3000.00</em>
                    </div>
                    <div className="order-submit-button">
                        <Button type="primary">提交订单</Button>
                    </div>
                </div>
            </div>
        )
    }
}