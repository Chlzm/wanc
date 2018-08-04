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
        this.state = {
            hasInfo: false,
            userInfo: null
        }
    }


    componentWillMount() {
        this.props.setTitle('个人中心');
        this.setUserInfoToState();
    }

    goAboutPage = () => {
        this.props.history.push({
            pathname: '/about'
        })
    }
    goFeedbackPage = () => {
        this.props.history.push({
            pathname: '/feedback'
        })
    }

    setUserInfoToState() {
        let strUserInfo = localStorage.getItem('wanchi-USER-INFO');
        if (strUserInfo) {
            let objUserInfo = JSON.parse(strUserInfo);
            this.setState({
                userInfo: objUserInfo
            })
        }
    }

    goModifyPasswordPage = () => {
        this.props.history.push({
            pathname: '/modify/password'
        })
    }
    goInformationPage = () => {
        this.props.history.push({
            pathname: '/information'
        })
    }
    goOrderPage = type => {
        this.props.history.push({
            pathname: `/order/mine/${type}`
        })
    }
    goLogin = () => {
        this.props.history.push({
            pathname: '/login'
        })
    }
    goRegister = () => {
        this.props.history.push({
            pathname: '/register'
        })
    }
    render() {
        let {userInfo} = this.state;
        return (
            <div className="wan-c-user mart70">
                <div className="user-head">
                    {
                        !userInfo ?
                            <div onClick={this.goInformationPage}>
                                <img src={userInfo.userHeadPic}/>
                                <div className="user-head-info">
                                    <span className="uhi-phone">{userInfo.username}</span>
                                    <span>已预约 356 次</span>
                                </div>
                            </div>
                            :
                            <div className="not_login">
                                <span onClick={this.goLogin}>登 录</span>
                                {/*<span onClick={this.goRegister}>注册</span>*/}
                            </div>
                    }

                </div>
                <div className="user-play-list">
                    <div onClick={() => {
                        this.goOrderPage('10')
                    }}>
                        <img src={require('../assets/images/icon-not-pay.png')}/>
                        未付款
                    </div>
                    <div onClick={() => {
                        this.goOrderPage('20')
                    }}>
                        <img src={require('../assets/images/icon-has-pay.png')}/>
                        已预约
                    </div>
                </div>
                <div className="user-control">
                    <List>
                        <List.Item extra="修改" arrow="horizontal" onClick={() => {
                        }}>
                            <img className="phone" src={require('../assets/images/icon-phone-2.png')} alt=""/>
                            <span>手机绑定</span>
                        </List.Item>
                        <List.Item extra="修改" arrow="horizontal" onClick={() => {
                            this.goModifyPasswordPage()
                        }}>
                            <img className="lock" src={require('../assets/images/icon-lock.png')} alt=""/>
                            <span>登录密码</span>
                        </List.Item>
                        <List.Item arrow="horizontal" onClick={() => {
                        }}>
                            <img className="lock" src={require('../assets/images/icon-connect.png')}/>
                            <span>联系客服</span>
                        </List.Item>
                        <List.Item arrow="horizontal" onClick={this.goFeedbackPage}>
                            <img className="lock" src={require('../assets/images/icon-pen.png')}/>
                            <span>意见反馈</span>
                        </List.Item>
                        <List.Item arrow="horizontal" onClick={this.goAboutPage}>
                            <img className="lock" src={require('../assets/images/icon-about.png')}/>
                            <span>关于万驰</span>
                        </List.Item>
                    </List>
                </div>
                <WCTabBar {...this.props}></WCTabBar>
            </div>
        )
    }
}