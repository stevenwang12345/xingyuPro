import React from 'react';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Modal } from 'antd';
const FormItem = Form.Item;
import { HOST } from '../../../config/config';
import Dialog from '../../../components/Dialog/';
import Footer from '../../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../../common/css/mobile.css';
class ModifyCode extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			isDialogShow: false,
			dialogStatus: 1,
			dialogMsg: '',
			confirmDirty: false,
			hasePassword: 0
		}
		
	}
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="changepassword">
			        <div className="header"><a href="#/memberCenter/mynews"><Icon type="left" /></a><h2>修改密码</h2></div>
				 	<div className="personinfo-box">
						<Form onSubmit={this.handleSubmit.bind(this)}>
							{
								this.state.hasePassword == 1 ? 
								<FormItem className="personalPox">
						          {getFieldDecorator('oldPassword', {
						            rules: [{
						              required: true, message: '原密码不能为空',
						            }],
						          })(
						            <Input type="password" placeholder="旧密码"/>
						          )}
					        </FormItem> : ""
							}
					        <FormItem className="personalPox">
					          {getFieldDecorator('newPassword', {
					            rules: [{
					              required: true, message: '新密码不能为空',
					            }, {
					              validator: this.checkConfirm,
					            }],
					          })(
					            <Input type="password" placeholder="新密码" />
					          )}
					        </FormItem>
					        <FormItem className="personalPox">
					          {getFieldDecorator('confirmPassword', {
					            rules: [{
					              required: true, message: '确认密码不能为空',
					            }, {
					              validator: this.checkPassword,
					            }],
					          })(
					            <Input type="password" placeholder="新密码" />
					          )}
					        </FormItem>
					          <Button type="primary" htmlType="submit" className="save-form-button">
					            保存
					          </Button>
						</Form>
				 	</div>
			</div>
		)
	}
	handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	      	var memberId = this.getCookie('memberId');
    		var uuid = this.getCookie('uuid');
    		let myFecthOption = {}
	      	if (this.state.hasePassword == '1') {
	      		var url = HOST + '/api/client/center/v1.0/password/reset.security'
	      		var oldPassword= values.oldPassword;
	        	var newPassword = values.newPassword;
	        	myFecthOption = {
			        method: 'post',
			        credentials: 'include',
			        headers: {
			          'Accept': 'application/json, text/plain, */*',
			          'Content-Type': 'application/x-www-form-urlencoded'
			        },
			        body: "memberId=" + memberId + "&uuid=" + uuid + "&oldPassword=" + oldPassword + "&newPassword=" + newPassword
	    		}
	      	} else {
	      		var url = HOST + '/api/client/center/v1.0/password/set.security'
	      		var newPassword = values.newPassword;
	      		myFecthOption = {
			        method: 'post',
			        credentials: 'include',
			        headers: {
			          'Accept': 'application/json, text/plain, */*',
			          'Content-Type': 'application/x-www-form-urlencoded'
			        },
			        body: "memberId=" + memberId + "&uuid=" + uuid + "&newPassword=" + newPassword
	    		}
	      	}
	      	
	    	fetch(url, myFecthOption).then(res => {
	    		return res.json()
	    	}).then(json => {
	    		if (json.footer.status == '200') {
	    			layer.alert('修改密码成功', {icon: 5, skin: 'successbox'});
	    		} else {
	    			layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
	    		}
	    	})
	      }
	    });
	}
	componentDidMount() {
		this._isMounted = true;
		this.getUserinfo()
	}
	getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
  	}
	getUserinfo() {
		var url = HOST + '/api/client/member/v1.0/info.security';
    	var memberId = this.getCookie('memberId');
    	var uuid = this.getCookie('uuid');
	    let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: "memberId=" + memberId + "&uuid=" + uuid
	    }
	    fetch(url, myFecthOption).then(res => {
	    	return res.json()
	    }).then(json => {
	    	if (json.footer.status == '200') {
		    	if (this._isMounted) {
		    		this.setState({
		    			hasePassword: json.body.hasePassword
		    		})
		    	}
	    	} else {
	    		layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
	    	}

	    })
	}
	componentWillUnmount() {
	    this._isMounted = false
	}


}

export default Form.create()(ModifyCode);