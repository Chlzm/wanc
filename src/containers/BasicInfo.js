import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {List, Picker, DatePicker} from 'antd-mobile';
import {modifyBaseInfo} from "../api/modifyBaseInfo";
import {Modal, Toast} from 'antd-mobile'
import format from 'format-datetime'
import '../assets/css/basicInfo.less';


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
        sexValue: [0],
        sex: [
            [
                {
                    label: '男',
                    value: 0,
                },
                {
                    label: '女',
                    value: 1,
                },
            ]
        ],
        userBirthday: new Date(),
        userHeadPic: '',
        userNickname: '',
    }

    componentWillMount() {
        this.props.setTitle('基本信息');
        this.initState();
    }

    componentDidMount() {
    }

    initState() {
        let strUserInfo = localStorage.getItem('wanchi-USER-INFO');
        if (strUserInfo) {
            let objUserInfo = JSON.parse(strUserInfo);
            let sexValue = objUserInfo.userSex ? [objUserInfo.userSex] : [0];
            let userHeadPic = objUserInfo.userHeadPic;
            let userBirthday = objUserInfo.userBirthday ? new Date(objUserInfo.userBirthday) : new Date;
            let userNickname = objUserInfo.userNickname;
            this.setState({
                sexValue,
                userHeadPic,
                userBirthday,
                userNickname,
            })
        }
    }

    onOk = value => {
        this.setState({
            sexValue: value
        });

    }

    modifySex(userSex) {
        modifyBaseInfo({userSex: userSex[0]}).then(ret => {
            let strUserInfo = localStorage.getItem('wanchi-USER-INFO');
            let objUserInfo = JSON.parse(strUserInfo);
            objUserInfo.userSex = userSex[0];
            localStorage.setItem('wanchi-USER-INFO', JSON.stringify(objUserInfo))
            this.setState({
                sexValue: userSex
            });
            Toast.info('修改成功')
        })
    }

    modifyNickname() {
        let strUserInfo = localStorage.getItem('wanchi-USER-INFO');
        let objUserInfo = JSON.parse(strUserInfo);
        Modal.prompt('修改昵称', '', [
            {text: '取消'},
            {
                text: '修改', onPress: (v) => {
                    this.onNicknameChange(v, objUserInfo)
                }
            },
        ], 'default', objUserInfo.userNickname)
    }

    onNicknameChange = (userNickname, info) => {
        modifyBaseInfo({
            userNickname
        }).then(ret => {
            info.userNickname = userNickname;
            this.setState({
                userNickname
            })
            let newStr = JSON.stringify(info);
            localStorage.setItem('wanchi-USER-INFO', newStr);
            Toast.info('修改成功')
        })
    }

    modifyBirthday = date => {
        let userBirthday = format(date, 'yyyy-MM-dd')
        modifyBaseInfo({
            userBirthday,
        }).then(ret => {
            let strUserInfo = localStorage.getItem('wanchi-USER-INFO');
            let objUserInfo = JSON.parse(strUserInfo);
            objUserInfo.userBirthday = date.getTime();
            localStorage.setItem('wanchi-USER-INFO', JSON.stringify(objUserInfo));
            this.setState({
                userBirthday: date
            });
            Toast.info('修改成功')
        })

    }
    goUploadPage = () => {
        this.props.history.push({
            pathname: '/upload'
        })
    }

    render() {
        let {location, match} = this.props;

        return (
            <div className="wan-c-information">

                <List>
                    <List.Item extra={<img src={this.state.userHeadPic}/>} arrow="horizontal"
                               onClick={this.goUploadPage}>
                        头像
                    </List.Item>
                    <List.Item extra={this.state.userNickname} onClick={() => {
                        this.modifyNickname()
                    }} arrow="horizontal">
                        昵称
                    </List.Item>
                    <Picker
                        data={this.state.sex}
                        title="性别"
                        cascade={false}
                        extra="姓别"
                        value={this.state.sexValue}
                        //onChange={v => this.setState({sexValue: v})}
                        onOk={(value) => {
                            this.modifySex(value)
                        }}
                    >
                        <List.Item arrow="horizontal">姓别</List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        title="选择生日"
                        extra="选择生日"
                        value={this.state.userBirthday}
                        onChange={(data) => {
                            this.modifyBirthday(data)
                        }}
                    >
                        <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                </List>
            </div>
        )
    }
}
