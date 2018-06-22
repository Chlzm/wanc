import React from 'react'
import {Link, Router, StaticRouter, BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router'
import {Provider} from 'react-redux';
import configure from '../store/configureStoreSaga'
import createHistory from 'history/createBrowserHistory'
import Home from './Home'
import List from './List'
import Index from './Index'

let history = createHistory();
const store = configure({config: global.$GLOBALCONFIG})


const NoMatch = ({location}) => (
    <div>
        <h3>No match for <code>{location.pathname}!</code></h3>
    </div>
)
const getConfirmation = (message, callback) => {
    const allowTransition = window.confirm(message)
    callback(allowTransition)
}
export default class App extends React.Component {
    constructor(options) {
        super(options);
        this.state = {
            value: 'webpack 4.0 & react 16.0.0'
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
        //debugger;
    }

    render() {
        return (
            <BrowserRouter history={history}>
                <Provider store={store}>
                    <Route render={params => {
                        let {location} = params;
                        return (
                            <Switch key={location.pathname} location={location}>
                                <Route exact path="/" component={Home}></Route>
                                <Route exact path="/index" component={Index}></Route>
                                <Route exact path="/list" component={List}></Route>
                                <Route component={NoMatch}/>
                            </Switch>
                        )
                    }}>
                    </Route>
                </Provider>
            </BrowserRouter>
        )
    }
}