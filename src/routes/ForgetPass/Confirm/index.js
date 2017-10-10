import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal } from 'antd';
import { hashHistory } from 'dva/router';
import { HOST } from '../../../config/config';
import Dialog from '../../../components/Dialog/';
const Search = Input.Search;
const FormItem = Form.Item;
import fetch from 'dva/fetch';
import '../forgetpass.css'
class Confirm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDialogShow: false,
			dialogStatus: 1,
			dialogMsg: '',
			userInfos: {},
			currentCodePath: '',
            userName: '',
		}
	}
	render() {
		const { getFieldDecorator,setFieldsValue } = this.props.form;
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
            	<Form onSubmit={this.handleSubmit.bind(this)} className="first-form">
					   <div className="item">
					        <FormItem label="用户名:" {...formItemLayout}>
							          {getFieldDecorator('userName', {
							          	initialValue: '',
							            rules: [{ required: true, message: '手机号/邮箱/用户名不能为空' }],
							          })(
							            <Input className="username" placeholder="手机号/邮箱/用户名" />
							          )}
					        </FormItem>
					   </div>
	                   <div className="item">
					        <FormItem label="验证码:" {...formItemLayout}>
					          <Row gutter={8}>
					          	<Col span={8}>
						          {getFieldDecorator('qtestCode', {
						            rules: [{ required: true, message: '请输入验证码!' }],
						          })(
						            <Input className="yzm" name="qtestCode" type="text" placeholder="验证码" />
						          )}
					          	</Col>
					          	<Col span={8} style={{cursor: "pointer"}}><img onClick={this.changeCode.bind(this)} src={this.state.currentCodePath} style={{height: '32px',marginTop: '0px'}}/></Col>
					          	<Col span={8} style={{cursor: "pointer"}}><span onClick={this.changeCode.bind(this)} className="changeCode">看不清？换一张</span></Col>
					          </Row>
					        </FormItem>
	                   </div>
	                   <div id="step" className="button" style={{marginLeft: '0px'}}>
	                       <Button type="primary" htmlType="submit" className="up-button">下一步</Button>
	                   </div>
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
		this.changeCode();
	}
	//更改图片验证码
	changeCode() {
		var timestamp = Date.parse(new Date()); 
		var url = HOST + 'api/client/member/v1.0/code/'+ timestamp;
		this.setState({
			currentCodePath: url
		})
	}

	handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	//console.log(values)
	        this.ForgetPass(values);
	      }
	    });
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

  ForgetPass(values) {
  	var url = HOST + 'api/client/member/v1.0/check/account';
  	let account = values.userName;
  	var verificationCode = values.qtestCode;
    let params = 'account=' + account + '&verificationCode=' + verificationCode; 
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
    	if(json.footer.status == '200') {
    		var memberId = json.body.memberId;
	  		var uuid = json.body.uuid;
	  		var phone = json.body.phone;
	  		var userinfo_str = {phone: phone, memberId: memberId, uuid: uuid, verificationCode: verificationCode}
	  		this.setState({
	  			userInfos: userinfo_str
	  		})
	  		hashHistory.push({
	  			pathname: 'phone',
	  			state: this.state.userInfos
	  		})
    	}else{
			layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
    	}       
    })
  }
}

export default Form.create()(Confirm);

