import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {List, Toast} from 'antd-mobile';
import '../assets/css/brand.less'
import Loading from '../components/Loading'
import {getBrandList} from "../api/brand";
import IScroll from 'iscroll'
import pubsub from '../util/pubsub'

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
export default class BrandList extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        data: null
    }

    componentWillMount() {
        this.props.setTitle('选择品牌');
        this.getBrand();
    }

    componentDidMount() {
    }

    async getBrand() {
        let ret = await getBrandList();
        let data = this.sortData(ret.body);
        this.setState({
            data,
        }, () => {
            this.initScroll()
        })
    }

    sortData(data) {
        let list = [];
        for (let [key, value] of Object.entries(data)) {
            let o = {};
            o.value = value;
            o.key = key
            list.push(o)
        }
        list.sort((a, b) => {
            return a.key > b.key;
        })
        return list
    }

    initScroll() {
        /*if (location.hash) {
            window.scrollTo(0, 0);
        }*/
        var myScroll = new IScroll('#wrapper', {
            bounce: true,

        });
        if (location.hash) {
            setTimeout(function () {
                myScroll.scrollToElement(location.hash, 0);
            }, 50);
        }
        let elements = document.getElementsByClassName("aToz");
        let eleArray = [...elements]
        for (let element of eleArray) {
            element.onclick = function (e) {
                e.preventDefault()
                myScroll.scrollToElement(e.target, 20);
            }
        }
        window.onload = function () {

        }

    }

    handClick = (v) => {
        let {type, id} = this.props.match.params
        pubsub.publish('mes', {
            id: v.id,
            name: v.name,
        })
        this.props.history.push({
            pathname: `/order/fill/${type}/${id}`,
            state: {
                carbrandname: 'adsasd'
            }
        })
    }

    render() {
        let {data} = this.state;
        if (!data) {
            return <Loading></Loading>
        }

        return (
            <div className="wanc-brand-list">
                <div className="contact-bar">
                    {
                        data.map(({key}) => (
                            <a className="aToz" href={"#" + key}>{key}</a>
                        ))
                    }
                </div>
                <div className="brand-list" id="wrapper">
                    <div className="brand-content">
                        <div className="content">
                            {
                                data.map(({key, value}) => (
                                    <List renderHeader={() => (key)} className="my-list" id="brand-a">
                                        {
                                            value.map(v => (
                                                <List.Item extra={''} onClick={() => {

                                                    this.handClick(v)
                                                }}>
                                                    <img src={v.imgUrl}
                                                         alt=""/>
                                                    <span className="car-name">{v.name}</span></List.Item>
                                            ))
                                        }

                                    </List>
                                ))
                            }
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}