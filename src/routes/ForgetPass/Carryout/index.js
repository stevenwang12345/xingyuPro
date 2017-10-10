import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
import { hashHistory } from 'dva/router';
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer';
import './caryout.css';
import fetch from 'dva/fetch';
class carryout extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
				<div>
					 <Header />
				    <div className="w1170">
				        <div className="mc-title">
		                      <ul>
		                          <li><b>1.</b>确认帐号</li>
		                          <li><b>2.</b>验证方式</li>
		                          <li><b>3.</b>验证/修改</li>
		                          <li className="curr"><b>4.</b>完成</li>
		                      </ul>
	                    </div>
						<div className="five" style={{overflow: 'hidden',paddingBottom: '50px'}}>
						      <div className="item" style={{paddingTop: '50px', color: 'green'}}><h3 style={{color: 'green'}}><Icon type="check" />您的登录密码已经重新设置，请妥善保管!</h3></div>
						      <div className="login">
						      <Button type="primary" htmlType="submit" className="quickLogin-btn" onClick={this.downClick.bind(this)}>立即登录</Button>
						      </div>
						</div>
				    </div>
				    <Footer />
			    </div>
		)
	}
	downClick() {
    	hashHistory.push('login')
	}
}

export default carryout;