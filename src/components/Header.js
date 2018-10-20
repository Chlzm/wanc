import React, {Component} from 'react';
import routerParams from '../router-config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {NavBar, Icon, Badge} from 'antd-mobile';
import {getNoticeCount} from "../api/message";

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
            case '/login':
                ret = false;
                break;
            default:
                break;
        }
        this.setState({
            show: ret
        });
    }

    componentWillMount() {
        this.setLeftIcon()
        this.getNoticeCount();
    }

    componentDidMount() {

    }

    async getNoticeCount() {
        let ret = await getNoticeCount();
        if (ret.code === "00000") {
            this.setState({
                count: ret.body
            })
        }
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
        } else {
            this.props.history.goBack()
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
                            {this.state.count == 0 ? <span></span> :
                                <Badge text={this.state.count} style={{marginLeft: 15}} overflowCount={9}/>}

                        </span>,
                    ] : []}
                >{this.props.state.header.title}</NavBar>
            </div>
        );
    }
}