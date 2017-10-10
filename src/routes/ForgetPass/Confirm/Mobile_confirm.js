import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal } from 'antd';
import { hashHistory } from 'dva/router';
import { HOST } from '../../../config/config';
import Dialog from '../../../components/Dialog/';
const Search = Input.Search;
const FormItem = Form.Item;
import fetch from 'dva/fetch';
import '../../../common/css/mobile.css';
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
            modal2Visible: false
		}
	}
	render() {
		const { getFieldDecorator,setFieldsValue } = this.props.form;
		return (
				<div className="confirm">
	            	<Form onSubmit={this.handleSubmit.bind(this)}>
						   <div className="item">
						        <FormItem>
								          {getFieldDecorator('userName', {
								          	initialValue: '',
								            rules: [{ required: true, message: '手机号/邮箱/用户名不能为空' }],
								          })(
								            <Input placeholder="手机号/邮箱/用户名" />
								          )}
						        </FormItem>
						   </div>
		                   <div className="item">
						        <FormItem>
						          	<div className="qtestCode">
							          {getFieldDecorator('qtestCode', {
							            rules: [{ required: true, message: '请输入验证码!' }],
							          })(
							            <Input name="qtestCode" type="text" placeholder="验证码" />
							          )}
						          	</div>
						          	<div className="qtestCode01" style={{cursor: "pointer"}}><img onClick={this.changeCode.bind(this)} src={this.state.currentCodePath} style={{height: '32px',marginTop: '0px'}}/></div>
						        </FormItem>
		                   </div>
		                    <Button type="primary" htmlType="submit" className="up-button">下一步</Button>
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

