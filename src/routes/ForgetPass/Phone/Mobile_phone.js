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
import Footer from '../../../components/Footer/Footer'
import PureRenderMixin from 'react-addons-pure-render-mixin';
class Phone extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
		return (
				<div>
				 <Header />
			    <div className="phone">
	            	<Form onSubmit={this.handleSubmit.bind(this)} style={{overflow: 'hidden'}}>
							<div className="phoneContent">
							   <div className="item" style={{height:"50px"}}>
							        <FormItem label="您绑定的手机号:" >
                                         <div className="fl"><h2>{this.state.phone}</h2></div>
							        </FormItem>							        
							   </div>
							   <div className="item">
							        <FormItem className="phoneInput">
								          <Row gutter={8}>
									          	<Col span={14}>
										          {getFieldDecorator('smsCode', {
										            rules: [{ required: true, message: '请输入短信验证码' }],
										          })(
										            <Input type="text" className="forget-sms-input" placeholder="请输入短信验证码" />
										          )}
										         </Col>
										         <Col span={9}>
										         	{
										         		!this.state.djsStatus ? 
										         		<span className="layui-btn layui-btn-primary layui-btn-small" onClick={this.getMessage.bind(this)}>获取短信验证码</span> 
										         		: <span className="layui-btn layui-btn-primary layui-btn-small" style={{cursor: 'default'}}><b>{this.state.currentSecond}</b>秒后重试</span> 
										         	}
									          	  
									          	 </Col>
								          </Row>
							        </FormItem>
							   </div>
							    <Button type="primary" htmlType="submit">下一步</Button>
							</div>
				      </Form>
			      </div>
			     <Footer />
			    </div>
		)
	}
    upClick() {
    	window.location.href='#/forgetpass'
	}

	componentDidMount() {
	  var userInfo = this.props.location.state;
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

