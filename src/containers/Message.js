import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import '../assets/css/message.less';
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import * as messageAPI from "../api/message";


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
export default class Message extends Component {
    constructor(options) {
        super(options);
        this.state = {
            data: [],
            scroll: null,
            visible: false,
            loadingText: '加载中...',
            pageNum: 0,
            pageSize: 10,
            loaded: false,
        };
        this.scroll = undefined;
    }


    componentWillMount() {
        this.props.setTitle('消息中心');
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
        this.setState({
            pageNum: this.state.pageNum + 1
        })
        let ret = await messageAPI.getNoticeList({
            pageNum: this.state.pageNum + 1,
            pageSize: this.state.pageSize,
        });
        this.setState({
            data: [...this.state.data, ...ret.body],
            loaded: true,
        }, this.getListCallback);
    }

    getListCallback = () => {
        this.initSwiper();
    }

    initSwiper = () => {
        var holdPosition = 0;
        var self = this;
        var mySwiper = new Swiper('.swiper-container', {
            click: true,
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

        function loadNewSlides() {
            this.setState({
                pageNum: this.state.pageNum + 1,
            })
            messageAPI.getNoticeList({
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize,
            }).then(ret => {
                this.setState({
                    data: [...ret.body, ...this.state.data],
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
        }

    }

    async readNotice(o) {
        await messageAPI.readNotice({
            noticeId: o.id
        });
        this.setState({
            pageNum: 1
        }, () => {
            this.getList();
        })
    }

    render() {
        let {data, loaded} = this.state;
        if (loaded) {
            return <NoData text='暂无数据'></NoData>
        }
        if (!data.length) {
            return <Loading></Loading>
        }

        return (
            <div className="wan-c-message">
                <div className="swiper-container">
                    <ul className="swiper-wrapper">
                        <li className="swiper-slide swiper-slide-visible">
                            <div className={this.state.visible ? 'visible preloader' : 'preloader'}>
                                {this.state.loadingText}
                            </div>
                        </li>
                        {this.state.data.map((value, index) => {
                            return (
                                <li className={"swiper-slide swiper-slide-visible" + (value.noticeIsRead ? " read" : "")}
                                    onClick={() => {
                                        this.readNotice(value)
                                    }}>
                                    <div className="message-title">
                                        <span className="text">【系统升级通告】</span>
                                        <span>2018/05/15  17:12:35</span>
                                    </div>
                                    <div className="message-content">尊敬的用户，为了提高用户的服务质量，我们将于7月15号进
                                        行系统升级
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
