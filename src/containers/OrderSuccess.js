import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Icon} from 'antd-mobile';
import {getOrderDetail} from "../api/subscribe";
import Loading from '../components/Loading'
import '../assets/css/orderConfirm.less';
import '../assets/css/orderSuccess.less';
import QRCode from 'qrcode'

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
export default class OrderSuccess extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: null,
        imgHeight: 90,
        person: [],
        phone: '',
    }

    componentWillMount() {
        this.props.setTitle('预约详情');
        this.getOrderDetail(this.props.match.params.id);
        this.getPhone();
        //this.getPerson()
    }

    componentDidMount() {

    }

    updateCode() {
        if (this.state.data && this.state.data.successCode) {
            QRCode.toCanvas(document.getElementById('canvas'), this.state.data.successCode, function (error) {
                //if (error) console.error(error)
            })
        }
    }

    async getOrderDetail(orderId) {
        let ret = await getOrderDetail({orderId})
        this.setState({
            data: ret.body
        },()=>{
            this.updateCode();
        });
        /*if(ret.body.orderStatus == 82){
            this.props.setTitle('已取消');
        }else{
            this.props.setTitle('预约成功');
        }*/
    }

    getPhone() {
        let strUserInfo = localStorage.getItem("wanchi-USER-INFO");
        let objUserInfo = JSON.parse(strUserInfo)
        this.setState({
            phone: objUserInfo.username
        })
    }

    goApplyPage(id) {
        this.props.history.push({
            pathname: `/apply/${id}`
        })
    }

    render() {
        let {data} = this.state;
        if (!data) {
            return <Loading></Loading>
        }
        return (
            <div className="order-confirm order-success">
                {data.orderStatus == 20 ?
                    <div className="order-subscribe-congra">
                        <img src={require('../assets/images/pay-success.png')}/>
                    </div>
                    :
                    <div></div>
                }
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <img
                            src={data.activityImgUrl}
                        />
                    </div>
                    <div className="order-sub-content">
                        <h1>{data.activityName}</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    预约时间：
                                </div>
                                <div className="order-s-date">
                                    {data.activityDateStr} | {data.activityStartHour}-{data.activityEndHour}
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    场次编号：
                                </div>
                                <div className="order-s-date">{data.activityCode}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                {data.successCode ?
                    <div className="wanc-module">
                        <div className="wanc-module-title">
                            <span className="title">入场码</span>
                        </div>
                        <div className="wanc-module-content">
                            <div className={data.isVerified ? "join-code code-relative" : "join-code"}>
                                {data.isVerified ?
                                    <i className="icon-join-success"></i> : <span></span>
                                }

                                <canvas id="canvas" width="150" height="150"></canvas>
                                <div>{data.successCode}</div>
                                <div className="note">请在入场时出示（可在已预约的订单中查看）</div>
                            </div>
                        </div>
                    </div> :
                    <div></div>
                }


                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <span className="title">江苏万驰赛车场</span>
                        <a href="tel:18018066177" className="icon-phone">&nbsp;</a>
                    </div>
                </div>
                {data.s4applyDetail ?
                    <ul className="order-owner">
                        <li>
                            <h2>试驾信息</h2>
                        </li>
                        <li>
                            <div className="order-owner-label">联系人：</div>
                            <div className="order-owner-content">{data.s4applyDetail.applyUsername} {data.s4applyDetail.phone.replace(/\s/g,'')}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">预约单位：</div>
                            <div className="order-owner-content">{data.s4applyDetail.s4Name}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">试驾品牌：</div>
                            <div className="order-owner-content">{data.s4applyDetail.carbrandName}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">试驾车型：</div>
                            <div className="order-owner-content">{data.s4applyDetail.carmodel}</div>
                        </li>
                        <li>
                            <div className="order-owner-label">最少试驾人数：</div>
                            <div className="order-owner-content">{data.s4applyDetail.minUserCount}人</div>
                        </li>
                        <li>
                            <div className="order-owner-label">客户报名截止：</div>
                            <div className="order-owner-content">{data.s4applyDetail.applyEndTimeStr}</div>
                        </li>
                    </ul> :
                    <div></div>
                }

                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <span className="title">实付金额</span>
                        <span className="price">¥{data.paymoney}</span>
                    </div>
                    <div className="wanc-module-content">
                        <ul className="order-owner">
                            <li>
                                <div className="order-owner-label">订单编号：</div>
                                <div className="order-owner-content">{data.orderNo}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">订单状态：</div>
                                <div className="order-owner-content">{data.orderStatusStr}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">支付方式：</div>
                                <div className="order-owner-content">{data.paymethod || '未支付'}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">创建时间：</div>
                                <div className="order-owner-content">{data.orderCreateTimeStr}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">手机号码：</div>
                                <div className="order-owner-content">{this.state.phone}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">预约人数：</div>
                                <div className="order-owner-content">{data.applyNum}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    data.s4applyDetail ?
                        <div className="wanc-module" onClick={() => {
                            this.goApplyPage(data.applyId)
                        }}>
                            <div className="wanc-module-title">
                                <div className="wanc-module-text">
                                    <span className="title">已申请</span>
                                    {data.s4applyDetail.applyedUserList.map((v, i) => {
                                        return <img src={v.userHeadPic}/>
                                    })}
                                </div>
                                <Icon type="right"></Icon>
                            </div>
                        </div> :
                        <div></div>
                }

            </div>
        )
    }
}