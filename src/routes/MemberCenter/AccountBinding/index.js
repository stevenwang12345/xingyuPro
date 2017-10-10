import React from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Modal } from 'antd';
import { HOST, HOSTIMAGE } from '../../../config/config';
import Dialog from '../../../components/Dialog/';
import '../../../common/css/mobile.css';
import Footer from '../../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import fetch from 'dva/fetch';
const FormItem = Form.Item;
import { connect } from 'dva';
import '../style.css'
class CountBind extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			errorText: '',
			isDialogShow: false,
			dialogStatus: 1,
			dialogMsg: '',
			smscode: '',
			djsStatus: false,
			currentSecond: 0,
			phone: '',
			jumpDialog: false,
			timer: null,
			modal2Visible: false
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="accountbinding">
			    <div className="header"><a href="#/memberCenter/mynews"><Icon type="left" /></a><h2>手机认证</h2></div>
				<div className="personinfo-box">
					<Form onSubmit={this.handleSubmit.bind(this)}>
						<FormItem className="personalPox">
						      <span className="personaltitle">手机认证:</span>
					          {getFieldDecorator('mobileRz', {
					            rules: [{
					              required: true, message: '手机不能为空',
					            }],
					          })(
					            <Input />
					          )}
				        </FormItem>
				          <Button type="primary" htmlType="submit" className="save-form-button">
				            绑定
				          </Button>
					</Form>
				</div>
				<div id='bindPhoneBox' style={{display: 'none'}}>
					<div className="cont" style={{padding: '20px', overflow: 'hidden'}}>
						<div>
					     <p style={{marginBottom: '8px'}}>手机号: <span className="phoneNumber">{this.state.phone}</span></p>
						<input type="text" placeholder="请输入验证码" id="sms-input" className="sms-inputs" onKeyUp={this.getSmsCode.bind(this)} /> 
						{
							!this.state.djsStatus ? 
								<button type="button" className="freeCode" onClick={this.getSms.bind(this, this.state.phone)}>获取验证码</button> : 
								<button type="button" className="freeCode" style={{cursor: 'default', backgroundColor: '#eee'}} ><b>{this.state.currentSecond}</b>秒后重试</button>
						}
						</div>
					</div>
					<p style={{paddingLeft: '20px', paddingBottom: '20px', overflow: 'hidden'}}>
					<input type="button" value="确定" className="queding-btn " onClick={this.confirmSms.bind(this)}/>
					</p>
				</div>
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
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	      		this.getSms(values.mobileRz)

	      }
	    });
	}
	getSmsCode() {
		var input = document.getElementById('sms-input')
		var smscode = input.value
		this.setState({
			smscode: smscode
		})
	}
	closeDialog() {
		
	}
	getSms(phone) {
		var url = HOST + '/api/client/center/v1.0/boundPhone/send/sms.security'
	    var memberId = this.getCookie('memberId');
	    var uuid = this.getCookie('uuid');
	    let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: "memberId=" + memberId + "&uuid=" + uuid + "&phone=" + phone
	    }
	    fetch(url, myFecthOption).then((res) => {
	      return res.json()
	    }).then(json => {
	    	if (json.footer.status == '200') {
		    		layer.open({
					  type: 1,
					  title: '账户绑定',
					  area: '95%',
					  content: $('#bindPhoneBox'),
					  cancel: function(index, layero){
					  	$('#bindPhoneBox').hide()
					  }
					});
	    			this.setState({
	    				phone: phone,
	    				currentSecond: json.body.remainTime,
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
										currentSecond: json.body.remainTime
									})
								}
	    				}, 1000)
	    			})
	    	} else {
	    		layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
	    	}
	    })


	}
	confirmSms() {
		var phone = this.state.phone
		var smsCode = this.state.smscode
		var url = HOST + '/api/client/center/v1.0/boundPhone.security'
	    var memberId = this.getCookie('memberId');
	    var uuid = this.getCookie('uuid');
	    let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: "memberId=" + memberId + "&uuid=" + uuid + "&phone=" + phone + "&smsCode=" + smsCode
	    }
	    fetch(url, myFecthOption).then(res => {
	    	return res.json()
	    }).then(json => {
	    	if (json.footer.status == '200') {
	    		layer.closeAll()
	    		layer.alert('绑定成功', {icon: 5, skin: 'successbox'})
	    	} else {
	    		layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
	    	}
	    	
	    })
	}

	getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
  	}
	componentDidMount() {
		this.props.form.setFieldsValue({mobileRz: this.props.common.userInfo.phone})
	}
	componentWillUnmount() {
		clearInterval(this.state.timer);
	  }

}
function mapStateToProps({ common }) {
	return {common};
}
export default connect(mapStateToProps)(Form.create()(CountBind));