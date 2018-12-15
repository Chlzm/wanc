import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button, Carousel, Icon} from 'antd-mobile';
import '../assets/css/list.less';
import {getTrackList} from "../api/running";
import format from "format-datetime";
import {isWeiXin} from "../util/util";

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
        data: {
            activitys: []
        },
        style: isWeiXin() ? {'marginTop': 0} : {}
        imgHeight: 176,

    }

    componentWillMount() {
        this.props.setTitle('试驾场次预约');
        this.getList();
    }

    componentDidMount() {
    }

    async getList() {
        let ret = await getTrackList();
        this.setState({
            data: ret.body
        })
    }

    /**
     *
     * @param type
     * @param id
     */
    goDetail(type, id) {
        this.props.history.push({
            pathname: `/subscribe/running/detail/${type}/${id}`,
        })
    }

    render() {
        alert(this.state.style)
        return (
            <div className="home-wrap" style={{...this.state.style}}>
                <div className="home-banner">
                    <Carousel
                        autoplay
                        infinite
                    >
                        {this.state.data.activitys.map(val => (
                            <img
                                src={require('../assets/images/car.jpg')}
                                alt=""
                                style={{width: '100%', verticalAlign: 'top'}}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({imgHeight: 'auto'});
                                }}
                            />
                        ))}
                    </Carousel>
                </div>
                <div className="list-stat">
                    <div className="list-stat-title">万驰赛车场试驾场次预约</div>
                    <div className="list-stat-count">
                        已预约<b> {this.state.data.activityCount} </b>场次
                    </div>
                </div>
                {!this.state.data.activitys.length ?
                    <div style={{textAlign: 'center'}}>
                        <Icon type="loading"></Icon>
                    </div>
                    :
                    <ul className="subscribe-list">
                        {this.state.data.activitys.map((item, i) => (
                            <li className="disabled" onClick={() => {
                                this.goDetail(4, item.id)
                            }}>
                                <div className="sl-date">
                                    <div className="date">{format(new Date(item.date), 'M/d')}</div>
                                    <div className="year">{format(new Date(item.date), 'yyyy')}年</div>
                                </div>
                                <div className="sl-time">
                                    <div className="sl-hours">{item.startHour}-{item.endHour}
                                        <br/><span>{item.applyNum} 个小时</span></div>
                                    <div className="sl-end">截止{format(new Date(item.applyEndTimeStr), 'M月d日')}</div>
                                </div>
                                <div className="sl-price">
                                    <b>￥{item.discountPrice}</b>
                                    <del>￥{item.price}</del>
                                    <Button type="primary">预约</Button>
                                </div>
                            </li>
                        ))}
                    </ul>}
            </div>
        )
    }
}
