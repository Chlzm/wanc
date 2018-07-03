import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Carousel, Button} from 'antd-mobile';
import WCTabBar from '../components/TabBar';
import '../assets/css/orderMine.less';

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
        this.props.setTitle('我的订单');
    }

    render() {
        return (
            <div className="wan-c-order-mine mart70">
                <div className="order-mine-item">
                    <div className="omi-head">
                        <span className="order-no">
                            订单号：73987403085
                        </span>
                        <span className="order-state red">代付款</span>
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
                    <div className="omi-button-area">
                        <span className="price">¥3000.00</span>
                        <div>
                            <Button type="default" size="small">取消订单</Button>
                            <Button type="primary" size="small">付款</Button>
                        </div>
                    </div>
                </div>
                <div className="order-mine-item">
                    <div className="omi-head">
                        <span className="order-no">
                            订单号：73987403085
                        </span>
                        <span className="order-state gray">已取消</span>
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
                    <div className="omi-button-area">
                        <span className="price">¥3000.00</span>
                        <div>
                            <Button type="default" size="small">删除订单</Button>
                        </div>
                    </div>
                </div>
                <div className="order-mine-item">
                    <div className="omi-head">
                        <span className="order-no">
                            订单号：73987403085
                        </span>
                        <span className="order-state primary">已预约</span>
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
                    <div className="omi-button-area">
                        <span className="price">¥3000.00</span>
                        <div>
                            <Button type="default" size="small">取消订单</Button>
                        </div>
                    </div>
                </div>
                <div className="order-mine-item">
                    <div className="omi-head">
                        <span className="order-no">
                            订单号：73987403085
                        </span>
                        <span className="order-state gray">已完成</span>
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
                    <div className="omi-button-area">
                        <span className="price">¥3000.00</span>
                        <div>
                            <Button type="default" size="small">删除订单</Button>
                        </div>
                    </div>
                </div>
                <WCTabBar {...this.props}></WCTabBar>
            </div>
        )
    }
}