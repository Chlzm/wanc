import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Button, List, InputItem, Icon, Stepper,DatePicker} from 'antd-mobile';
import '../assets/css/orderFill.less';

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

    state = {
        value: 3,
        time: new Date,
    }

    componentWillMount() {
        this.props.setTitle('填写预约单');
    }

    onChange = (value) => {
        this.setState({
            value,
        })
    }

    render() {
        return (
            <div className="order-fill">
                <div className="order-fill-info">
                    <div className="order-fill-des">
                        <h1>万驰赛车场试驾场次预约</h1>
                        <ul>
                            <li>试驾时间：2018-06-01 13:00-15:00 <em>（2个小时）</em></li>
                            <li>截止时间：2018-05-30 24:00</li>
                            <li>场次编号：SJ201805200001</li>
                        </ul>
                    </div>
                </div>
                <div className="order-fill-note">
                    <p>
                        请在截止日期前进行预约，如预约的场次因故取消，可申请
                        退款，请放心预约！
                    </p>
                </div>
                <div className="order-fill-module">
                    <List >
                        <InputItem placeholder="请输入4S店名称">4S店名称：</InputItem>
                    </List>
                    <List >
                        <InputItem placeholder="请输入预约人姓名">预约人：</InputItem>
                    </List>
                    <List >
                        <InputItem type="phone" placeholder="请输入联系方式">联系方式：</InputItem>
                    </List>
                </div>
                <div className="order-fill-module">
                    <div className="order-fill-title">
                        <span>试驾品牌</span>
                        <div>
                            <span>选择名牌</span>
                            <Icon type="right"></Icon>
                        </div>
                    </div>
                    <List >
                        <InputItem placeholder="多种车型，用逗号“，”隔开">试驾车型：</InputItem>
                    </List>
                    <List >
                        <List.Item extra={
                            <div className="order-fill-least">
                                <Stepper
                                    style={{width: '100%', minWidth: '100px'}}
                                    showNumber
                                    max={10}
                                    min={1}
                                    value={this.state.value}
                                    onChange={this.onChange}
                                />
                            </div>
                            }
                        >
                            人数要求：</List.Item>
                    </List>
                    <List>
                        <DatePicker
                            mode="datetime"
                            minuteStep={2}
                            value={this.state.time}
                            onChange={time => this.setState({ time })}
                        >
                            <List.Item >报名截止：</List.Item>
                        </DatePicker>
                    </List>
                    <div className="order-fill-submit">
                        <div className="order-fill-price">
                            ¥3000.00
                            <del>¥5000.00</del>
                        </div>
                        <div className="order-fill-sub-button">
                            <Button type="primary">立即预约</Button>
                        </div>
                    </div>
                   {/* <List>
                        <List.Item extra={
                            <Button type="primary">立即预约</Button>
                        }>
                            <span className="order-fill-price">¥3000.00</span>
                        </List.Item>
                    </List>*/}
                </div>
            </div>
        )
    }
}