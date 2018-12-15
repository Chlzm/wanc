import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button} from 'antd-mobile';
import {getOrderDetail} from "../api/orderMine";
import Loading from '../components/Loading'
import '../assets/css/orderConfirm.less';
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
export default class OrderConfirm extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: ['1', '2', '3'],
        imgHeight: 90,
        detail: null
    }

    componentWillMount() {
        this.props.setTitle('确认订单');
        this.getDetail();
    }

    async getDetail() {
        let ret = {}
        if (this.props.match.params.type === "0") {
            let detail = await runningAPI.get4SDetail({
                id: this.props.match.params.id,
            });
            ret = JSON.parse(sessionStorage.getItem('fill'));
            ret = {
                body: {
                    ...detail.body,
                    ...ret,
                    isBusiness: true,
                }
            }
        } else {
            ret = await runningAPI.getConfirmDetail({
                id: this.props.match.params.id
            });
        }

        this.setState({
            detail: ret.body
        });

    }

    async submit() {
        // 防重复点击
        if (this.state.doSubmit) {
            return;
        }
        this.props.match.params.type === '0' ? this.makeForBusiness() : this.makeForOther()
    }

    async makeForOther() {
        let params = {
            id: this.props.match.params.id,
            usercount: this.props.match.params.person,
            paymoney: this.state.detail.discountPrice,
        }
        let ret = await runningAPI.activityApply(params);
        if (ret.code !== '00000') {
            return;
        }
        this.setState({
            doSubmit: false,
        }, () => {
            localStorage.setItem('flag', 1)
            this.props.history.push({
                pathname: `/order/pay/${ret.body.orderId}`
            });
        });
    }

    async makeForBusiness() {
        let fill = JSON.parse(sessionStorage.getItem('fill'));
        let params = {
            id: this.props.match.params.id,
            s4name: fill.s4name,
            applyusername: fill.applyusername,
            phone: fill.phone,
            carbrandid: fill.carbrandid,
            carmodel: fill.carmodel,
            usercount: fill.usercount,
            applyendtime: fill.applyendtime,
        }
        let ret = await runningAPI.apply4S(params);
        if (ret.code !== '00000') {
            return;
        }
        this.setState({
            doSubmit: false,
        }, () => {
            localStorage.setItem('flag', 1)
            this.props.history.push({
                pathname: `/order/pay/${ret.body.orderId}`
            });
        });
    }

    render() {
        const {detail} = this.state;
        if (!detail) {
            return <Loading></Loading>
        }
        return (
            <div className="order-confirm">
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <img src={detail.imgUrl}/>
                    </div>
                    <div className="order-sub-content">
                        <h1>{detail.name}</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    活动时间：
                                </div>
                                <div className="order-s-date">
                                    {detail.dateStr} &nbsp;
                                    {detail.startHour}-{detail.endHour}
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    场次编号：
                                </div>
                                <div className="order-s-date">
                                    {detail.code}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="order-confirm-price">
                    <div className="order-price">
                        <p>¥{detail.discountPrice}</p>
                        {/*<p>
                            <del>¥{detail.price}</del>
                        </p>*/}
                    </div>
                    <div className="order-count-time">
                        {/* <div className="order-c-tt">
                            预约倒计时
                        </div>
                        <div className="order-count-value">
                            2 天 23 : 58 : 29
                        </div>*/}
                    </div>
                </div>
                {detail && detail.isBusiness ?
                    <ul className="order-owner">
                        <li>
                            <div className="order-owner-label">联系人：</div>
                            <div
                                className="order-owner-content">{detail.name} {detail.phone.replace(/\s/g, '')}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">预约单位：</div>
                            <div className="order-owner-content">{detail.s4name}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">试驾品牌：</div>
                            <div className="order-owner-content">{detail.carbrandname}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">试驾车型：</div>
                            <div className="order-owner-content">{detail.carmodel}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">最少试驾人数：</div>
                            <div className="order-owner-content">{detail.usercount}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">客户报名截止：</div>
                            <div className="order-owner-content">{detail.applyEndTimeStr}</div>
                        </li>
                        {/* <li>
                        <div className="order-owner-label">订单金额：</div>
                        <div className="order-owner-content">¥{data.paymoney}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">订单状态：</div>
                        <div className="order-owner-content order-red">{data.orderStatusStr}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">支付方式：</div>
                        <div className="order-owner-content order-red">{data.paymethod ||'未支付'}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">创建时间：</div>
                        <div className="order-owner-content">{data.orderCreateTimeStr}</div>
                    </li>
                    <li>
                        <div className="order-owner-label">手机号码：</div>
                        <div className="order-owner-content">{userInfo.username}</div>
                    </li>*/}
                    </ul> : <div></div>
                }

                <div className="order-confirm-submit">
                    <div className="order-price">
                        总金额：<em>¥{detail.discountPrice}</em>
                    </div>
                    <div className="order-submit-button">
                        <Button type="primary" onClick={() => {
                            this.submit()
                        }}>提交订单</Button>
                    </div>
                </div>
            </div>
        )
    }
}