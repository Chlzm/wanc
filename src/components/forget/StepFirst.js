import React, {Component} from 'react'
import {Flex, InputItem, Button} from 'antd-mobile';
import {getCode} from "../../api/login";
import * as loginAPI from "../../api/login";
import {validateCode} from "../../api/forget";
import {Toast} from "antd-mobile/lib/index";

export default class Index extends Component {
    constructor(options) {
        super(options);
        this.state = {
            phone: '',
            code: '',
            text: '获取动态码',
            disabled: false,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    inputNumber = phone => {
        this.setState({
            phone
        })
    }

    inputCode = code => {
        this.setState({
            code
        })
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

    async next() {
        let ret = await validateCode({
            phone: this.state.phone.replace(/\s/g, ''),
            code: this.state.code
        });
        if (ret.body) {
            localStorage.setItem("TEMP-CODE", ret.body)
            this.props.history.push({
                pathname: `/forget/step2`,
            });
        }
    }

    async getCode() {
        if (!this.state.phone) {
            Toast.info('请先输入手机号！', 1);
            return;
        }
        let ret = await getCode({
            phone: this.state.phone.replace(/\s/g, ''),
            doSendSMS: true
        });
        this.countdown();
        // this.setState({
        //     code: ret.body
        // })
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <InputItem type="phone" placeholder="请输入手机号" value={this.state.phone}
                                   onChange={this.inputNumber}></InputItem>
                    </li>
                    {/* <li className="column">
                        <div className="input-code">
                            <InputItem type="text" placeholder="请输入验证码"></InputItem>
                        </div>
                        <div className="code-image">
                            <img src={require('../../assets/images/code.jpg')}/>
                        </div>
                    </li>*/}
                    <li className="column">
                        <div className="input-code">
                            <InputItem type="text" value={this.state.code} placeholder="短信验证码"
                                       onChange={this.inputCode}></InputItem>
                        </div>
                        <div className="code-image" onClick={() => {
                            this.getCode()
                        }}>
                            <span style={{"color": this.state.disabled ? "#ccc" : "#be2721"}}>{this.state.text}</span>
                        </div>
                    </li>
                    <li className="password-button">
                        <Button type="primary" onClick={() => {
                            this.next()
                        }}>下 一 步</Button>
                    </li>
                </ul>
            </div>
        )
    }
}
