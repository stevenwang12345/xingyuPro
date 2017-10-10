import React from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Modal } from 'antd';
import { HOST } from '../../../config/config';
import fetch from 'dva/fetch';
const FormItem = Form.Item;
import { connect } from 'dva';
import Dialog from '../../Dialog/'
import '../style.css'
class CountBind extends React.Component{
	constructor(props) {
		super(props);
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
			timer: null
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 4 },
	        sm: { span: 4 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };
		return (
			<div>
				<Row>
					<Col span={24} className="personinfo-box">
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem
						          {...formItemLayout}
						          label="手机认证"
						        >
						          {getFieldDecorator('mobileRz', {
						            rules: [{
						              required: true, message: '手机不能为空',
						            }],
						          })(
						            <Input />
						          )}
					        </FormItem>
					        <FormItem>
					          <Button type="primary" htmlType="submit" className="save-form-button" style={{marginLeft: '130px'}}>
					            绑定
					          </Button>
					        </FormItem>
						</Form>
					</Col>
				</Row>
				<div id='bindPhoneBox' style={{display: 'none'}}>
					<div className="cont" style={{padding: '20px', overflow: 'hidden'}}>
						<div>
					     <p style={{marginBottom: '8px'}}>手机号: <span className="phoneNumber">{this.state.phone}</span></p>
						<input type="text" placeholder="请输入验证码" id="sms-input" onKeyUp={this.getSmsCode.bind(this)} style={{border: '1px solid #ddd', padding: '4px'}}/> 
						{
							!this.state.djsStatus ? 
								<button type="button" className="freeCode" onClick={this.getSms.bind(this, this.state.phone)}>获取验证码</button> : 
								<button type="button" className="freeCode" style={{cursor: 'default', backgroundColor: '#eee'}}><b>{this.state.currentSecond}</b>秒后重试</button>
						}
						</div>
					</div>
					<p className="errorText">{this.state.errorText}</p>
					<p style={{paddingLeft: '20px', paddingBottom: '20px', overflow: 'hidden'}}>
					<input type="button" value="确定" className="queding-btn " onClick={this.confirmSms.bind(this)}/>
					</p>
				</div>
			</div>
		)
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
				  area: '500px',
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