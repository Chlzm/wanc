import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Flex,Tabs, InputItem, Button} from 'antd-mobile';
import '../assets/css/login.less';

const tabs = [
    {title: '密码登录'},
    {title: '动态码登录'},
]
export default class Index extends Component {
    constructor(options) {
        super(options);
    }

    state = {}


    componentDidMount() {
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
                        initialPage={1}
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
                                    <InputItem placeholder="请输入手机号" type="phone"></InputItem>
                                </Flex.Item>
                            </Flex>
                            <Flex alignContent="start">
                                <Flex.Item className="login-icon">
                                    <img src={require('../assets/images/icon-password.png')} width="100%"/>
                                </Flex.Item>
                                <Flex.Item>
                                    <InputItem placeholder="请输入密码"></InputItem>
                                </Flex.Item>
                            </Flex>
                            <div className="forget">忘记密码？</div>
                            <div className="password-login-button">
                                <Button type="primary">登录</Button>
                            </div>
                        </div>
                        <div className="login-content">
                            <Flex alignContent="start">
                                <Flex.Item className="login-icon">
                                    <img src={require('../assets/images/icon-phone.png')} width="100%"/>
                                </Flex.Item>
                                <Flex.Item>
                                    <InputItem placeholder="注册或绑定手机号" type="phone"></InputItem>
                                </Flex.Item>
                            </Flex>
                            <Flex alignContent="start">
                                <Flex.Item className="login-icon">
                                    <img src={require('../assets/images/icon-password.png')} width="100%"/>
                                </Flex.Item>
                                <Flex.Item className="login-note">
                                    <InputItem placeholder="短信动态码"></InputItem>
                                </Flex.Item>
                                <Flex.Item>
                                    <span class="login-note-button">短信动态码</span>
                                </Flex.Item>
                            </Flex>
                            <div className="forget">&nbsp;</div>
                            <div className="password-login-button">
                                <Button type="primary" onClick={()=>this.props.history.push({pathname:'/'})}>登录</Button>
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
