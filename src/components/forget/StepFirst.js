import React, {Component} from 'react'
import {Flex,InputItem, Button} from 'antd-mobile';



export default class Index extends Component {
    constructor(options) {
        super(options);
    }

    state = {}


    componentDidMount() {
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <InputItem type="phone" placeholder="请输入手机号"></InputItem>
                    </li>
                    <li className="column">
                        <div className="input-code">
                            <InputItem type="text" placeholder="请输入验证码"></InputItem>
                        </div>
                        <div className="code-image">
                            <img src={require('../../assets/images/code.jpg')}/>
                        </div>
                    </li>
                    <li className="column">
                        <div className="input-code">
                            <InputItem type="text" placeholder="短信验证码"></InputItem>
                        </div>
                        <div className="code-image">
                            <span>获取动态码</span>
                        </div>
                    </li>
                    <li className="password-button">
                        <Button type="primary">下 一 步</Button>
                    </li>
                </ul>
            </div>
        )
    }
}
