import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {TextareaItem, Button} from 'antd-mobile';
import '../assets/css/feedback.less';


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
        this.props.setTitle('意见反馈');
    }
    componentDidMount() {
    }

    render() {
        let {location,match} = this.props;
        return (
            <div className="wan-c-feedback">
                <h1>感谢您的宝贵意见和建议，这将是我们不断改善与成长的动力！</h1>
                <TextareaItem placeholder="请输入您想反馈的问题…" rows={5} count={120}></TextareaItem>
                <div className="feedback-submit">
                    <Button type="primary">提交</Button>
                </div>
            </div>
        )
    }
}
