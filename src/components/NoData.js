import React, {Component} from 'react';
import "../assets/css/noData.less"
export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="wan-c-no-data">
                <img src={require('../assets/images/logo-gray.png')}/>
                <span>
                    {this.props.text || "暂无订单"}
                </span>
            </div>
        );
    }
}