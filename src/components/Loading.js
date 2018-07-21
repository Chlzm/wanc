import React, {Component} from 'react';
import {Icon} from 'antd-mobile'

export default class WCTabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="wc-loading">
                <Icon type="loading" size="lg">Loading...</Icon>
            </div>
        );
    }
}