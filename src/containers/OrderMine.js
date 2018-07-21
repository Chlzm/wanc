import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {Button, Toast} from 'antd-mobile';
import WCTabBar from '../components/TabBar';
import * as myOrderAPI from "../api/orderMine";
import Loading from '../components/Loading'
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
                    <Button type="default" size="small" onClick={() => {
                        onClick('删除订单')
                    }}>删除订单</Button>
                </div>
            )
        case '已预约':
            return (
                <div>
                    <Button type="default" size="small" onClick={() => {
                        onClick('取消订单')
                    }}>取消订单</Button>
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

@connect(matchStateToProps, matchDispatchToProps)
export default class OrderMine extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: ['1', '2', '3'],
        imgHeight: 90,
        list: null

    }

    componentWillMount() {
        this.props.setTitle('我的订单');
        this.getOrderList();
    }

    async getOrderList() {
        let ret = await myOrderAPI.getMyOrderList({
            orderStatus: null,
            pageNum: 1,
            pageSize: 10
        });
        this.setState({
            list: ret.body,
        })
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
                this.deleteOrder(id)
                break;
            case '取消订单':
                this.cancelOrder(id)
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
        Toast.info('取消成功');
        setTimeout(() => {
            this.getOrderList()
        }, 1000)
    }

    async deleteOrder(id) {
        let ret = await myOrderAPI.deleteOrder({
            orderId
        });
        Toast.info('删除成功');
        setTimeout(() => {
            this.getOrderList()
        }, 1000)
    }

    async payOrder(id) {
        this.props.history.push({
            pathname: `/order/pay/${id}`
        })
    }

    render() {
        let {list} = this.state;
        if (!list) {
            return <Loading></Loading>
        }
        return (
            <div className="wan-c-order-mine mart70">
                {
                    list.map((item, i) => {
                        return (
                            <div className="order-mine-item">
                                <div className="omi-head">
                                    <span className="order-no">
                                        订单号：{item.orderNo}
                                    </span>
                                    <span
                                        className={"order-state" + " " + this.computedClassName(item.orderStatusStr)}>{item.orderStatusStr}</span>
                                </div>
                                <div className="order-subscribe-info">
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
                                                    试驾时间：
                                                </div>
                                                <div className="order-s-date">
                                                    {item.activityDateStr} <br/>
                                                    {item.activityStartHour}-{item.activityEndHour}
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


                <WCTabBar {...this.props}></WCTabBar>
            </div>
        )
    }
}