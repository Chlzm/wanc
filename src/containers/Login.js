import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Flex, Tabs, InputItem, Button, Toast} from 'antd-mobile';
import '../assets/css/login.less';
import cookie from 'cookie'

import * as loginAPI from '../api/login'

const tabs = [
    {title: '密码登录'},
    {title: '动态码登录'},
]
export default class Index extends Component {
    constructor(options) {
        super(options);
        this.state = {
            phone: "13818668621",
            password: '',
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

    inputPassword = password => {
        this.setState({
            password,
        })
    }

    async getCode() {
        if (!this.state.phone) {
            Toast.info('请先输入手机号！', 1);
            return;
        }
        let ret = await loginAPI.getCode({
            phone: this.state.phone,
            doSendSMS: false
        });
        this.setState({
            code: ret.body
        })
    }


    goForgetPage = () => {
        this.props.history.push({
            pathname: '/forget/step1'
        })
    }

    async login() {
        let ret = await loginAPI.login({
            phone: this.state.phone.replace(/\/s/g, ''),
            code: this.state.code
        });
        if (!ret.body) {
            return;
        }
        localStorage.setItem('wanchi-ACCESS-TOKEN', ret.body.accessToken)
        localStorage.setItem('wanchi-ACCESS-USER', ret.body.username)
        localStorage.setItem('wanchi-USER-INFO',JSON.stringify(ret.body))
        this.props.history.push({
            pathname: '/'
        })
    }

    async loginByPassword() {
        let ret = await loginAPI.accountLogin({
            username: this.state.phone.replace(/\/s/g, ''),
            password: this.state.password
        });
        if (!ret.body) {
            return;
        }
        localStorage.setItem('wanchi-ACCESS-TOKEN', ret.body.accessToken)
        localStorage.setItem('wanchi-ACCESS-USER', ret.body.username)
        localStorage.setItem('wanchi-USER-INFO',JSON.stringify(ret.body))
        this.props.history.push({
            pathname: '/'
        })
    }

    render() {
        return (
            <div className="wan-c-login">
                <div className="login">
                    <img src={require('../assets/images/logo.png')}/>
                </div>
                <div className="login-area">
                    <Tabs
                        className="login-area"
                        tabs={tabs}
                        initialPage={0}
                        onChange={(tab, index) => {
                            console.log('onChange', index, tab);
                        }}
                        onTabClick={(tab, index) => {
                            console.log('onTabClick', index, tab);
                        }}
                    >
                        <div className="login-content">
                            <Flex alignContent="start">
                                <Flex.Item className="login-icon">
                                    <img src={require('../assets/images/icon-phone.png')} width="100%"/>
                                </Flex.Item>
                                <Flex.Item>
                                    <InputItem placeholder="请输入手机号" type="phone" onChange={this.inputNumber}
                                               value={this.state.phone}></InputItem>
                                </Flex.Item>
                            </Flex>
                            <Flex alignContent="start">
                                <Flex.Item className="login-icon">
                                    <img src={require('../assets/images/icon-password.png')} width="100%"/>
                                </Flex.Item>
                                <Flex.Item>
                                    <InputItem type="password" placeholder="请输入密码"
                                               onChange={this.inputPassword}></InputItem>
                                </Flex.Item>
                            </Flex>
                            <div className="forget" onClick={this.goForgetPage}>忘记密码？</div>
                            <div className="password-login-button">
                                <Button type="primary" onClick={() => {
                                    this.loginByPassword()
                                }}>登录</Button>
                            </div>
                        </div>
                        <div className="login-content">
                            <Flex alignContent="start">
                                <Flex.Item className="login-icon">
                                    <img src={require('../assets/images/icon-phone.png')} width="100%"/>
                                </Flex.Item>
                                <Flex.Item>
                                    <InputItem placeholder="注册或绑定手机号" value={this.state.phone} type="phone"
                                               onChange={this.inputNumber}></InputItem>
                                </Flex.Item>
                            </Flex>
                            <Flex alignContent="start">
                                <Flex.Item className="login-icon">
                                    <img src={require('../assets/images/icon-password.png')} width="100%"/>
                                </Flex.Item>
                                <Flex.Item className="login-note">
                                    <InputItem placeholder="短信动态码" value={this.state.code}
                                               onChange={this.inputCode}></InputItem>
                                </Flex.Item>
                                <Flex.Item>
                                    <span class="login-note-button" onClick={() => {
                                        this.getCode()
                                    }}>短信动态码</span>
                                </Flex.Item>
                            </Flex>
                            <div className="forget">&nbsp;</div>
                            <div className="password-login-button">
                                <Button type="primary"
                                        onClick={() => {
                                            this.login()
                                        }}>登录</Button>
                            </div>
                            <div className="wan-c-service">
                                点击登录，即表示已阅读并同意
                                <Link to="#">《服务协议》</Link>

                            </div>
                        </div>
                    </Tabs>
                </div>

            </div>
        )
    }
}
