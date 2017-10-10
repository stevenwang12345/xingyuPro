import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Radio, Button, Modal } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import DatePicker from 'react-datepicker';
import { HOST } from '../../../config/config';
import { connect } from 'dva';
import Dialog from '../../../components/Dialog/';
import '../../../common/css/mobile.css';
import Footer from '../../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
class PersonInfo extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
		return (
			<div className="personal">
			    <div className="header"><a href="#/memberCenter/mynews"><Icon type="left" /></a> <h2>个人信息</h2></div>
		    	<div className="personinfo-box">
					<Form onSubmit={this.handleQuickSubmit.bind(this)}>
					        <FormItem className="personalPox">
						          <span className="personaltitle">昵称:</span>
						          {getFieldDecorator('nicknanme', {
						            rules: [{ required: true, message: '请输入昵称' }],
						          })(
						            <Input placeholder="昵称" maxLength = "10" />
						          )}
					        </FormItem>
							<FormItem className="personalPox">
							  <span className="personaltitle">性别:</span>
					          {getFieldDecorator('sex')(
					            <RadioGroup>
					              <Radio value="1">男</Radio>
					              <Radio value="2">女</Radio>
					              <Radio value="0">保密</Radio>
					            </RadioGroup>
					          )}
					        </FormItem>
							<FormItem className="personalPox">
							  <span className="personaltitle">出生日期:</span>
					          {getFieldDecorator('birthday', {
							      rules: [{required: true, message: '请选择出生日期' }],
							    })(
					            	<Input style={{width: '70%'}}/>
					            )}
					        </FormItem>
					        <FormItem>
					          <div style={{fontSize:'14px'}}>签名:</div>
					          {getFieldDecorator('qianming', {
					            rules: [{ required: true, message: '请输入签名' }],
					          })(
					            <TextArea placeholder="" maxLength = "50" style={{border: '1px solid #ececec'}} autosize={{ minRows: 2, maxRows: 6 }} />
					          )}
					        </FormItem>
					          <Button type="primary" htmlType="submit" className="save-form-button">保存</Button>
				    </Form>
		    	</div>
				<Footer />
			</div>
		)
	}
	handleChange(date) {
	    this.setState({
	      startDate: date
	    });
  	}
	changeSex(e) {
		console.log(e.target.value)
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
		    		this.props.form.setFieldsValue({nicknanme: json.body.nickName})
		    		this.props.form.setFieldsValue({birthday: json.body.birthday})
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

