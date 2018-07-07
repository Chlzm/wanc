import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {List, InputItem,Button} from 'antd-mobile';
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

    }

    componentWillMount() {
        this.props.setTitle('修改昵称');
    }

    componentDidMount() {
    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-information">
                <List>
                    <InputItem clear value={"刘立"}>
                        昵称
                    </InputItem>
                </List>
                <div className="nickname-submit">
                    <Button type="primary">保存</Button>
                </div>
            </div>
        )
    }
}
