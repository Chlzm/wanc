import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {TextareaItem, Button} from 'antd-mobile';
import {submitFeedback} from "../api/feedback";
import {Toast} from 'antd-mobile'
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
export default class Feedback extends Component {
    constructor(options) {
        super(options);
    }

    state = {
        value: ''
    }

    componentWillMount() {
        this.props.setTitle('意见反馈');
    }

    componentDidMount() {
    }

    onChange = value => {
        this.setState({
            value,
        })
    }

    async submit() {
        this.setState({
            loading: true,
        })
        let ret = await submitFeedback({
            content: this.state.value
        });
        this.setState({
            loading: false,
        })
        if (ret.code == '00000') {
            Toast.info('反馈成功');
            setTimeout(() => {
                this.props.history.push({
                    pathname: '/mine'
                })
            }, 1000)
        }

    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-feedback">
                <h1>感谢您的宝贵意见和建议，这将是我们不断改善与成长的动力！</h1>
                <TextareaItem onChange={this.onChange} value={this.state.value} placeholder="请输入您想反馈的问题…" rows={5}
                              count={120}></TextareaItem>
                <div className="feedback-submit">
                    <Button disabled={!this.state.value.length ? true : false} type="primary"
                            loading={this.state.loading} onClick={() => {
                        this.submit()
                    }}>{this.state.loading ? '提交中...' : '提交'}</Button>
                </div>
            </div>
        )
    }
}
