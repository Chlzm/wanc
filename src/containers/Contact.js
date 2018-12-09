import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {List} from 'antd-mobile';
import '../assets/css/service.less';


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

    componentWillMount(){
        this.props.setTitle('联系客服');
    }
    componentDidMount() {
    }

    render() {
        let {location,match} = this.props;
        return (
            <div className="wan-c-service">
                <List className="my-list">
                    <List.Item extra={'wantrack'}>微信服务号：</List.Item>
                </List>
                <List className="my-list">
                    <List.Item extra={<a href="tel:18018066177">18018066177</a>}>客服电话：</List.Item>
                </List>
            </div>
        )
    }
}
