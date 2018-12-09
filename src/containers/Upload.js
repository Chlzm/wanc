import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as headerActions from '../actions/header'
import {ImagePicker, Toast} from 'antd-mobile';
import {uploadImage} from "../api/upload";
import '../assets/css/about.less';


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
            files: []
        }
    }


    componentWillMount() {
        this.props.setTitle('上传头像');
    }

    componentDidMount() {
    }

    onChange = (files, type, index) => {
        uploadImage({
            filecontent: files[0].url.split(',')[1],
        }).then(ret => {
            let strUserInfo = localStorage.getItem('wanchi-USER-INFO');
            let objUserInfo = JSON.parse(strUserInfo);
            objUserInfo.userHeadPic = ret.body;
            localStorage.setItem('wanchi-USER-INFO', JSON.stringify(objUserInfo))
            this.setState({
                files,
            });
            Toast.info('修改成功',1);
            setTimeout(() => {
                this.props.history.replace({
                    pathname: '/information'
                })
            }, 1000)
        })

    }

    render() {
        let {location, match} = this.props;
        return (
            <div className="wan-c-upload">
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 1}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </div>
        )
    }
}
