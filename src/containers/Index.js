import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Carousel} from 'antd-mobile';
import WCTabBar from '../components/TabBar';
import Loading from '../components/Loading'
import * as homeApi from "../api/home";

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
        banners: [],
        driveList: [],
        fourS: [],
        imgHeight: 176,

    }


    componentWillMount() {
        this.props.setTitle("预约广场",false,<div></div>);
        this.getBanner();
        this.getDriveList();
    }

    componentDidMount() {
    }

    async getBanner() {
        let ret = await homeApi.getCycleList();
        this.setState({
            banners: ret.body
        })

    }

    async getCycle() {
        let ret = await homeApi.getCycleList();
        debugger;
    }

    async get4SList() {
        let ret = await homeApi.get4SList();
    }

    async getDriveList() {
        let ret = await homeApi.getDriveList();
        this.setState({
            driveList: ret.body
        })
    }

    goDetail(id) {
        this.props.history.push({
            pathname: `/drive/${id}`,
        })
    }

    render() {
        return (
            <div className="mart70 home-wrap">
                <div className="home-banner">
                    <Carousel
                        autoplay
                        infinite
                    >
                        {this.state.banners.map(item => (
                            <img
                                src={item.imgUrl}
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
                <div className="home-module">
                    <h2 className="home-m-title">
                        <span className="symbol">/</span><span className="text">抢先预约</span><span
                        className="symbol">/</span>
                    </h2>
                    <div className="home-m-content">
                        <Flex>
                            <Flex.Item>
                                {/*跑步预约*/}
                                <a href="javascript:void(0)" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/subscribe/1'
                                    })
                                }}>
                                    <img src={require('../assets/images/s01.jpg')} className="sub-item-image"/>
                                </a>
                                <div className="item-title">跑步</div>
                            </Flex.Item>
                            <Flex.Item>
                                {/*自行车预约*/}
                                <a href="javascript:void(0)" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/subscribe/2'
                                    })
                                }}>
                                    <img src={require('../assets/images/s03.jpg')} className="sub-item-image"/>
                                </a>
                                <div className="item-title">自行车</div>
                            </Flex.Item>
                            <Flex.Item>
                                {/*卡丁车预约*/}
                                <a href="javascript:void(0)" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/subscribe/3'
                                    })
                                }}>
                                    <img src={require('../assets/images/s04.jpg')} className="sub-item-image"/>
                                </a>
                                <div className="item-title">卡丁车</div>
                            </Flex.Item>
                            <Flex.Item>
                                {/*赛道预约*/}
                                <a href="javascript:void(0)" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/subscribe/4'
                                    })
                                }}>
                                    <img src={require('../assets/images/s05.jpg')}
                                         className="sub-item-image"/></a>
                                <div className="item-title">赛道</div>

                            </Flex.Item>
                        </Flex>
                    </div>
                </div>
                <div className="home-module">
                    <a href="javascript:void(0)" className="subscribe" onClick={() => {
                        this.props.history.push({
                            pathname: '/subscribe/0'
                        })
                    }}>
                        <img src={require('../assets/images/s02.jpg')}/>
                    </a>
                </div>
                <div className="home-module">
                    <h2 className="home-m-title">
                        <span className="symbol">/</span><span className="text">试驾预约</span><span
                        className="symbol">/</span>
                    </h2>
                    {
                        this.state.driveList.length ?
                            <div className="home-m-content">
                                {
                                    this.state.driveList.map((item, i) => (
                                        <div className="hmc-list" onClick={() => {
                                            this.goDetail(item.id)
                                        }}>
                                            <div className="item-logo-area">
                                        <span
                                            className={item.statusStr === "试驾中" ? "item-logo-icon test" : "item-logo-icon"}>&nbsp;</span>
                                                <img src={item.carBrandLogoUrl} width="100%"/>
                                            </div>
                                            <div className="item-sub-info">
                                                <h3>{item.carmodel}</h3>
                                                <p>试驾时间：{item.dateStr} {item.startHour}-{item.endHour}</p>
                                                <p>试驾人数：{item.minUserCount}人以上&nbsp;&nbsp;（已约：<em>{item.applyedUserCount}人</em>）
                                                </p>
                                                <p>车辆来源：{item.s4Name}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            :
                            <Loading></Loading>
                    }

                </div>
                <WCTabBar {...this.props}></WCTabBar>
            </div>
        )
    }
}
