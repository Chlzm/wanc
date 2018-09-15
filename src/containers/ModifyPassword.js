import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {InputItem, Button} from 'antd-mobile';
import '../assets/css/forget.less';
import {modifyPassword} from "../api/modifyPassword";
import {Toast} from "antd-mobile/lib/index";

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
        oldPassword: '',
        newPassword: '',
        hasError: false,
        loading: false
    }

    componentWillMount() {
        this.props.setTitle('修改密码');
        // this.props.history.push({
        //     pathname: '/forget/step1'
        // })
    }

    componentDidMount() {
    }

    inputNumber = (value, type) => {
        let options = {}

        options[type] = value
        this.setState(options);
        if (type == "newPassword") {
            if (/^[1-9][0-9]{10}$/.test(value)) {
                this.setState({
                    hasError: false,
                })
            } else {
                this.setState({
                    hasError: true,
                });
            }
        }
    }

    checkPassword(value) {
        if (/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/.test(value)) {

        }
    }

    async submit() {
        this.setState({
            loading: true,
        });
        let ret = await modifyPassword({
            oldpassword: this.state.oldPassword,
            newpassword: this.state.newPassword,
        });
        this.setState({
            loading: false,
        });
        if(ret.code != "00000"){
            Toast.info(ret.msg);
            return;
        }
        Toast.info('修改成功')
        setTimeout(()=>{
            localStorage.clear();
            this.props.history.push({
                pathname: '/login'
            })
        },2000)

    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-forget">
                <ul>
                    {/* <li>
                        <InputItem type="phone" placeholder="请输入手机号" value={this.state.phone}
                                   onChange={(value) => {
                                       this.inputNumber(value, "phone")
                                   }}>请输入手机号:</InputItem>
                    </li>
                     <li className="column">
                        <div className="input-code">
                            <InputItem type="text" value={this.state.code} placeholder="短信验证码"
                                       onChange={(value) => {
                                           this.inputNumber(value, "code")
                                       }}></InputItem>
                        </div>
                        <div className="code-image" onClick={() => {
                            this.getCode()
                        }}>
                            <span>获取动态码</span>
                        </div>
                    </li>*/}
                    <li>
                        <InputItem type="password" placeholder="请输入旧密码" value={this.state.oldPassword}
                                   onChange={(value) => {
                                       this.inputNumber(value, "oldPassword")
                                   }}>请输入旧密码</InputItem>
                    </li>
                    <li>
                        <InputItem type="password" placeholder="请输入新密码"
                                   value={this.state.newPassword}
                                   onChange={(value) => {
                                       this.inputNumber(value, "newPassword")
                                   }}>请输入新密码</InputItem>
                    </li>
                    {/*<li className="note">
                        必须是6-20个英文字母、数字或符号（除空格）,且字母、数字和标点符号至少包含两种
                    </li>*/}
                    <li className="password-button">
                        <Button type="primary" loading={this.state.loading} onClick={() => {
                            this.submit()
                        }}>{this.state.loading ? '修改中...' : '修 改'}</Button>
                    </li>
                </ul>
            </div>
        )
    }
}
