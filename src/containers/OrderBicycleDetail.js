import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Button, Carousel,Icon,Radio} from 'antd-mobile';
import '../assets/css/orderDetail.less';

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
        this.props.setTitle('确认订单');
    }

    render() {
        return (
            <div className="order-detail">
                <div className="order-pay-count">
                    <div className="order-detail-status">待付款</div>
                    <div className="order-pay-c-text">支付剩余时间</div>
                    <div className="order-pay-count-down">
                        <em>23</em> : <em>23</em> : <em>29</em>
                    </div>
                    <div className="order-detail-connect">
                        联系人：刘立 <br/>联系电话：18652086015
                    </div>
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
                                <div className="order-s-date">
                                    SJ201805200001
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="order-detail-price">
                    <li>
                        <span>订单总额</span>
                        <span>¥5000.00</span>
                    </li>
                    <li>
                        <span>优惠</span>
                        <span>-¥2000.00</span>
                    </li>
                    <li className="price">
                        <span>实付金额</span>
                        <span>¥3000.00</span>
                    </li>
                </ul>


                <ul className="order-owner">
                    <li>
                        <div className="order-owner-label">订单编号：</div>
                        <div className="order-owner-content">987654321</div>
                    </li>
                    <li>
                        <div className="order-owner-label">订单金额：</div>
                        <div className="order-owner-content">¥3000.00</div>
                    </li>
                    <li>
                        <div className="order-owner-label">订单状态：</div>
                        <div className="order-owner-content order-red">代付款</div>
                    </li>
                    <li>
                        <div className="order-owner-label">支付方式：</div>
                        <div className="order-owner-content order-red">未支付</div>
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
                <div className="order-detail-submit">
                    <Button type="default" size="small">取消定单</Button>
                    <Button type="primary" size="small">付款</Button>
                </div>
            </div>
        )
    }
}