import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Button, Carousel,Icon,Radio} from 'antd-mobile';
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
            <div className="order-confirm order-pay">
                <div className="order-pay-count">
                    <div className="order-pay-c-text">支付剩余时间</div>
                    <div className="order-pay-count-down">
                        <em>23</em> : <em>23</em> : <em>29</em>
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
                    <div className="order-sub-content order-pay-content">
                        <div className="order-pay-price">¥3000.00</div>
                        <div className="order-pay-text">万驰 赛车场试驾场次预约</div>
                    </div>
                </div>
                <div className="order-pay-method">
                    <div className="order-pay-m-title">
                        请选择支付方式
                    </div>
                    <ul>
                        <li>
                            <div className="order-pay-m-left">
                                <img src={require('../assets/images/icon-wechat.png')}/>
                                <div className="order-pay-m-name">
                                    <p className="op-name">支付宝支付</p>
                                    <p className="op-note">推荐有支付宝账号的用户使用</p>
                                </div>
                            </div>
                            <Radio className="my-radio" checked={true} onChange={e => console.log('checkbox', e)}></Radio>
                        </li>
                        <li>
                            <div className="order-pay-m-left">
                                <img src={require('../assets/images/icon-ant.png')}/>
                                <div className="order-pay-m-name">
                                    <p className="op-name">支付宝支付</p>
                                    <p className="op-note">推荐有支付宝账号的用户使用</p>
                                </div>
                            </div>
                            <Radio className="my-radio" onChange={e => console.log('checkbox', e)}></Radio>
                        </li>
                    </ul>
                    <div className="order-pay-submit">
                        <Button type="primary">确认支付 ¥3000.00</Button>
                    </div>
                </div>
            </div>
        )
    }
}