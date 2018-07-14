import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button, Carousel} from 'antd-mobile';
import '../assets/css/list.less';
import * as runningAPI from "../api/running";

function matchStateToProps(state) {
    //...
    return {
        state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...headerActions
    }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)
export default class Index extends Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: ['1', '2', '3'],
        imgHeight: 370,

    }

    componentWillMount() {
        this.props.setTitle('跑步预约');
        this.getRunningList();
    }

    componentDidMount() {
    }

    async getRunningList() {
        let ret = await runningAPI.getRunningList()
    }

    /**
     *
     * @param type 1:跑步,2：自行车，3：卡丁车，4：塞道
     * @param id
     */
    goDetail(type,id) {
        this.props.history.push({
            pathname: `/running/${type}/${id}`,
        })
    }

    render() {
        return (
            <div>
                <div className="home-banner">
                    <div className="running-subscribe-count">
                        已预约58场次，共39098090次
                    </div>
                    <div>
                        <img src="http://www.wanchiapi.com:8000/images/files/20180709/1552017t5buSfz.png" alt=""/>
                    </div>
                </div>
                <div className="list-stat">
                    <div className="running-describe">采用现场手机扫码方式入场</div>
                </div>
                <ul className="subscribe-list">
                    <li onClick={() => {
                        this.goDetail(1,22)
                    }}>
                        <div className="sl-date">
                            <div className="date">6月1日</div>
                            <div className="year">2018年</div>
                        </div>
                        <div className="sl-time">
                            <div className="sl-hours">9:00-11:00 <span>(2个小时)</span></div>
                            <div className="sl-end">截止5月30日</div>
                        </div>
                        <div className="sl-price">
                            <b>￥10000.00</b>
                            <del>￥30000.00</del>
                            <Button type="primary">预约</Button>
                        </div>
                    </li>
                    <li className="disabled">
                        <div className="sl-date">
                            <div className="date">6月1日</div>
                            <div className="year">2018年</div>
                        </div>
                        <div className="sl-time">
                            <div className="sl-hours">9:00-11:00 <span>(2个小时)</span></div>
                            <div className="sl-end">截止5月30日</div>
                        </div>
                        <div className="sl-price">
                            <b>￥10000.00</b>
                            <del>￥30000.00</del>
                            <Button type="primary">预约</Button>
                        </div>
                    </li>
                    <li className="disabled">
                        <div className="sl-date">
                            <div className="date">6月1日</div>
                            <div className="year">2018年</div>
                        </div>
                        <div className="sl-time">
                            <div className="sl-hours">9:00-11:00 <span>(2个小时)</span></div>
                            <div className="sl-end">截止5月30日</div>
                        </div>
                        <div className="sl-price">
                            <b>￥10000.00</b>
                            <del>￥30000.00</del>
                            <Button type="primary">预约</Button>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
