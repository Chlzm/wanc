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
        var self = this;
        var cvs = document.getElementById("photo");
        var ctx = cvs.getContext("2d");
        var img = new Image();
        cvs.width = 300;
        cvs.height = 300;
        ctx.clearRect(0, 0, 1000, 1000);
        img.src = files[0].url;
        img.onload = function () {
            let size = img.width < img.height ? img.width : img.height;
            ctx.drawImage(img, 0, 0, size, size, 0, 0, 300, 300);
            uploadImage({
                filecontent: cvs.toDataURL("img/jpeg").split(',')[1]//files[0].url.split(',')[1],
            }).then(ret => {

                let strUserInfo = localStorage.getItem('wanchi-USER-INFO');
                let objUserInfo = JSON.parse(strUserInfo);
                objUserInfo.userHeadPic = ret.body;
                localStorage.setItem('wanchi-USER-INFO', JSON.stringify(objUserInfo))
                /*this.setState({
                    files,
                });*/
                Toast.info('修改成功', 1);
                setTimeout(() => {
                    self.props.history.replace({
                        pathname: '/information'
                    })
                }, 1000)
            }).catch(e=>{

            })
        };


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
                <canvas id="photo" className="photo"></canvas>
            </div>
        )
    }
}
