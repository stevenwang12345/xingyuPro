import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { HOST } from '../../../config/config';
import fetch from 'dva/fetch';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { hashHistory } from 'dva/router';
import Dialog from '../../../components/Dialog/'
import $ from 'jquery'
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
			msg: '',
			modal2Visible: false
		}
	}
	render() {
	    const { getFieldDecorator, setFieldsValue } = this.props.form;
		return (
			<div className="zhlogin mobile-zhlogin">
				<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
			        <FormItem>
			          {getFieldDecorator('userName', {
			          	initialValue: '',
			            rules: [{ required: true, message: '手机号/邮箱/用户名不能为空' }],
			          })(
			            <Input className="userName" placeholder="手机号/邮箱/用户名" />
			          )}
			        </FormItem>
			        <FormItem style={{marginBottom: '5px'}}>
			          {getFieldDecorator('password', {
			          	initialValue: '',
			            rules: [{ required: true, message: '请输入密码!' }],
			          })(
			            <span>
			            <Input type="password" placeholder="密码" />
			            </span>
			          )}
			        </FormItem>
			        <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
			        <div className="reg"><a href="#reg" className="freereg">注册</a></div>
			        <a className="login-form-forgot" href="#/forgetpass">忘记密码?</a>
		      </Form>

     		<Modal
	          title=""
	          wrapClassName="vertical-center-modal"
	          visible={this.state.modal2Visible}
	          onOk={() => this.setModal2Visible(false)}
	          onCancel={() => this.setModal2Visible(false)}
	        >
	          <p>{this.state.dialogMsg}</p>
	        </Modal>
			</div>
		)
	}
	setModal2Visible(bo) {
		this.setState({
			modal2Visible: false
		})
	}
	actionDialog(status) {
		if (status == 1) {
			this.setState({
				isDialogShow: false
			})
		}
	}
	componentDidMount() {
		if (this.getCookie('memberId') && this.getCookie('uuid')) {
			hashHistory.push({pathname: 'memberCenter'})
		}
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
	  		var profile = json.body.profile;
			var memberName = encodeURIComponent(json.body.memberName);
	  		document.cookie="memberId="+memberId + ";path=/";
	  		document.cookie="uuid="+uuid + ";path=/";
	  		document.cookie="profile="+profile + ";path=/";
	  		document.cookie="memberName="+memberName + ";path=/";
	  		this.getUserInfo(memberId, uuid);
  		} else {
			layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
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
  	  			window.location.href = this.props.backRouter
  	  		} else {
  	  			window.location.href="#/memberCenter/mynews"
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