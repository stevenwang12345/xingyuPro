import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
import { hashHistory } from 'dva/router';
import './verification.css';
import fetch from 'dva/fetch';
import Dialog from '../../../components/Dialog/';
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { HOST } from '../../../config/config';
class verification extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			isDialogShow: false,
			dialogStatus: 1,
			dialogMsg: '',
			modal2Visible: false
		}
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
				<div>
					<Header />
			    	<div className="verification">
	            	<Form onSubmit={this.handleSubmit.bind(this)}>
	            	    <p style={{padding: '20px', color: 'green', textAlign: 'center', fontSize: '14px'}}>您的验证已经成功通过,<br/>请立即修改您的登录密码!</p>
						<div>
						   <div className="item">
						        <FormItem className="verificationBottom">
						          {getFieldDecorator('password', {
						            rules: [{ required: true, message: '请输入新密码' },{
						              validator: this.checkConfirm,
						            }],
						          })(
						            <Input placeholder="请输入新密码" type="password" />
						          )}
						        </FormItem>
						   </div>

						   <div className="item">
						        <FormItem className="verificationBottom">
						          {getFieldDecorator('newpassword', {
						            rules: [{ required: true, message: '请再次输入新密码' },{
						              validator: this.checkPassword,
						            }],
						          })(
						            <Input placeholder="请再次输入新密码" type="password"/>
						          )}
						        </FormItem>
						   </div>
						   <Button type="primary" htmlType="submit">下一步</Button>
						</div>
				      </Form>
			      </div>
			       <Modal
			          title=""
			          wrapClassName="vertical-center-modal"
			          visible={this.state.modal2Visible}
			          onOk={() => this.setModal2Visible(false)}
			          onCancel={() => this.setModal2Visible(false)}
			        >
			          <p>{this.state.dialogMsg}</p>
			        </Modal>
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
	setModal2Visible(bo) {
		this.setState({
			modal2Visible: false
		})
	}
    componentDidMount() {
    	//console.log('verification...', this.props.location.state)
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
	        this.getMessage();
	      }
	    });
	}


     getMessage() {
     	var infoObj = this.props.location.state;
     	console.log('verifation...', infoObj)
	  	let smsCode = infoObj.smsCode;
	  	let memberId = infoObj.userInfo.memberId;
	  	let uuid = infoObj.userInfo.uuid;
	    //let memberId = this.getCookie('memberId');
	    //let uuid = this.getCookie('uuid');
	    var password = this.props.form.getFieldValue('password');
	    //console.log(5555555555555555,smsCode,password);
		var url = HOST + 'api/client/member/v1.0/forget/password/reset.security';
		this.props.form.validateFields(['memberId','uuid','smsCode','password'],(err, values) => {
	      if (!err) {
				let params ='&memberId=' + memberId +'&uuid=' + uuid + '&smsCode=' + smsCode + '&password=' + password;
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
                        hashHistory.push('carryout')
					} else {
						layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
					}
				})
	        }
	    })
	}

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  }
   upClick() {
    	hashHistory.push({
    		pathname: 'phone',
    		state:  this.props.location.state.userInfo
    	})
	}

}

export default Form.create()(verification);

