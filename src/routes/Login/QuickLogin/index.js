import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { HOST } from '../../../config/config';
import fetch from 'dva/fetch';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import Dialog from '../../../components/Dialog/'
import './style.less'
import $ from 'jquery';
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class QuickLogin extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isDialogShow: false,
	        dialogStatus: 2,
	        dialogMsg: '',
			djsStatus: false,
			currentSecond: '',
			userInfo: {},
			currentCodePath: '',
			timer: null
		}
	}
	render() {
	    const { getFieldDecorator } = this.props.form;
		return (
			<div className="quicklogin">
				<Form onSubmit={this.handleQuickSubmit.bind(this)} className="login-form">
				        <FormItem>
				          {getFieldDecorator('q-userName', {
				            rules: [{ required: true, message: '请输入手机号' }],
				          })(
				            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机号" />
				          )}
				        </FormItem>
				        <FormItem>
				          <Row gutter={8}>
				          	<Col span={8}>
					          {getFieldDecorator('q-testCode', {
					            rules: [{ required: true, message: '请输入验证码' }],
					          })(
					            <Input type="text" placeholder="验证码" className="yzm" />
					          )}
				          	</Col>
				          	<Col span={8}>
				          		<img src={this.state.currentCodePath} onClick={this.changeCode.bind(this)} style={{height: '32px',marginTop: '0'}}/>
				          	</Col>
				          	<Col span={8} style={{textAlign: 'left'}}>
				          		<span onClick={this.changeCode.bind(this)} className="changeCode">看不清？换一张</span>
				          	</Col>
				          </Row>
				        </FormItem>
				        <FormItem>
				          <Row gutter={8}>
				          	<Col span={12}>
					          {getFieldDecorator('q-dxcode', {
					            rules: [{ required: true, message: '请输入短信验证码' }],
					          })(
					            <Input type="text" className="sms-input" placeholder="请输入短信验证码" />
					          )}
					         </Col>
					         <Col span={12}>
					          {
					          	!this.state.djsStatus ? 
					          	<span className="ant-form-text sms-btn" onClick={this.getMessage.bind(this)}>获取短信验证码</span> :
					          	<span className="ant-form-text sms-btn djs-btn-style"><b>{this.state.currentSecond}</b>秒后重试</span>
					          }
				          	  
				          	 </Col>
				          </Row>
				        </FormItem>
				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            登陆
				          </Button>
				          <p className="tips" style={{textAlign: 'left'}}>提示： 未注册上海互联网金融评价中心的手机号，登录时将自动注册上海互联网金融评价中心，且代表您已同意《上海互联网金融评价中心网用户协议》</p>
				        </FormItem>
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
		var timestamp = Date.parse(new Date()); 
		var url = HOST + 'api/client/member/v1.0/code/'+ timestamp;
		this.setState({
			currentCodePath: url
		})
	}
	//获取短信验证码
	getMessage() {
		var url = HOST + 'api/client/member/v1.0/quick/send/sms'
		this.props.form.validateFields(['q-userName', 'q-testCode'],(err, values) => {
	      if (!err) {
	       		var phone = this.props.form.getFieldValue('q-userName')
				var verificationCode = this.props.form.getFieldValue('q-testCode')
				let params = 'phone=' + phone + '&verificationCode=' + verificationCode;
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
					if (json.footer.status == "600") {
						layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
						this.changeCode()
					} else {
						var remainTime = json.body.remainTime;
						this.setState({
							djsStatus: true,
							currentSecond: remainTime,
							timer: setInterval(() => {
									this.state.currentSecond = this.state.currentSecond - 1;
									this.setState({
										currentSecond: this.state.currentSecond
									})
									if (this.state.currentSecond == 0) {
										clearInterval(this.state.timer);
										this.setState({
											timer: null,
											djsStatus: false,
											currentSecond: remainTime
										})
									}
								},1000)
						})
					}
				})
	      }
	    })
	}
	//更改图片验证码
	changeCode() {
		var timestamp = Date.parse(new Date()); 
		var url = HOST + 'api/client/member/v1.0/code/'+ timestamp;
		this.setState({
			currentCodePath: url
		})
	}
    handleQuickSubmit(e) {
        e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	var phone = values['q-userName'];
	      	var smsCode =values['q-dxcode'];
	        var url = HOST + 'api/client/member/v1.0/quick/login'
	        let params = 'phone=' + phone + '&smsCode=' + smsCode;
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
				if (json.footer.status == "200") {
					var memberName = encodeURIComponent(json.body.memberName);
			  		document.cookie="memberId="+json.body.memberId + ";path=/";
			  		document.cookie="uuid="+json.body.uuid + ";path=/";
			  		document.cookie="profile="+json.body.profile + ";path=/";
	  				document.cookie="memberName="+ memberName + ";path=/";
			  		this.getUserInfo(json.body.memberId, json.body.uuid, json.body.memberName)
				} else {
					layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
				}
			})
	      }
	    });
   }
   //获取用户信息
   getUserInfo(memberId, uuid, memberName) {
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
  	  			window.location.href = "/"
		  		// hashHistory.push({
		  		// 	pathname: 'memberCenter',
		  		// 	state: {memberId: json.body.memberId, profile: json.body.profile, memberName: memberName}
		  		// })
  	  		}
  	  	}	
  	  })
   }

  componentWillUnmount() {
	clearInterval(this.state.timer);
  }
}
function mapStateToProps({ common }) {
  return {common};
}
export default connect(mapStateToProps)(Form.create()(QuickLogin))