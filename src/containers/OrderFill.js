import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fillActions from '../actions/orderFill'
import * as headerActions from '../actions/header'
import {Flex, Button, List, InputItem, Icon, Stepper, DatePicker} from 'antd-mobile';
import '../assets/css/orderFill.less';
import format from 'format-datetime';
import {apply4S, get4SDetail} from "../api/running";
import Loading from '../components/Loading'
import pubsub from '../util/pubsub'
function matchStateToProps(state) {
    //...
    return {
        state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...fillActions,
        ...headerActions,
    }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)
export default class OrderFill extends React.Component {
    constructor(options) {
        super(options);
    }

    state = {
        id: this.props.match.params.id,
        time: new Date,
        s4name: '',
        applyusername: '',
        phone: '',
        carbrandid: 1,
        carbrandname:'',
        carmodel: '',
        usercount: 0,
        paymoney: '',
        applyendtime: format(new Date, 'yyyy-MM-dd HH:mm') + ':00',
    }

    componentWillMount() {
        this.props.setTitle('填写预约单');
        this.getOrderDetail();
        pubsub.subscribe('mes',({id,name})=>{
            this.setState({
                carbrandid:id,
                carbrandname:name
            })
        })
    }

    async getOrderDetail() {
        let ret = await get4SDetail({
            id: this.props.match.params.id,
        });
        this.setState({
            applyendtime: ret.body.applyEndTimeStr,
            time: new Date(ret.body.applyEndTime),
            paymoney: ret.body.discountPrice,
            ...ret.body,
        });
    }

    change = (value, stateName) => {
        let o = {...this.state};
        switch (stateName){
            case 's4name':
                this.props.setName(value);
                break;
            case 'applyusername':
                this.props.setApplyUserName(value);
                break;
            case 'phone':
                this.props.setPhone(value);
                break;
            case 'carmodel':
                this.props.setCarModel(value);
                break;
            case 'usercount':
                this.props.setUserCount(value);
                break;
            case 'applyendtime':
                this.props.setTime(value);
                break;
                //o[stateName] = format(value, 'yyyy-MM-dd HH:mm') + ':00'
                //o.time = value;
            default:
                o[stateName] = value;
                this.setState(o);
                break;
        }
       /* o[stateName] = value;
        if (stateName === 'applyendtime') {

        }*/

    }

    async submit() {
        let fill = this.props.state.fill;
        let ret = await apply4S({
            id: this.state.id,
            s4name: fill.s4name,
            applyusername: fill.applyusername,
            phone:fill.phone,
            carbrandid: this.state.carbrandid,
            carmodel:fill.carmodel,
            usercount: fill.usercount,
            applyendtime: format(fill.time, 'yyyy-MM-dd HH:mm') + ':00',
        });
        if(ret.code === "00000"){
            this.props.history.push({
                pathname:`/subscribe/confirm/${ret.body.orderId}`
            })
        }
    }

    goBrandPage = () => {
        let {type, id} = this.props.match.params
        this.props.history.push({
            pathname: `/brand/${type}/${id}`
        })
    }

    render() {
        return (
            <div className="order-fill">
                <div className="order-fill-info">
                    {this.state.name ?
                        <div className="order-fill-des">
                            <h1>{this.state.name}</h1>
                            <ul>
                                <li>试驾时间：{format(new Date(this.state.date), 'yyyy-MM-dd')} {this.state.startHour}-{this.state.endHour}</li>
                                <li>截止时间：{format(new Date(this.state.applyEndTime), 'yyyy-MM-dd HH:mm')}</li>
                                <li>场次编号：{this.state.code}</li>
                            </ul>
                        </div>
                        :
                        <Loading></Loading>
                    }

                </div>
                <div className="order-fill-note">
                    <p>
                        请在截止日期前进行预约，如预约的场次因故取消，可申请
                        退款，请放心预约！
                    </p>
                </div>
                <div className="order-fill-module">
                    <List>
                        <InputItem placeholder="请输入4S店名称" value={this.props.state.fill.s4name} onChange={(value) => {
                            this.change(value, 's4name')
                        }}>4S店名称：</InputItem>
                    </List>
                    <List>
                        <InputItem placeholder="请输入预约人姓名" value={this.props.state.fill.applyusername} onChange={(value) => {
                            this.change(value, 'applyusername')
                        }}>预约人：</InputItem>
                    </List>
                    <List>
                        <InputItem type="phone" placeholder="请输入联系方式" value={this.props.state.fill.phone} onChange={(value) => {
                            this.change(value, 'phone')
                        }}>联系方式：</InputItem>
                    </List>
                </div>
                <div className="order-fill-module">
                    <div className="order-fill-title" onClick={() => {
                        this.goBrandPage()
                    }}>
                        <span>试驾品牌</span>
                        <div>
                            <span>{this.state.carbrandname || "选择名牌" }</span>
                            <Icon type="right"></Icon>
                        </div>
                    </div>
                    <List>
                        <InputItem placeholder="多种车型，用逗号“，”隔开" value={this.props.state.fill.carmodel} onChange={(value) => {
                            this.change(value, 'carmodel')
                        }}>试驾车型：</InputItem>
                    </List>
                    <List>
                        <List.Item extra={
                            <div className="order-fill-least">
                                <Stepper
                                    style={{width: '100%', minWidth: '100px'}}
                                    showNumber
                                    max={10}
                                    min={1}
                                    value={this.props.state.fill.usercount}
                                    onChange={(value) => {
                                        this.change(value, 'usercount')
                                    }}
                                />
                            </div>
                        }
                        >
                            人数要求：</List.Item>
                    </List>
                    <List>
                        <DatePicker
                            mode="datetime"
                            minuteStep={2}
                            value={this.props.state.fill.time}
                            onChange={(value) => {
                                this.change(value, 'applyendtime')
                            }}
                        >
                            <List.Item>报名截止：</List.Item>
                        </DatePicker>
                    </List>
                    <div className="order-fill-submit">
                        <div className="order-fill-price">
                            ¥{this.state.discountPrice}
                            <del>¥{this.state.price}</del>
                        </div>
                        <div className="order-fill-sub-button">
                            <Button type="primary" onClick={() => {
                                this.submit()
                            }}>立即预约</Button>
                        </div>
                    </div>
                    {/* <List>
                        <List.Item extra={
                            <Button type="primary">立即预约</Button>
                        }>
                            <span className="order-fill-price">¥3000.00</span>
                        </List.Item>
                    </List>*/}
                </div>
            </div>
        )
    }
}