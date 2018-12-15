import React, {Component} from 'react';
import routerParams from '../router-config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import * as messageActions from '../actions/message'
import {NavBar, Icon, Badge} from 'antd-mobile';
import {isLogin} from "../api/login";
import pubsub from '../util/pubsub'
import {isAPP, isWeiXin} from '../util/util'

function matchStateToProps(state) {
    //...
    return {
        state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...headerActions,
        ...messageActions,
    }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)
export default class WCTabBar extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        title: routerParams[this.props.location.pathname] ? routerParams[this.props.location.pathname].title : "万驰",
        show: true,
        leftIcon: <Icon type="left"/>,
        showLeftIcon: true,
        count: 0,
    }

    componentWillMount() {
        let ret = true;
        switch (this.props.location.pathname) {
            case '/login1':
                ret = false;
                break;
            default:
                break;
        }
        ret = !isWeiXin();
        this.setState({
            show: ret
        });
        this.setLeftIcon()
        this.getNoticeCount();
    }

    setPopState() {
        if (isAPP()) {
            return;
        }
        window.addEventListener("popstate", function () {
            if (location.search.indexOf('pay_success') !== -1) {
                window.history.forward(1);
            }
        }, false);
        window.history.pushState('forward', null, '#');
        window.history.forward(1);
    }

    componentDidMount() {
        pubsub.subscribe('gotoLogin', (data) => {
            this.props.history.replace({
                pathname: '/login'
            });
        });
        this.setPopState();

    }

    async getNoticeCount() {
        let ret = await isLogin();
        if (ret.body === false) {
            return;
        }
        this.props.setMessageCount()
        /*let ret = await getNoticeCount();
        if (ret.code === "00000") {
            this.setState({
                count: ret.body
            })
        }*/
    }

    goNoticePage = () => {
        this.props.history.push({
            pathname: '/message'
        })
    }

    setLeftIcon() {
        let path = this.props.location.pathname;
        if (path == "/" || path == "/order/mine" || path == "/mine") {
            this.setState({
                showLeftIcon: false,
                leftIcon: <div></div>
            });
        } else {
            this.setState({
                showLeftIcon: true,
                leftIcon: <Icon type="left"/>
            })
        }
    }

    onLeftClick = e => {
        if (!this.props.state.header.showLeftIcon) {
            return;
        }
        if (location.search.indexOf('message') > -1) {
            this.props.history.go(-2);
            return;
        }
        switch (this.props.history.location.pathname) {
            case '/information':
                this.props.history.replace({
                    pathname: '/mine'
                });
                break;
            case '/order/mine':
                if (location.search.indexOf('pay_success') !== -1) {
                    location.history.forward(1);
                }
                break;
            default:
                this.props.history.goBack();
                break;
        }

    }

    render() {
        let {pathname} = this.props.location;
        return (
            <div className="wan-c-header" style={{"display": this.state.show ? "block" : "none"}}>
                <NavBar
                    mode="light"
                    icon={this.props.state.header.leftIcon}
                    onLeftClick={this.onLeftClick}
                    rightContent={pathname == '/mine' ? [
                        <span className="icon-message" onClick={() => {
                            this.goNoticePage()
                        }}>
                            {this.props.state.message.count == 0 ? <span></span> :
                                <Badge text={this.props.state.message.count} style={{marginLeft: 15}}
                                       overflowCount={9}/>}

                        </span>,
                    ] : []}
                >{this.props.state.header.title}</NavBar>
            </div>
        );
    }
}