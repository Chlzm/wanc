import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {InputItem, Button} from 'antd-mobile';
import '../assets/css/forget.less';
import {validateCode, modifyPhone} from "../api/modifyPassword";
import * as loginAPI from "../api/login";
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
        phone: '',
        newPhone: '',
        code: null,
        token: null,
        hasError: false,
        loading: false,
        text: '获取动态码',
        disabled: false,
    }

    componentWillMount() {
        this.props.setTitle('修改手机绑定');
        this.initPhone();
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

    initPhone = () => {
        let strInfo = localStorage.getItem('wanchi-ACCESS-USER')
        this.setState({
            phone: strInfo,
        })
    }

    async getCode() {
        let ret = await loginAPI.getCode({
            phone: this.state.phone,
            doSendSMS: true
        });
        this.countdown();
    }

    validate() {
        if (this.state.newPhone == '') {
            Toast.info('请输入新的手机号码', 2);
            return false;
        } else if (!/^1\d{10}$/.test(this.state.newPhone.replace(/\s/g, ''))) {
            Toast.info('新的手机号码格式不正确', 2);
            return false;
        }
        return true;

    }

    countdown(seconds = 60) {
        if (this.state.disabled) {
            return;
        }
        this.setState({
            disabled: true
        })
        var loop;
        clearInterval(loop);
        let i = 0;
        loop = setInterval(() => {
            i++;
            seconds = seconds - 1
            if (seconds == 0) {
                clearInterval(loop);
                this.setState({
                    disabled: false,
                    text: '重新发送'
                });
                return;
            }
            this.setState({
                sec: seconds,
                text: `${seconds}秒后重新发送` //后重新发送
            });
        }, 1000)
    }

    async submit() {
        if (!this.validate()) {
            return;
        }
        this.setState({
            loading: true,
        });
        let result = await validateCode({
            phone: this.state.phone,
            code: this.state.code,
        });
        this.setState({
            token: result.body,
        });
        let ret = await modifyPhone({
            token: result.body,
            newphone: this.state.newPhone.replace(/\s/g, ''),
        });
        this.setState({
            loading: false,
        });
        if (ret.code != "00000") {
            Toast.info(ret.msg, 2);
            return;
        }
        Toast.info('修改成功', 2)
        setTimeout(() => {
            localStorage.clear();
            this.props.history.push({
                pathname: '/login'
            })
        }, 2000)

    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-forget">
                <ul>
                    <li className="phone-note">请输入 {this.state.phone} 收到的短信验证码</li>
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
                            <span style={{"color": this.state.disabled ? "#ccc" : "#be2721"}}>{this.state.text}</span>
                        </div>
                    </li>
                    <li>

                        <InputItem labelNumber={6} type="phone" placeholder="请输入新的手机号码" value={this.state.newPhone}
                                   onChange={(value) => {
                                       this.inputNumber(value, "newPhone")
                                   }}></InputItem>
                    </li>
                    <li className="password-button">
                        <Button type="primary" disabled={this.state.loading} loading={this.state.loading} onClick={() => {
                            this.submit()
                        }}>修 改</Button>
            </li>
                </ul>
            </div>
        )
    }
}
