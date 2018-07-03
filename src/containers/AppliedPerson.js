import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {PullToRefresh, Button, ListView} from 'antd-mobile';
import '../assets/css/applied.less';
import {getData} from '../api/appliedPerson'


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
        this.state = {
            data: [],
            scroll: null,
            visible: false,
            loadingText: '加载中...'
        };
        this.scroll = undefined;
    }


    componentWillMount() {
        this.props.setTitle('已申请人员列表');
        this.getList();

    }

    componentDidMount() {
        document.body.onscroll = () => {
            clearTimeout(this.scroll);
            this.scroll = setTimeout(() => {
                if (window.screen.availHeight + window.pageYOffset >= document.body.clientHeight - 100) {
                    this.getList();
                }

            }, 100)
        }
    }

    async getList() {
        let ret = await getData();
        this.setState({
            data: [...this.state.data, ...ret.data]
        }, this.getListCallback);
    }

    getListCallback = () => {
        this.initSwiper();
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
                }else if (s.positions.current > 10) {
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
                if (holdPosition > 50) {
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
                        loadNewSlides.call(self);
                    }, 500)

                }
            }
        })
        var slideNumber = 0;

        function loadNewSlides() {
            getData().then(ret => {
                this.setState({
                    data: [...ret.data, ...this.state.data],
                    visible: false,
                    loadingText: '下拉加载'
                }, () => {
                    mySwiper.setWrapperTranslate(0, 0, 0)
                    mySwiper.params.onlyExternal = false;

                    //Update active slide
                    mySwiper.updateActiveSlide(0);

                })
            })
            return;
            slideNumber++;
        }

    }

    render() {
        return (
            <div className="wan-c-applied">

                <div className="swiper-container">
                    <ul className="swiper-wrapper">
                        <li className="swiper-slide swiper-slide-visible">
                            <div className={this.state.visible ? 'visible preloader' : 'preloader'}>
                                {this.state.loadingText}
                            </div>
                        </li>
                        {this.state.data.map((value, index) => {
                            return (
                                <li className="swiper-slide swiper-slide-visible">
                                    <img src={value.img} alt=""/>
                                    <div>
                                        <span>{value.name}</span><br/>
                                        <span className="number">{value.no}</span>
                                    </div>
                                </li>
                            )
                        })}

                    </ul>
                </div>

            </div>
        )
    }
}
