import React, {Component} from 'react';
import { TabBar, ListView } from 'antd-mobile';
export default class WCTabBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
        };
    }

    render() {
        return (
            <div className="wc-tab-bar">
                <div>
                    <i className="tab-icon icon-home">&nbsp;</i>
                    <div>广场</div>
                </div>
                <div>
                    <i className="tab-icon icon-order">&nbsp;</i>
                    <div>订单</div>
                </div>
                <div>
                    <i className="tab-icon icon-mine">&nbsp;</i>
                    <div>我的</div>
                </div>
            </div>
        );
    }
}