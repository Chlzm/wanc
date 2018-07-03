import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {List, Icon} from 'antd-mobile';
import WCTabBar from '../components/TabBar';
import '../assets/css/userCenter.less';

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


    componentWillMount() {
        this.props.setTitle('个人中心');
    }

    render() {
        return (
            <div className="wan-c-user">
                <div className="user-head">
                    <img src={require('../assets/images/icon-tx.png')}/>
                    <div className="user-head-info">
                        <span className="uhi-phone">138****8888</span>
                        <span>已预约356次</span>
                    </div>
                </div>
                <div className="user-nav">
                    <span className="title">会员中心</span>
                    <Icon type="right"></Icon>
                </div>
                <div className="user-play-list">
                    <div>
                        <img src={require('../assets/images/icon-not-pay.png')} />
                        未付款
                    </div>
                    <div>
                        <img src={require('../assets/images/icon-has-pay.png')} />
                        已付款
                    </div>
                </div>
                <div className="user-control">
                    <List>
                        <List.Item extra="修改" arrow="horizontal" onClick={() => {}}>
                            <img className="phone" src={require('../assets/images/icon-phone-2.png')} alt=""/>
                            <span>手机绑定</span>
                        </List.Item>
                        <List.Item extra="修改" arrow="horizontal" onClick={() => {}}>
                            <img className="lock" src={require('../assets/images/icon-lock.png')} alt=""/>
                            <span>登录密码</span>
                        </List.Item>
                        <List.Item arrow="horizontal" onClick={() => {}}>
                            <img className="lock" src={require('../assets/images/icon-connect.png')} />
                            <span>联系客服</span>
                        </List.Item>
                        <List.Item arrow="horizontal" onClick={() => {}}>
                            <img className="lock" src={require('../assets/images/icon-pen.png')} />
                            <span>意见反馈</span>
                        </List.Item>
                        <List.Item arrow="horizontal" onClick={() => {}}>
                            <img className="lock" src={require('../assets/images/icon-about.png')} />
                            <span>关于万驰</span>
                        </List.Item>
                    </List>
                </div>
                <WCTabBar {...this.props}></WCTabBar>
            </div>
        )
    }
}