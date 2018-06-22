import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../actions/main'
import {Flex, WhiteSpace, DatePicker, Button, List, InputItem} from 'antd-mobile';
import {Prompt,withRouter} from 'react-router-dom'
function matchStateToProps(state) {
    //...
    return {
        state
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ...homeActions
    }, dispatch)
}
class List1 extends Component {
    constructor(options) {
        super(options);
    }

    state = {
        value: null
    }

    goHome = () => {
        this.props.history.push({
            pathname: '/'
        })
        //console.log(this)
    }
    componentDidMount(){

    }
    render() {
        return (
            <div>
                <Button type='primary' onClick={() => this.goHome()}>button</Button>
                <Prompt message={()=>{
                    return 'aaaa'
                }}></Prompt>
            </div>
        )
    }
}
export default withRouter(List1)