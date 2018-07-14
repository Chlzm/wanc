import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Button, Carousel, Checkbox} from 'antd-mobile';
import '../assets/css/orderConfirm.less';
import '../assets/css/orderRunning.less';
import * as runningAPI from "../api/running";

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
export default class RunningDetail extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: ['1', '2', '3'],
        imgHeight: 90,

    }

    componentWillMount() {
        this.props.setTitle('跑步预约详情');
        this.getDetail();
    }
    /**
     *
     * @param type 1:跑步,2：自行车，3：卡丁车，4：塞道
     * @param id
     */
    getDetail() {
        let type = this.props.match.params.type;
        this[`getDetail${type}`] && this[`getDetail${type}`]();
    }
    async getDetail1(){
        let ret = await runningAPI.getRunningDetail({
            id: this.props.match.params.id
        });
    }
    async getDetail2(){
        let ret = await runningAPI.getBicycleDetail({
            id: this.props.match.params.id
        });
    }
    async getDetail3(){
        let ret = await runningAPI.getKartDetail({
            id: this.props.match.params.id
        });
    }
    async getDetail4(){
        let ret = await runningAPI.getTrackDetail({
            id: this.props.match.params.id
        });
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
                        <h1>万驰跑步入场券</h1>
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

                    </div>
                </div>
                <div className="wanc-module">
                    <ul className="order-running-state">
                        <li>
                            <label>预约截止时间：</label>
                            <span>2018-05-18 24:00</span>
                        </li>
                        <li>
                            <label>我的预约状态：</label>
                            <span className="highlight">未预约</span>
                        </li>
                    </ul>
                    {/*<div className="order-running-agree">
                        <Checkbox.AgreeItem>携带儿童 <span>(140cm以下)</span></Checkbox.AgreeItem>
                    </div>*/}
                </div>
                <div className="wanc-module">
                    <div className="order-running-other">
                        <span className="title">其他事项说明：</span>
                        <ol>
                            <li>1.如发生意外事件；</li>
                            <li>2.如提供免费午餐；</li>
                            <li>3.如预约试驾者可领取卡丁车优惠券；</li>
                            <li>4.其他其他其他；</li>
                        </ol>
                    </div>
                </div>
                <div className="order-running-button">
                    <Button type="primary">立即预约</Button>
                </div>
            </div>
        )
    }
}