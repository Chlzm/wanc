import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button, Toast, Modal} from 'antd-mobile';
import WCTabBar from '../components/TabBar';
import * as myOrderAPI from "../api/orderMine";
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import '../assets/css/orderMine.less';

const OrderButton = ({status, onClick, id}) => {
    switch (status) {
        case '待付款':
            return (
                <div>
                    <Button type="default" size="small" onClick={() => {
                        onClick('取消订单')
                    }}>取消订单</Button>
                    <Button type="primary" size="small" onClick={() => {
                        onClick('付款')
                    }}>付款</Button>
                </div>
            )
        case '已取消':
        case '已完成':
            return (
                <div>
                    {/*<Button type="default" size="small" onClick={() => {
                        onClick('删除订单')
                    }}>删除订单</Button>*/}
                </div>
            )
        case '已预约':
            return (
                <div>
                    {/*<Button type="default" size="small" onClick={() => {
                        onClick('取消订单')
                    }}>取消订单</Button>*/}
                </div>
            )
        default:
            return <div></div>
    }

}

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

var slideNumber = 1;
@connect(matchStateToProps, matchDispatchToProps)

export default class OrderMine extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        list: [],
        scroll: null,
        visible: false,
        finished: false,
        loadingText: '加载中...',


    }

    componentWillMount() {
        slideNumber = 1;
        this.props.setTitle('我的订单',false,<div></div>);
        this.getOrderList();
    }

    componentDidMount() {
        document.body.onscroll = () => {
            clearTimeout(this.scroll);
            this.scroll = setTimeout(() => {
                if (window.screen.availHeight + window.pageYOffset >= document.body.clientHeight - 100) {
                    slideNumber++;
                    this.getOrderList();
                }
            }, 100)
        }
    }

    async getOrderList() {
        if (this.state.finished) {
            return;
        }
        let status = this.props.match.params.flag || null;
        let ret = await myOrderAPI.getMyOrderList({
            orderStatus: status,
            pageNum: slideNumber,
            pageSize: 10
        });
        if (ret.body.length == 0) {
            this.setState({
                finished: true,
            });
        }
        this.setState({
            list: [...this.state.list, ...ret.body],
        }, () => {
            this.getListCallback();
        })
    }

    getListCallback = () => {
       // this.initSwiper();
    }

    initSwiper = () => {
        var holdPosition = 0;
        var self = this;
        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            mode: 'vertical',
            watchActiveIndex: true,
            onTouchStart: function () {
                holdPosition = 0;
            },
            onTouchMove: function (s, pos) {
                if (s.positions.current > 50) {
                    self.setState({
                        visible: true,
                        loadingText: '松开加载'
                    })
                } else if (s.positions.current > 10) {
                    self.setState({
                        loadingText: '下拉加载',
                        visible: true
                    })
                }

            },
            onResistanceBefore: function (s, pos) {
                holdPosition = pos;
            },
            onTouchEnd() {
                if (holdPosition >= 50) {
                    if (self.state.finished) {
                        self.setState({
                            visible: false,
                            loadingText: '下拉加载'
                        })
                        Toast.info("已全部加载")
                        return;
                    }
                    // Hold Swiper in required position
                    mySwiper.setWrapperTranslate(0, 65, 0)

                    //Dissalow futher interactions
                    mySwiper.params.onlyExternal = true

                    //Show loader

                    self.setState({
                        loadingText: '加载中...'
                    });
                    //Load slides
                    setTimeout(() => {
                        self :: loadNewSlides();
                    }, 500)

                }
            }
        })


        function loadNewSlides() {

            let status = this.props.match.params.flag || null;
            slideNumber++;
            myOrderAPI.getMyOrderList({
                orderStatus: status,
                pageNum: slideNumber,
                pageSize: 10
            }).then(ret => {
                if (ret.body == null) {
                    ret.body = [];
                    this.setState({
                        finished: true,
                    });
                }
                this.setState({
                    list: [...ret.body, ...this.state.list],
                    visible: false,
                    loadingText: '下拉加载'
                }, () => {
                    mySwiper.setWrapperTranslate(0, 0, 0)
                    mySwiper.params.onlyExternal = false;

                    //Update active slide
                    mySwiper.updateActiveSlide(0);

                })
            })
        }

    }

    computedClassName(orderStatusStr) {
        let className = 'primary';
        switch (orderStatusStr) {
            case '待付款':
                className = 'red';
                break;
            case '已取消':
            case '已完成':
                className = 'gray';
                break;
            default:
                className = 'primary';
                break;
        }
        return className;
    }

    onClick = (id, status, name) => {
        switch (name) {
            case '删除订单':
                Modal.alert('温馨提示', '确定要删除订单吗？', [
                    {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
                    {
                        text: '确定', onPress: () => {
                            this.deleteOrder(id)
                        }
                    },
                ])

                break;
            case '取消订单':
                Modal.alert('温馨提示', '确定要取消订单吗？', [
                    {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
                    {
                        text: '确定', onPress: () => {
                            this.cancelOrder(id)
                        }
                    },
                ])
                break;
            default:
                this.payOrder(id)
                break;
        }
    }

    async cancelOrder(orderId) {
        let ret = await myOrderAPI.cancelOrder({
            orderId
        });
        Toast.info('取消成功',1);
        setTimeout(() => {
            this.setState({
                list:[]
            },()=>{
                this.getOrderList()
            })
        }, 1000)
    }

    async deleteOrder(orderId) {
        let ret = await myOrderAPI.deleteOrder({
            orderId
        });
        Toast.info('删除成功',1);
        setTimeout(() => {
            this.setState({
                list:[]
            },()=>{
                this.getOrderList()
            })

        }, 1000)
    }

    async payOrder(id) {
        this.props.history.push({
            pathname: `/order/pay/${id}`
        })
    }

    goOrderDetail = (type, id, status) => {
        if(status === 10){
            this.props.history.push({
                pathname: `/subscribe/notpay/${id}`
            })
            return;
        }
        this.props.history.push({
            pathname: `/subscribe/success/${id}`
        })
    }

    render() {
        let {list} = this.state;
        if (!list.length && !this.state.finished) {
            return (
                <div>
                    <Loading></Loading>
                    <WCTabBar {...this.props}></WCTabBar>
                </div>
                )

        }else if(!list.length && this.state.finished){
            return (
                <div>
                    <NoData text="暂无订单"/>
                    <WCTabBar {...this.props}></WCTabBar>
                </div>
            )
        }
        return (
            <div className="wan-c-order-mine mart70">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                       {/* <div className={this.state.visible ? 'visible preloader' : 'preloader'}>
                            {this.state.loadingText}
                        </div>*/}
                        {
                            list.map((item, i) => {
                                return (
                                    <div className="order-mine-item swiper-slide swiper-slide-visible">
                                        <div className="omi-head">
                                            <span className="order-no">
                                                订单号：{item.orderNo}
                                            </span>
                                            <span
                                                className={"order-state" + " " + this.computedClassName(item.orderStatusStr)}>{item.orderStatusStr}</span>
                                        </div>
                                        <div className="order-subscribe-info" onClick={() => {
                                            //this.onClick(item.orderId, item.orderStatusStr, name)
                                            this.goOrderDetail(item.activityType, item.orderId,item.orderStatus)
                                        }}>
                                            <div className="order-sub-img">
                                                <img
                                                    src={item.activityImgUrl}
                                                />
                                            </div>
                                            <div className="order-sub-content">
                                                <h1>{item.activityName}</h1>
                                                <ul>
                                                    <li>
                                                        <div className="order-s-label">
                                                            预约时间：
                                                        </div>
                                                        <div className="order-s-date">
                                                            {item.activityDateStr} {item.activityStartHour}-{item.activityEndHour}
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="order-s-label">
                                                            场次编号：
                                                        </div>
                                                        <div className="order-s-date">{item.activityCode}</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="omi-button-area">
                                            <span className="price">¥{item.paymoney}</span>
                                            <OrderButton status={item.orderStatusStr} onClick={(name) => {
                                                this.onClick(item.orderId, item.orderStatusStr, name)
                                            }} id={item.orderId}></OrderButton>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {this.state.finished ? <div className="load-finished">已全部加载</div> : <div></div>}
                </div>

                <WCTabBar {...this.props}></WCTabBar>
            </div>
        )
    }
}