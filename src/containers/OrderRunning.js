import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button, Modal, Checkbox, Stepper} from 'antd-mobile';
import '../assets/css/orderConfirm.less';
import '../assets/css/orderRunning.less';
import * as runningAPI from "../api/running";
import Loading from '../components/Loading'

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
        data: {},
        person: 1,
        typeMap: ['', '跑步预约详情', '自行车预约详情', '卡丁车预约详情', '赛道预约详情'],
        imgHeight: 90,
        dayMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        doSubmit: false,
    }

    componentWillMount() {
        this.setTitle();
        this.getDetail();
    }

    setTitle() {
        let type = this.props.match.params.type;
        let title = this.state.typeMap[type];
        this.props.setTitle(title);
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

    async getDetail1() {
        let ret = await runningAPI.getConfirmDetail({
            id: this.props.match.params.id
        });
        this.setState({
            data: ret.body,
        });
    }

    async getDetail2() {
        let ret = await runningAPI.getConfirmDetail({
            id: this.props.match.params.id
        });
        this.setState({
            data: ret.body,
        });
    }

    async getDetail3() {
        let ret = await runningAPI.getConfirmDetail({
            id: this.props.match.params.id
        });
        this.setState({
            data: ret.body,
        });
    }

    async getDetail4() {
        let ret = await runningAPI.getConfirmDetail({
            id: this.props.match.params.id
        });
        this.setState({
            data: ret.body,
        });
    }

    onChange = (person) => {
        this.setState({
            person
        })
    }

    submit(remainUserNum) {
        if (this.state.doSubmit) {
            return;
        }
        const {type, id} = this.props.match.params;
        let options = {
            id,
            usercount: this.state.person,
            paymoney: this.state.data.discountPrice,
        }
        // parseInt(type)
        switch (this.state.data.discountPrice) {
            case 0:
                Modal.alert('友情提示', '确定本次预约？', [
                    {text: '取消', onPress: () => console.log('取消')},
                    {
                        text: '确定',
                        onPress: () => {
                            runningAPI.activityApply(options).then(ret => {
                                this.props.history.push({
                                    pathname: `/subscribe/success/${ret.body.orderId}`
                                })
                            })
                        }
                    },
                ])
                break;
            default:
                this.setState({
                    doSubmit: true,
                });
                this.props.history.push({
                    pathname: `/subscribe/confirm/${options.id}/${this.state.person}`
                })
                break;
        }
    }

    render() {
        let {data} = this.state;
        if (!data.name) {
            return <Loading/>
        }
        return (
            <div className="order-confirm">
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <img
                            src={require('../assets/images/test-car.png')}
                        />
                    </div>
                    <div className="order-sub-content">
                        <h1>{data.name}</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    预约时间：
                                </div>
                                <div className="order-s-date">
                                    {data.dateStr} | {this.state.dayMap[new Date(data.dateStr).getDay()]}
                                    <br/>{data.startHour}-{data.endHour} {/*<em>（2个小时）</em>*/}
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    场次编号：
                                </div>
                                <div className="order-s-date">
                                    {data.code}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="order-confirm-price">
                    <div className="order-price">
                        <p>¥{data.discountPrice}</p>
                        <p>
                            <del>¥ {data.price}</del>
                        </p>
                    </div>
                    <div className="order-count-time">

                    </div>
                </div>
                <div className="wanc-module">
                    <ul className="order-running-state">
                        <li>
                            <label>预约截止时间：</label>
                            <span>{data.applyEndTimeStr}</span>
                        </li>
                        <li>
                            <label>我的预约状态：</label>
                            <span className="highlight">{data.applyStatusStr}</span>
                        </li>
                    </ul>
                    <div className="order-running-agree">
                        {/* <Checkbox.AgreeItem>携带儿童 <span>(140cm以下)</span></Checkbox.AgreeItem>*/}
                        {this.props.match.params.type == 1 ?
                            <div></div>
                            :
                            <div className="subscribe-number">
                                <div>预约名额：（ 剩余名额: {data.remainUserNum} ）</div>
                                <div>
                                    <Stepper
                                        style={{width: '100%', minWidth: '100px'}}
                                        showNumber
                                        max={data.remainUserNum}
                                        min={1}
                                        value={this.state.person}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        }


                    </div>
                </div>
                {
                    data.specialDesc ? <div className="wanc-module">
                        <div className="order-running-other">
                            <span className="title">其他事项说明：</span>
                            <div className="description">
                                {data.specialDesc}
                            </div>
                            {/*<ol>
                            <li>1.如发生意外事件；</li>
                            <li>2.如提供免费午餐；</li>
                            <li>3.如预约试驾者可领取卡丁车优惠券；</li>
                            <li>4.其他其他其他；</li>
                        </ol>*/}
                        </div>
                    </div> : <div></div>
                }

                <div className="order-running-button">
                    {/*disabled={data.applyStatus ? 'disabled' : ''}*/}
                    <Button type="primary" disabled={data.canApply ? false : true} onClick={() => {
                        this.submit()
                    }}>立即预约</Button>
                </div>
            </div>
        )
    }
}