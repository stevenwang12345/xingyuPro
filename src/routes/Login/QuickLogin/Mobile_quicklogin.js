import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { HOST } from '../../../config/config';
import fetch from 'dva/fetch';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import './style.less'
import $ from 'jquery';
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class QuickLogin extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
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
				            <Input placeholder="手机号" className="mobile_phone_input"/>
				          )}
				        </FormItem>
				        <FormItem>
				          <Row gutter={8}>
				          	<Col span={10}>
					          {getFieldDecorator('q-testCode', {
					            rules: [{ required: true, message: '请输入验证码' }],
					          })(
					            <Input type="text" placeholder="验证码" className="yzm" />
					          )}
				          	</Col>
				          	<Col span={8}>
				          		<img src={this.state.currentCodePath} onClick={this.changeCode.bind(this)} style={{marginTop: '15px'}}/>
				          	</Col>
				          	<Col span={6} style={{textAlign: 'center'}}>
				          		<span onClick={this.changeCode.bind(this)} className="changeCode">换一张</span>
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
					          	<span className="layui-btn layui-btn-primary layui-btn-small" style={{marginTop: '8px'}} onClick={this.getMessage.bind(this)}>获取短信验证码</span> :
					          	<span className="layui-btn layui-btn-primary layui-btn-small" style={{marginTop: '8px'}} ><b>{this.state.currentSecond}</b>秒后重试</span>
					          }
				          	  
				          	 </Col>
				          </Row>
				        </FormItem>
				        <FormItem>
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            登陆
				          </Button>
				          <p className="tips" style={{textAlign: 'left', lineHeight: '18px', color: '#999', paddingTop: '10px'}}><b>提示:</b> 未注册上海互联网金融评价中心的手机号，登录时将自动注册上海互联网金融评价中心，且代表您已同意《上海互联网金融评价中心网用户协议》</p>
				        </FormItem>
			    </Form>
			</div>
		)
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
			  		var memberId = json.body.memberId;
			  		var uuid = json.body.uuid;
			  		var profile = json.body.profile;
			  		var memberName = encodeURIComponent(json.body.memberName);
			  		document.cookie="memberId="+memberId  + ";path=/";
			  		document.cookie="uuid="+uuid + ";path=/";
			  		document.cookie="profile="+profile + ";path=/";
			  		document.cookie="memberName="+memberName + ";path=/";
			  		this.getUserInfo(memberId, uuid)
				} else {
					layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
				}
			})
	      }
	    });
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
  	  		window.location.href="/"
  	  		//window.location.href='#/memberCenter?memberId=' + json.body.memberId
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
// export default Form.create()(QuickLogin)