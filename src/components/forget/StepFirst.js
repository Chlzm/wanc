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
            phone: '13818668621',
            code: ''
        }
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

    async next() {
        let ret = await validateCode({
            phone: this.state.phone,
            code: this.state.code
        });
        if(ret.body){
            localStorage.setItem("TEMP-CODE",ret.body)
            this.props.history.push({
                pathname:`/forget/step2`,
            });
        }
    }

    async getCode() {
        if (!this.state.phone) {
            Toast.info('请先输入手机号！', 1);
            return;
        }
        let ret = await getCode({
            phone: this.state.phone,
            doSendSMS: false
        });
        this.setState({
            code: ret.body
        })
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
                            <span>获取动态码</span>
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
