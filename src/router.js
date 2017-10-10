import React from 'react';
import { Router, Route, IndexRoute  } from 'dva/router';



import IndexPage from './routes/IndexPage';
import Login from './routes/Login/login';
import Data from './routes/Data/data';
import Face from './routes/Face/face';
import Evaluation from './routes/Evaluation/evaluation';
import CompanyList from './routes/CompanyList/';


import Bbs from './routes/Bbs/bbs';
import BbsDetail from './routes/BbsDetail';
import Community from './routes/Bbs/index.js';
import Finance from './routes/Finance/finance';
import Banking from './routes/Finance_list/finance_list';
import MyNews from './components/MemberCenter/mynews';
import MyBbs from './components/MemberCenter/mybbs';
import MyCollect from './components/MemberCenter/mycollect';
import MyThumpUp from './components/MemberCenter/mythumbup';
import MyFollow from './components/MemberCenter/myfollow';
import MySettings from './components/MemberCenter/mysettings';
import BbsCenter from './routes/BbsCenter';
import MediaQuery from 'react-responsive';
const reg = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Reg/reg'))}, 'reg')
};
const platDetail = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./components/Platform/platform'))}, 'platDetail')
};

const forgetpass = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/forgetpass'))}, 'forgetpass')
};
const phone = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/Phone'))}, 'phone')
};
const verification = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/Verification'))}, 'verification')
};
const carryout = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/Carryout'))}, 'carryout')
};
const membercenter = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/MemberCenter'))}, 'membercenter')
};

//移动端页面路由

const MobileIndexPage = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Mobile_IndexPage'))}, 'MobileIndexPage')
};

// import MobileIndexPage from './routes/Mobile_IndexPage';

const Mobile_evaluation = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Evaluation/Mobile_evaluation'))}, 'Mobile_evaluation')
};

// import Mobile_evaluation from './routes/Evaluation/Mobile_evaluation';

const Mobile_face = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Face/Mobile_Face'))}, 'Mobile_face')
};
const Mobile_data = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Data/Mobile_data'))}, 'Mobile_data')
};

// import Mobile_data from './routes/Data/Mobile_data';
const Mobile_financeList = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Finance_list/Mobile_financeList'))}, 'Mobile_financeList')
};


// import Mobile_financeList from '';

const Mobile_login = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Login/Mobile_login'))}, 'Mobile_login')
};

// import Mobile_login from './routes/Login/Mobile_login';

const Mobile_reg = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Reg/Mobile_reg'))}, 'Mobile_reg')
};
// import Mobile_reg from './routes/Reg/Mobile_reg';
const Mobile_membercenter = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/MemberCenter/Mobile_member'))}, 'Mobile_membercenter')
};

// import Mobile_membercenter from './routes/MemberCenter/Mobile_member';

const Forgetpass = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/Mobile_forgetpass'))}, 'Forgetpass')
};

// import Forgetpass from './routes/ForgetPass/Mobile_forgetpass';

const Phone = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/Phone/Mobile_phone'))}, 'Phone')
};
// import Phone from './routes/ForgetPass/Phone/Mobile_phone';

const Verification = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/Verification/Mobile_verification'))}, 'Verification')
};
// import Verification from './routes/ForgetPass/Verification/Mobile_verification';

const Carryout = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/ForgetPass/Carryout/Mobile_Carryout'))}, 'Carryout')
};
// import Carryout from './routes/ForgetPass/Carryout/Mobile_Carryout';


const MobileFinance = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/Finance/Mobile_finance'))}, 'MobileFinance')
};
// import MobileFinance from './routes/Finance/Mobile_finance';

const MobilePlatform = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./components/Platform/Mobile_platform.js'))}, 'MobilePlatform')
};
// import MobilePlatform from './components/Platform/Mobile_platform.js';


const Personal = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/MemberCenter/Personal'))}, 'Personal')
};
const ChangePassword = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/MemberCenter/ChangePassword'))}, 'ChangePassword')
};
const ModifyAvatar = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/MemberCenter/ModifyAvatar'))}, 'ModifyAvatar')
};
const AccountBinding = (location, callback) => {
  require.ensure([], require => {callback(null,
    require('./routes/MemberCenter/AccountBinding'))}, 'AccountBinding')
};
function RouterConfig({ history }) {
  return (
    <div>
      <MediaQuery query='(min-device-width: 1224px)'>
    	<Router history={history}>
    	  <Route path="/" component={IndexPage}>
    	    <Route path="reg" getComponent={reg}/>
          <Route path="data" component={Data}/>
          <Route path="face" component={Face}/>
          <Route path="evaluation" component={Evaluation}/>
          <Route path="companylist" component={CompanyList}/>
          
          <Route path="finance" component={Finance}/>
          <Route path="financeList" component={Banking}/>
          <Route path="platDetail" getComponent={platDetail}/>
          <Route path="bbs" component={Bbs}/>
          <Route path="bbsdetail" component={BbsDetail}/>
          <Route path="publicSubject" component={Community}/>
          
          <Route path="forgetpass" getComponent={forgetpass}/>
          <Route path="phone" getComponent={phone}/>
          <Route path="verification" getComponent={verification}/>
          <Route path="carryout" getComponent={carryout}/>
          <Route path="login(/:router)" component={Login}/>
          <Route path="bbscenter" component={BbsCenter}/>
          <Route path="memberCenter" getComponent={membercenter}>
            <Route path="mynews" component={MyNews}/>
            <Route path="mybbs" component={MyBbs}/>
            <Route path="mycollect" component={MyCollect}/>
            <Route path="mythumbup" component={MyThumpUp}/>
            <Route path="myfollow" component={MyFollow}/>
            <Route path="mysettings" component={MySettings}/>
          </Route>
    	  </Route>
  	  </Router>
    </MediaQuery>

    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={history}>
        <Route path="/" getComponent={MobileIndexPage} >
              <Route path="evaluation" getComponent={Mobile_evaluation}/>
              <Route path="face" getComponent={Mobile_face}/>
              <Route path="data" getComponent={Mobile_data}/>
              <Route path="finance" getComponent={MobileFinance}/>
              <Route path="financeList" getComponent={Mobile_financeList}/>
              <Route path="platDetail" getComponent={MobilePlatform}/>
              <Route path="login(/:router)" getComponent={Mobile_login}/>
              <Route path="reg" getComponent={Mobile_reg}/>
              <Route path="memberCenter" getComponent={Mobile_membercenter}>
                  <Route path="mynews" component={MyNews}/>
              </Route>
                <Route path="forgetpass" getComponent={Forgetpass}/>
                <Route path="phone" getComponent={Phone}/>
                <Route path="verification" getComponent={Verification}/>
                <Route path="carryout" getComponent={Carryout}/>
                <Route path="personal" getComponent={Personal}/>
                <Route path="changepassword" getComponent={ChangePassword}/>
                <Route path="modifyavatar" getComponent={ModifyAvatar}/>
                <Route path="AccountBinding" getComponent={AccountBinding}/>
        </Route>
      </Router>
    </MediaQuery>
  </div>
  );
}

export default RouterConfig;