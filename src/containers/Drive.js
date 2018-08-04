import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button, Modal, Toast} from 'antd-mobile';
import Loading from '../components/Loading'
import * as driveAPI from "../api/drive";
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
        imgHeight: 90,
        data: null
    }

    componentWillMount() {
        this.props.setTitle('试驾预约');
        this.getTryDrive();
    }

    async getTryDrive() {
        let ret = await driveAPI.getTryDriveDetail({
            id: this.props.match.params.id,
        })
        this.setState({
            data: ret.body
        })
    }

    tryDrive() {
        Modal.alert('确定本次预约？', '', [
            {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
            {
                text: '确定', onPress: () => {
                    driveAPI.tryDrive({
                        's4id': this.props.match.params.id,
                    }).then(ret => {
                        Toast.info('预约成功！');
                        this.getTryDrive();
                    })
                }
            },
        ]);
    }

    render() {
        let {data} = this.state;
        if (!data) {
            return <Loading></Loading>
        }
        return (
            <div className="order-confirm order-success">
                <div className="order-subscribe-info">
                    <div className="order-sub-img">
                        <img src={data.carbrandUrl}/>
                    </div>
                    <div className="order-sub-content">
                        <h1>{data.name}</h1>
                        <ul>
                            <li>
                                <div className="order-s-label">
                                    试驾时间：
                                </div>
                                <div className="order-s-date">
                                    {data.activityDateStr} {data.activityStartHour}-{data.activityEndHour}
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    试驾人数：
                                </div>
                                <div className="order-s-date">{data.minUserCount}人以上
                                    （已约：<em>{data.applyedUserCount}</em>人）
                                </div>
                            </li>
                            <li>
                                <div className="order-s-label">
                                    车辆来源：
                                </div>
                                <div className="order-s-date">
                                    {data.carbrandName}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wanc-module">
                    <div className="wanc-module-title">
                        <span className="title">预约信息</span>
                        <a href={`tel:` + data.phone} className="icon-phone">&nbsp;</a>
                    </div>
                    <div className="wanc-module-content">
                        <ul className="order-owner">
                            <li>
                                <div className="order-owner-label">预约截止时间：</div>
                                <div className="order-owner-content">{data.applyEndTimeStr}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">我的预约状态：</div>
                                <div className="order-owner-content">
                                    <em>{data.userStatusStr}</em> {/*<em className="blue">未预约</em>*/}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">联系人：</div>
                                <div className="order-owner-content">{data.applyUsername}</div>
                            </li>
                            <li>
                                <div className="order-owner-label">联系方式：</div>
                                <div className="order-owner-content">{data.phone}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wanc-module">
                    <div className="order-running-other">
                        <span className="title">其他事项说明</span>
                        <ol>
                            <li>1.如发生意外事件；</li>
                            <li>2.如提供免费午餐；</li>
                            <li>3.如预约试驾者可领取卡丁车优惠券；</li>
                            <li>4.其他其他其他；</li>
                        </ol>
                    </div>
                </div>
                <div className="order-running-button">
                    <Button type="primary" disabled={data.userStatus == 20 ? true : false} onClick={() => {
                        this.tryDrive()
                    }}>{data.userStatus == 20 ? "您已预约" : "我要试驾"}</Button>
                </div>
            </div>
        )
    }
}