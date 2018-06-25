import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import * as headerActions from '../actions/header'
import {InputItem, Button} from 'antd-mobile';
import '../assets/css/forget.less';

import StepF from '../components/forget/StepFirst';
import StepS from '../components/forget/StepSecond';

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
export default class Index extends Component {
    constructor(options) {
        super(options);
    }

    state = {}

    componentWillMount(){
        this.props.setTitle('找回密码');
        // this.props.history.push({
        //     pathname: '/forget/step1'
        // })
    }
    componentDidMount() {
    }

    render() {
        let {location,match} = this.props;
        return (
            <div className="wan-c-forget">
                <Button type="primary">ssss</Button>
                <Switch key={location.pathname} location={location}>
                    <Route exact path={`${match.path}/step1`} component={StepF}></Route>
                    <Route exact path={`${match.path}/step2`} component={StepS}></Route>
                </Switch>
            </div>
        )
    }
}
