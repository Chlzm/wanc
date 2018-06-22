import React from 'react'
import { Provider } from 'react-redux';

export default class List extends React.Component {
    constructor(options){
        super(options);
        this.state = {
            value: 'webpack 4.0 & react 16.0.0'
        }
    }
    goIndex = ()=>{
        this.props.history.push({
            pathname: '/'
        })
    }
    render () {
        return (
            <div onClick={this.goIndex}>
                this is {this.state.value}..
                <img src={require('../assets/images/timg.jpg')} alt=""/>
            </div>
        )
    }
}