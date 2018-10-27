import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Flex, Tabs, InputItem, Button, Toast} from 'antd-mobile';
import '../assets/css/login.less';
import * as loginAPI from '../api/login'
import * as messageActions from "../actions/message";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {isLogin} from "../api/login";

const tabs = [
    {title: '密码登录'},
    {title: '动态码登录'},
]

function matchStateToProps(state) {
    //...
    return {
        state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...messageActions,
    }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)
export default class Login extends Component {
    constructor(options) {
        super(options);
        this.state = {
            phone: "",
            password: '',
            code: '',
            text: '短信动态码',
            disabled: false,
            sec: 0,
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

    countdown(seconds = 60) {
        if(this.state.disabled){
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
                text: `${seconds}秒后重新发送`
            });
        }, 1000)
    }

    async getCode() {
        if (!this.state.phone) {
            Toast.info('请先输入手机号！', 1);
            return;
        }
        if(!/^\d{11}$/.test(this.state.phone.replace(/\s/g,''))){
            Toast.info('请输入合法手机号码！', 1);
            return;
        }
        let ret = await loginAPI.getCode({
            phone: this.state.phone.replace(/\s/g, ''),
            doSendSMS: true
        });
        if(ret.code !== "00000"){
            return;
        }
        this.countdown();
    }


    goForgetPage = () => {
        this.props.history.push({
            pathname: '/forget/step1'
        })
    }

    async login() {

        if(!this.state.phone){
            Toast.info('请先输入手机号！', 1);
            return;
        }
        if(!this.state.code){
            Toast.info('请先输入密码！', 1);
            return;
        }
        let ret = await loginAPI.login({
            phone: this.state.phone.replace(/\s/g, ''),
            code: this.state.code
        });
        if (!ret.body) {
            return;
        }
        localStorage.setItem('wanchi-ACCESS-TOKEN', ret.body.accessToken)
        localStorage.setItem('wanchi-ACCESS-USER', ret.body.username)
        localStorage.setItem('wanchi-USER-INFO', JSON.stringify(ret.body));
        this.props.history.push({
            pathname: '/'
        });
        /*let result = await isLogin();
        if(result.body === false){
            return;
        }
        this.props.setMessageCount()*/

    }

    async loginByPassword() {
        if(!this.state.phone){
            Toast.info('请先输入手机号！', 1);
            return;
        }

        if(!this.state.password){
            Toast.info('请先输入密码！', 1);
            return;
        }
        let ret = await loginAPI.accountLogin({
            username: this.state.phone.replace(/\s/g, ''),
            password: this.state.password
        });
        if (!ret.body) {
            return;
        }
        localStorage.setItem('wanchi-ACCESS-TOKEN', ret.body.accessToken);
        localStorage.setItem('wanchi-ACCESS-USER', ret.body.username);
        localStorage.setItem('wanchi-USER-INFO', JSON.stringify(ret.body));
        this.props.history.push({
            pathname: '/'
        });
        /*let result = await isLogin();
        if(result.body === false){
            return;
        }
        this.props.setMessageCount()*/

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
                            <div className="wan-c-service">
                                点击登录，即表示已阅读并同意
                                <Link to="/service">《服务协议》</Link>
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
                                    <span class="login-note-button"
                                          style={{"color": this.state.disabled ? "#ccc" : "#be2721"}} onClick={() => {
                                        this.getCode()
                                    }}>{this.state.text}</span>
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
                                <Link to="/service">《服务协议》</Link>
                            </div>
                        </div>
                    </Tabs>
                </div>

            </div>
        )
    }
}
