import React, {Component} from 'react';

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

    goPage(pathname) {
        this.props.history.push({
            pathname
        });
    }

    render() {
        return (
            <div className="wc-tab-bar">
                <div className={this.props.match.url == '/' ? 'active' : ''} onClick={() => this.goPage('/')}>
                    {/*<i className="tab-icon icon-home">&nbsp;</i>*/}
                    <i className="icon iconfont icon-shouye-xianxing"></i>
                    <div>广场</div>
                </div>
                <div className={this.props.match.url.indexOf('/order/mine') > -1 ? 'active' : ''}
                     onClick={() => this.goPage('/order/mine')}>
                    {/*<i className="tab-icon icon-order">&nbsp;</i>*/}
                    <i className="icon iconfont icon-activity"></i>
                    <div>预约单</div>
                </div>
                <div className={this.props.match.url == '/mine' ? 'active' : ''} onClick={() => this.goPage('/mine')}>
                    {/*<i className="tab-icon icon-mine">&nbsp;</i>*/}
                    <i className="icon iconfont icon-guanyanren"></i>
                    <div>我的</div>
                </div>
            </div>
        );
    }
}