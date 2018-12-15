import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import configure from '../store/configureStore'
import createHistory from 'history/createBrowserHistory'
import {hot} from 'react-hot-loader'
import Header from '../components/Header';
import Running from './Running'
import Index from './Index'
import Login from './Login'
import ForgetPassword from './ForgetPassword'
import ModifyPassword from './ModifyPassword'
import OrderConfirm from './OrderConfirm';
import OrderBicycleConfirm from './OrderBicycleConfirm';
import OrderRunning from './OrderRunning';
import OrderSuccess from './OrderSuccess';
import OrderFill from './OrderFill';
import OrderPay from './OrderPay';
import Drive from './Drive';
import AppliedPerson from './AppliedPerson';
import UserCenter from './UserCenter'
import OrderMine from './OrderMine'
import OrderDetail from './OrderDetail'
import Feedback from './Feedback'
import BasicInfo from './BasicInfo'
import ModifyNickname from './ModifyNickname'
import Message from './Message'
import About from './About'
import Pay from './Pay'
import AlipayMiddlePage from './AlipayMiddlePage'
import AppPay from './AppPay'
import Upload from './Upload'
import ModifyPhoneNumber from './ModifyPhoneNumber'
import BrandList from './BrandList'
import Service from './Service'
import Contact from './Contact'
import qc from '../util/qiancheng'
import {isWeiXin} from "../util/util";

let history = createHistory();
const store = configure({config: global.$GLOBALCONFIG})
const NoMatch = ({location}) => (
    <div>
        <h3>No match for <code>{location.pathname}!</code></h3>
    </div>
)

class App extends React.Component {
    constructor(options) {
        super(options);
    }

    componentDidMount() {
        //this.registerCallBack();
        //this.isHomePage();
        //FastClick.attach(document.body)
    }

    componentWillMount() {

        //debugger;
    }

    isHomePage(path) {
        if (path.indexOf('order/mine') > -1) {
            return true;
        }
        switch (path) {
            case '/':
            case '/index':
            case '/mine':
                return true;
            default:
                return false;
        }
    }

    registerCallBack(path) {
        qc.track('registerCallBack', {}).then(res => {
            if (this.isHomePage(path)) {
                qc.track('popWindow', {}).then(res => {
                    // history.goBack()
                }).catch(error => {
                    console.log(error)
                })
                return;
            } else {
                history.goBack()
            }


        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <BrowserRouter history={history}>
                <Provider store={store}>
                    <Route render={params => {
                        let {location} = params;
                        this.registerCallBack(params.location.pathname);
                        return (
                            <div>
                                <Header {...params} style={{'display': isWeiXin() ? 'none' : 'block'}}></Header>
                                <Switch key={location.pathname} location={location}>
                                    <Route exact path="/" component={Index}></Route>
                                    <Route exact path="/login" component={Login}></Route>
                                    <Route path="/forget" component={ForgetPassword}></Route>
                                    <Route path="/modify/password" component={ModifyPassword}></Route>
                                    <Route path="/feedback" component={Feedback}></Route>
                                    {/*<Route exact path="/subscribe/car" component={List}></Route>*/}
                                    <Route exact path="/subscribe/:type" component={Running}></Route>
                                    <Route exact path="/subscribe/running/detail/:type/:id"
                                           component={OrderRunning}></Route>
                                    <Route exact path="/subscribe/confirm/:id/:person/:type?"
                                           component={OrderBicycleConfirm}></Route>
                                    <Route exact path="/order/car/:id" component={OrderConfirm}></Route>
                                    <Route exact path="/subscribe/success/:id" component={OrderSuccess}></Route>
                                    <Route exact path="/subscribe/notpay/:id" component={OrderDetail}></Route>
                                    <Route exact path="/order/fill/:type/:id" component={OrderFill}></Route>
                                    <Route exact path="/brand/:type/:id" component={BrandList}></Route>
                                    <Route exact path="/order/pay/:id" component={OrderPay}></Route>
                                    <Route exact path="/drive/:id" component={Drive}></Route>
                                    <Route exact path="/apply/:id" component={AppliedPerson}></Route>
                                    <Route exact path="/mine" component={UserCenter}></Route>
                                    <Route exact path="/order/mine/:flag?" component={OrderMine}></Route>
                                    <Route exact path="/information" component={BasicInfo}></Route>
                                    <Route exact path="/modify/nickname" component={ModifyNickname}></Route>
                                    <Route exact path="/modify/phone" component={ModifyPhoneNumber}></Route>
                                    <Route exact path="/message" component={Message}></Route>
                                    <Route exact path="/about" component={About}></Route>
                                    <Route exact path="/pay/" component={Pay}></Route>
                                    <Route exact path="/upload" component={Upload}></Route>
                                    <Route exact path="/app/pay" component={AppPay}></Route>
                                    <Route exact path="/alipay" component={AlipayMiddlePage}></Route>
                                    <Route exact path="/service" component={Service}></Route>
                                    <Route exact path="/contact" component={Contact}></Route>

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

export default hot(module)(App)