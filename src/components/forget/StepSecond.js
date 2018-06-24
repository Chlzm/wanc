import React, {Component} from 'react'
import {InputItem, Button, Switch} from 'antd-mobile';

export default class Index extends Component {
    constructor(options) {
        super(options);
    }

    state = {
        checked: false
    }


    componentDidMount() {
    }

    changeChecked = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return (
            <div className="step2">
                <ul>
                    <li className="column">
                        <div className="input-code">
                            <InputItem type={this.state.checked ? 'text' : 'password'} placeholder="请输入新密码"></InputItem>
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
                        <Button type="primary">确 定</Button>
                    </li>
                </ul>
            </div>
        )
    }
}
