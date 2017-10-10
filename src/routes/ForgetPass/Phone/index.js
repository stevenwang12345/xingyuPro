import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
import './phone.css';
import { hashHistory } from 'dva/router';
import fetch from 'dva/fetch';
import { HOST } from '../../../config/config';
import Dialog from '../../../components/Dialog/';
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer';
class Phone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDialogShow: false,
			dialogStatus: 1,
			dialogMsg: '',
			currentCodePath: '',
			memberId: 0,
			uuid: 0,
			timer: null
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
		return (
				<div>
				 <Header />
			    <div className="w1170">
		            <div className="mc-title">
	                      <ul>
	                          <li><b>1.</b>确认帐号</li>
	                          <li className="curr"><b>2.</b>验证方式</li>
	                          <li><b>3.</b>验证/修改</li>
	                          <li><b>4.</b>完成</li>
	                      </ul>
                    </div>
	            	<Form onSubmit={this.handleSubmit.bind(this)} className="phone-form" style={{overflow: 'hidden'}}>
	            	        <p className="tips">您正在通过“绑定的手机”方式进行验证/修改</p>
							<div className="third">
							   <div className="item" style={{height:"50px"}}>
							        <FormItem label="您绑定的手机号:" {...formItemLayout}>
							          <Row gutter={8}>
									      <Col span={5}><div className="fl"><h2>{this.state.phone}</h2></div></Col>
							          </Row>
							        </FormItem>							        
							   </div>
							   <div className="item">
							        <FormItem label="短信验证码:" {...formItemLayout}>
								          <Row gutter={8}>
									          	<Col span={15}>
										          {getFieldDecorator('smsCode', {
										            rules: [{ required: true, message: '请输入短信验证码' }],
										          })(
										            <Input type="text" className="forget-sms-input" placeholder="请输入短信验证码" />
										          )}
										         </Col>
										         <Col span={5}>
										         	{
										         		!this.state.djsStatus ? 
										         		<span className="ant-form-text freeGetcode" onClick={this.getMessage.bind(this)}>获取短信验证码</span> 
										         		: <span className="ant-form-text freeGetcode djs" style={{cursor: 'default'}}><b>{this.state.currentSecond}</b>秒后重试</span> 
										         	}
									          	  
									          	 </Col>
								          </Row>
							        </FormItem>
							   </div>
	                           <div className="button-second">
								    <Button onClick={this.upClick.bind(this)} type="primary" htmlType="submit" style={{float: 'left', marginLeft: '110px'}}>上一步</Button>
								    <Button type="primary" htmlType="submit" style={{float: 'left', marginLeft: '40px'}}>下一步</Button>
							   </div>
							</div>
				      </Form>
			      </div>
			      <Dialog isDialogShow={this.state.isDialogShow} actionDialog={this.actionDialog.bind(this)} status={this.state.dialogStatus} msg={this.state.dialogMsg}/>
			    <Footer />
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
    upClick() {
    	window.location.href='#/forgetpass'
	}

	componentDidMount() {
	  var userInfo = this.props.location.state;
	  console.log('phone...', userInfo)
	  this.setState({
	  	  phone:userInfo.phone
	  })
	}
 
    componentWillUnmount() {
    	clearInterval(this.state.timer)
    }

    getCookie(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}

	handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        var smsCode = values.smsCode;
			//document.cookie="smsCode="+smsCode;
			var userInfo = this.props.location.state;
	        hashHistory.push({
	  			pathname: 'verification',
	  			state: {userInfo: userInfo, smsCode: smsCode}
	  		})
	      }
	    });
	}


	getMessage() {
		var userInfo = this.props.location.state;
		console.log(333333, userInfo)
	  	let phone = userInfo.phone;
	    let memberId = userInfo.memberId;
	    let uuid = userInfo.uuid;
		var url = HOST + 'api/client/member/v1.0/forget/sms/send.security'
		this.props.form.validateFields(['phone','memberId','uuid'],(err, values) => {
	      if (!err) {
	      	    var verificationCode = userInfo.verificationCode;
				let params = 'phone=' + phone + '&verificationCode=' + verificationCode + '&memberId=' + memberId +'&uuid=' + uuid;
				//console.log(params)
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
					} else {
						layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
					}
				})
	      }
	    })
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
	}


}

export default Form.create()(Phone);

