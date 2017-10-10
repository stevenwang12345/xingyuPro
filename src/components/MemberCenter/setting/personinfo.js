import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Radio, Button, Modal } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import DatePicker from 'react-datepicker';
import { HOST } from '../../../config/config';
import { connect } from 'dva';
class PersonInfo extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isDialogShow: false,
			dialogStatus: 1,
			dialogMsg: '',
			startDate: '',   //moment("20111031", "YYYYMMDD"
			nickName: '',
			sex: 0,
			birthday: ''
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
							<Form onSubmit={this.handleQuickSubmit.bind(this)} className="login-form" style={{width: '600px'}}>
							        <FormItem label="昵称" {...formItemLayout} >
							          {getFieldDecorator('nicknanme', {
							            rules: [{ required: true, message: '请输入昵称' }],
							          })(
							            <Input placeholder="昵称" />
							          )}
							        </FormItem>
									<FormItem
							          {...formItemLayout}
							          label="性别"
							        >
							          {getFieldDecorator('sex')(
							            <RadioGroup>
							              <Radio value="1">男</Radio>
							              <Radio value="2">女</Radio>
							              <Radio value="0">保密</Radio>
							            </RadioGroup>
							          )}
							        </FormItem>
									<FormItem
							          {...formItemLayout}
							          label="出生日期"
							        >
							          {getFieldDecorator('birthday', {
									      rules: [{required: true, message: '请选择出生日期' }],
									    })(
									    	<div>
							            	<Input className="layui-input" placeholder="请选择出生日期(0000-00-00)" />
							            	
							            	</div>
							            )}
							        </FormItem>
							        <FormItem label="签名" {...formItemLayout}>
							          {getFieldDecorator('qianming', {
							            rules: [{ required: true, message: '请输入签名' }],
							          })(
							            <TextArea placeholder="请输入签名" autosize={{ minRows: 2, maxRows: 6 }} />
							          )}
							        </FormItem>

							        <FormItem>
							          <Button type="primary" htmlType="submit" className="save-form-button">
							            保存
							          </Button>
							        </FormItem>
						    </Form>
				    	</Col>
				    </Row>
			</div>
		)
	}
	handleChange(date) {
	    this.setState({
	      startDate: date
	    });
  	}
	changeSex(e) {
	}
	componentDidMount() {
		this._isMounted = true;
		this.getUserinfo();
		 var laydate = layui.laydate;
		console.log(111, laydate)
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
		    		this.props.form.setFieldsValue({nicknanme: json.body.nickName})
		    		this.props.form.setFieldsValue({birthday: this.setZero(json.body.birthday)})
		    		this.props.form.setFieldsValue({qianming: json.body.signature})
		    		this.props.form.setFieldsValue({sex: json.body.sex})
		    		var datestr = this.getStr(json.body.birthday)
			    	this.setState({
			    		nickName: json.body.nickName,
			    		birthday: json.body.birthday
			    	})
		    	}
	    	} else {
	    		layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
	    	}

	    })
	}
	setZero(birthday) {
		let y = birthday.split('-')[0];
		let m = birthday.split('-')[1].length < 2 ? '0' + birthday.split('-')[1] : birthday.split('-')[1];
		let d = birthday.split('-')[2].length < 2 ? '0' + birthday.split('-')[2] : birthday.split('-')[2];
		return y + '-' + m + '-' + d;
	}
	getStr(str) {
		var originstr = ""
		originstr += str.split('-')[0] + str.split('-')[1] + str.split('-')[2];
		return originstr;
	}
	handleQuickSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	    	if (!err) {
	    		this.savePersonInfo()
	    	}
	    })
	}
	savePersonInfo() {
		var url = HOST + '/api/client/center/v1.0/memberInfo/update.security'
    	var memberId = this.getCookie('memberId');
    	var uuid = this.getCookie('uuid');
    	var nickName = this.props.form.getFieldValue('nicknanme')
    	var sex = this.props.form.getFieldValue('sex')
    	var birthday = this.props.form.getFieldValue('birthday')
    	var signature = this.props.form.getFieldValue('qianming')
    	
	    let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: "memberId=" + memberId + "&uuid=" + uuid + "&nickName=" + nickName + "&sex=" + sex + "&birthday=" + birthday + "&signature=" + signature
	    }
	    fetch(url, myFecthOption).then(res => {
	    	return res.json()
	    }).then(json => {
	    	if (json.footer.status == '200') {
	    		layer.alert('保存信息成功', {icon: 5, skin: 'successbox'});
	    		this.props.dispatch({
			      type:'common/querySuccess',
			      payload: {userInfo: {nickName: nickName, signature: signature}}
			    })
			    document.cookie="memberName="+ nickName + ";path=/";
	    	} else {
				layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
	    	}
	    })
	}
	  componentWillUnmount() {
	    this._isMounted = false
	  }
}


function mapStateToProps({ common }) {
	return {common};
}
export default connect(mapStateToProps)(Form.create()(PersonInfo));

