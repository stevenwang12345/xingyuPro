import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { HOST } from '../../../config/config';
import fetch from 'dva/fetch';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { hashHistory } from 'dva/router';
import Dialog from '../../../components/Dialog/';
import $ from 'jquery';

import './style.less'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ZhLogin extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isDialogShow: false,
			dialogStatus: 1,
			dialogMsg: '',
			userName: '',
			password: '',
			userInfo: {},
			ishide: true,
			isSuc: false,
			msg: ''
		}
	}
	render() {
	    const { getFieldDecorator, setFieldsValue } = this.props.form;
		return (
			<div className="zh">
				<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
			        <FormItem>
			          {getFieldDecorator('userName', {
			          	initialValue: '',
			            rules: [{ required: true, message: '手机号/邮箱/用户名不能为空' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} className="userName" placeholder="手机号/邮箱/用户名" />
			          )}
			        </FormItem>
			        <FormItem style={{marginBottom: '5px'}}>
			          {getFieldDecorator('password', {
			          	initialValue: '',
			            rules: [{ required: true, message: '请输入密码!' }],
			          })(
			            <span>
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
			            <a className="login-form-forgot" href="#/forgetpass" target="_blank">忘记密码</a>
			            </span>
			          )}
			        </FormItem>
			        <Button type="primary" htmlType="submit" className="login-form-button">
			            登陆
			          </Button>
			          还没有账号?<a href="#reg" className="freereg">免费注册</a>
		      </Form>

		      <Dialog isDialogShow={this.state.isDialogShow} actionDialog={this.actionDialog.bind(this)} status={this.state.dialogStatus} msg={this.state.dialogMsg}/>
			</div>
		)
	}
	actionDialog(status) {
		if (status == 1) {
			this.setState({
				isDialogShow: false
			})
		}
	}
	componentDidMount() {
		this.props.form.setFieldsValue({'userName': '', 'password': ''})
	}
	setPlaceholder() {
		if (!isPlaceholer()) {
			var text = $('.ant-input').eq(0).attr("placeholder")
			if($('.ant-input').eq(0).attr("type") == "text"){
				placeholder($('.ant-input').eq(0))
			}
		}
	}
    handleSubmit(e) {
        e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        this.doAjax(values);
	        $(".contentLogReg").hide();
	      }
	    });
   }
   getCookie(name) {
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
			else
			return null;
	}
   delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
   doAjax(values) {
   	var url = HOST + 'api/client/member/v1.0/member/login';
   	let account = values.userName; //用户账号   member01
   	let password = values.password; //用户密码  12345
   	let params = 'account=' + account + '&password=' + password;
	let myFecthOption = {
	  	method: 'post',
	  	credentials: 'include',
	  	headers: {
	      'Accept': 'application/json, text/plain, */*',
	      'Content-Type': 'application/x-www-form-urlencoded'
	  	},
	  	body: params
  	}
  	fetch(url, myFecthOption).then(res => {
  		return res.json()
  	}).then(json => {
  		if (json.footer.status == '200') {
  			var memberId = json.body.memberId;
	  		var uuid = json.body.uuid;
  			var memberName = encodeURIComponent(json.body.memberName);
  			var profile = json.body.profile;
	  		document.cookie="memberId="+memberId + ";path=/";
	  		document.cookie="uuid="+uuid + ";path=/";
	  		document.cookie="profile="+profile + ";path=/";
	  		document.cookie="memberName="+memberName + ";path=/";
	  		this.getUserInfo(memberId, uuid);
  		} else {
    			this.setState({
	    			dialogStatus: 0,
	    			isDialogShow: true,
	    			dialogMsg: json.footer.message
	    		})
  		}
  	})
   }
   //获取用户信息
   getUserInfo(memberId, uuid) {
   	  var url = HOST + 'api/client/member/v1.0/head/info.security';
   	  let params = 'memberId=' + memberId + '&uuid=' + uuid;
	  let myFecthOption = {
	  	method: 'post',
	  	credentials: 'include',
	  	headers: {
	      'Accept': 'application/json, text/plain, */*',
	      'Content-Type': 'application/x-www-form-urlencoded'
	  	},
	  	body: params
  	  }
  	  fetch(url, myFecthOption).then(res => {
  	  	return res.json()
  	  }).then(json => {
  	  	this.setState({
  	  		userInfo: json.body
  	  	})
  	  	if (json.footer.status == '200') {
  	  		if (this.props.backRouter) {
  	  			this.props.backUrl()
  	  			// window.location.href = this.props.backRouter
  	  		} else {
  	  			window.location.href="/"
				// hashHistory.push({
		  // 			pathname: 'memberCenter',
		  // 			state: {memberId: json.body.memberId, profile: json.body.profile, memberName: memberName}
		  // 		})
  	  		}
  	  	}	
  	  })
   }
   obj2params(obj) {
	  var result = '';
	  var item;
	  for(var item in obj) {
	  	result += '&' + item + '=' + encodeURIComponent(obj[item]);
	  };
	  if(result) {
	  	result = result.slice(1);
	  };
	  return result;
    }
}
function mapStateToProps({ common }) {
  return {common};
}
export default connect(mapStateToProps)(Form.create()(ZhLogin))