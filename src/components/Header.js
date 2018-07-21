import React, {Component} from 'react';
import routerParams from '../router-config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {NavBar, Icon, WhiteSpace, DatePicker, Button, List, InputItem} from 'antd-mobile';

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
        show: true
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

    componentDidMount() {
    }

    goNoticePage = () => {
        this.props.history.push({
            pathname: '/message'
        })
    }

    render() {
        let {pathname} = this.props.location;
        return (
            <div className="wan-c-header" style={{"display": this.state.show ? "block" : "none"}}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={pathname == '/mine' ? [
                        <Icon key="1" type="ellipsis" onClick={() => {
                            this.goNoticePage()
                        }}/>,
                    ] : []}
                >{this.props.state.header.title}</NavBar>
            </div>
        );
    }
}