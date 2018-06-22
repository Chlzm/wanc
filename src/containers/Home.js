import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../actions/main'
import {Flex, WhiteSpace, DatePicker, Button, List, InputItem} from 'antd-mobile';

function matchStateToProps(state) {
    //...
    return {
        state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...homeActions
    }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)
export default class List1 extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        value: null
    }

    cancel = () => {
        this.props.cancelTask3();
        // this.props.history.push({
        //     pathname: '/list'
        // })
    }
    triggerTakeExample = () => {
        this.props.triggerTakeExample(2);
    }
    onChange = (value) =>{
        this.props.onChange(value)
        //this.props.userInput(value);
    }
    render() {
        return (
            <div>
                <div>
                    <Button type="primary" onClick={() => {
                        this.cancel()
                    }}>阻断</Button>
                </div>
                <WhiteSpace></WhiteSpace>
                <div>
                    <Button type="primary" onClick={() => {
                        this.triggerTakeExample()
                    }}>Take</Button>
                </div>
                <div>
                    <InputItem type="number" placeholder="请输入数字" clear onChange={(value) => {
                        this.onChange(value)
                    }}>
                        电话
                    </InputItem>
                    <div>{JSON.stringify(this.props.state.GetExam.data)}</div>
                </div>
                <h1 align="center">
                    {String(!!this.props.state.GetExam.value)}
                </h1>
                {/* <DatePicker model="date" value={new Date}>
                    <List.Item arrow="horizontal">Datetime</List.Item>
                </DatePicker>*/}
            </div>
        )
    }
}