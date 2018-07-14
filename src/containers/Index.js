import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Flex, Carousel} from 'antd-mobile';
import WCTabBar from '../components/TabBar';
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
        fourS: [],
        imgHeight: 176,

    }


    componentWillMount() {
        this.props.setTitle("预约广场");
        this.getBanner();
        this.get4SList();
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        //     });
        // }, 100);
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
                                <a href="javascript:void(0)" onClick={()=>{
                                    this.props.history.push({
                                        pathname:'/running'
                                    })
                                }}>
                                    <img src={require('../assets/images/s01.jpg')} className="sub-item-image"/>
                                </a>
                            </Flex.Item>
                            <Flex.Item>
                                <a href="javascript:void(0)">
                                    <img src={require('../assets/images/s01.jpg')} className="sub-item-image"/>
                                </a>
                            </Flex.Item>
                            <Flex.Item>
                                <a href="javascript:void(0)">
                                    <img src={require('../assets/images/s01.jpg')} className="sub-item-image"/>
                                </a>
                            </Flex.Item>
                            <Flex.Item>
                                <a href="javascript:void(0)"><img src={require('../assets/images/s01.jpg')}
                                                                  className="sub-item-image"/></a>
                            </Flex.Item>
                        </Flex>
                    </div>
                </div>
                <div className="home-module">
                    <a href="javascript:void(0)" className="subscribe">
                        <img src={require('../assets/images/s02.jpg')}/>
                    </a>
                </div>
                <div className="home-module">
                    <h2 className="home-m-title">
                        <span className="symbol">/</span><span className="text">试驾预约</span><span
                        className="symbol">/</span>
                    </h2>
                    <div className="home-m-content">
                        <div className="hmc-list">
                            <div className="item-logo-area">
                                <span className="item-logo-icon">&nbsp;</span>
                                <img src={require('../assets/images/icon-car-logo.jpg')} width="100%"/>
                            </div>
                            <div className="item-sub-info">
                                <h3>C200 E300L</h3>
                                <p>试驾时间：2018-05-20 9:00-11:00</p>
                                <p>试驾人数：8人以上&nbsp;&nbsp;（已约：<em>10人</em>）</p>
                                <p>车辆来源：利星奔驰汽车销售 （南京溧水区店</p>
                            </div>
                        </div>
                        <div className="hmc-list">
                            <div className="item-logo-area">
                                <span className="item-logo-icon test">&nbsp;</span>
                                <img src={require('../assets/images/icon-car-logo.jpg')} width="100%"/>
                            </div>
                            <div className="item-sub-info">
                                <h3>C200 E300L</h3>
                                <p>试驾时间：2018-05-20 9:00-11:00</p>
                                <p>试驾人数：8人以上&nbsp;&nbsp;（已约：<em>10人</em>）</p>
                                <p>车辆来源：利星奔驰汽车销售 （南京溧水区店</p>
                            </div>
                        </div>
                        <div className="hmc-list">
                            <div className="item-logo-area">
                                <span className="item-logo-icon test">&nbsp;</span>
                                <img src={require('../assets/images/icon-car-logo.jpg')} width="100%"/>
                            </div>
                            <div className="item-sub-info">
                                <h3>C200 E300L</h3>
                                <p>试驾时间：2018-05-20 9:00-11:00</p>
                                <p>试驾人数：8人以上&nbsp;&nbsp;（已约：<em>10人</em>）</p>
                                <p>车辆来源：利星奔驰汽车销售 （南京溧水区店</p>
                            </div>
                        </div>
                    </div>
                </div>
                <WCTabBar {...this.props}></WCTabBar>
            </div>
        )
    }
}
