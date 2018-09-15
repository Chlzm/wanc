import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import '../assets/css/about.less';
import {Button} from "antd-mobile"
import qc from '../util/qiancheng'
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
export default class AppPay extends Component {
    constructor(options) {
        super(options);
    }

    componentWillMount() {
        this.props.setTitle('支付');
    }

    componentDidMount() {

    }

    pay() {
        qc.track('alipay', {
            orderinfo: '123456yyy'
        }).then(response => {
            let {inAppResult} = response.data
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-about">
                <Button type="primary" onClick={()=>{
                    this.pay()
                }}>支付</Button>
            </div>
        )
    }
}
