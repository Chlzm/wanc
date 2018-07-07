import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {List, Picker, DatePicker} from 'antd-mobile';
import '../assets/css/basicInfo.less';


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

    state = {
        sexValue:['0'],
        sex : [
            [
                {
                    label: '男',
                    value: '0',
                },
                {
                    label: '女',
                    value: '1',
                },
            ]
        ],
        date:new Date('1983-11-10')
    }

    componentWillMount() {
        this.props.setTitle('基本信息');
    }

    componentDidMount() {
    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-information">

                <List>
                    <List.Item extra={<img src={require("../assets/images/icon-tx.png")} alt=""/>} arrow="horizontal">
                        头像
                    </List.Item>
                    <List.Item extra={"某某某"} arrow="horizontal">
                        昵称
                    </List.Item>
                    <Picker
                        data={this.state.sex}
                        title="性别"
                        cascade={false}
                        extra="姓别"
                        value={this.state.sexValue}
                        onChange={v => this.setState({ sexValue: v })}
                        onOk={v => this.setState({ sexValue: v })}
                    >
                        <List.Item arrow="horizontal">姓别</List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        title="选择生日"
                        extra="选择生日"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                </List>
            </div>
        )
    }
}
