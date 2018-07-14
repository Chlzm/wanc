import React, {Component} from 'react'
import {InputItem, Button, Switch, Toast} from 'antd-mobile';
import {findPassword} from "../../api/forget";

export default class Index extends Component {
    constructor(options) {
        super(options);
        this.loading = false;
    }

    state = {
        checked: false,
        password: '',
    }


    componentDidMount() {
    }

    changeChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
    inputPassword = password => {
        this.setState({
            password,
        })
    }

    async submit() {
        if(this.loading){
            return;
        }
        if (!this.state.password) {
            Toast.info('请输入密码！');
            return;
        }
        this.loading = true
        let token = localStorage.getItem('TEMP-CODE');
        let ret = await findPassword({
            token,
            password: this.state.password
        })
        this.loading = true;
        Toast.info('修改成功！');
        setTimeout(() => {
            this.props.history.push({
                pathname: '/login'
            })
        }, 1000)
    }

    render() {
        return (
            <div className="step2">
                <ul>
                    <li className="column">
                        <div className="input-code">
                            <InputItem type={this.state.checked ? 'text' : 'password'} placeholder="请输入新密码"
                                       onChange={this.inputPassword}></InputItem>
                        </div>
                        <div className="code-image">
                            <Switch
                                checked={this.state.checked}
                                onClick={() => {
                                    this.changeChecked();
                                }}
                            />
                        </div>
                    </li>
                    <li className="password-button">
                        <Button type="primary" onClick={() => {
                            this.submit()
                        }}>确 定</Button>
                    </li>
                </ul>
            </div>
        )
    }
}
