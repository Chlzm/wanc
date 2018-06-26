import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import configure from '../store/configureStoreSaga'
import createHistory from 'history/createBrowserHistory'

import Home from './Home'
import Header from '../components/Header';
import List from './List'
import Running from './Running'
import Index from './Index'
import Login from './Login'
import ForgetPassword from './ForgetPassword'
import OrderConfirm from './OrderComfirm';
import OrderRunning from './OrderRunning';
import OrderFill from './OrderFill';
import OrderPay from './OrderPay';

let history = createHistory();
const store = configure({config: global.$GLOBALCONFIG})
const NoMatch = ({location}) => (
    <div>
        <h3>No match for <code>{location.pathname}!</code></h3>
    </div>
)
export default class App extends React.Component {
    constructor(options) {
        super(options);
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
                            <div>
                                {params.location.pathname == "/login" ? <div></div> : <Header {...params}></Header>}
                                <Switch key={location.pathname} location={location}>
                                    <Route exact path="/" component={Index}></Route>
                                    <Route exact path="/index" component={Index}></Route>
                                    <Route exact path="/login" component={Login}></Route>
                                    <Route path="/forget" component={ForgetPassword}></Route>
                                    <Route exact path="/list" component={List}></Route>
                                    <Route exact path="/running" component={Running}></Route>
                                    <Route exact path="/order/car/:id" component={OrderConfirm}></Route>
                                    <Route exact path="/order/running/:id" component={OrderRunning}></Route>
                                    <Route exact path="/order/fill" component={OrderFill}></Route>
                                    <Route exact path="/order/pay" component={OrderPay}></Route>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </div>

                        )
                    }}>
                    </Route>
                </Provider>
            </BrowserRouter>
        )
    }
}