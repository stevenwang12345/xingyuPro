import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal } from 'antd';
const Search = Input.Search;
const FormItem = Form.Item;
import { hashHistory } from 'dva/router';
import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './caryout.css';
import fetch from 'dva/fetch';
import '../../../common/css/mobile.css';
class carryout extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}
	render() {
		return (
				<div>
				    <div className="caryout">
						<div className="caryoutLogin" style={{overflow: 'hidden',paddingBottom: '50px'}}>
						      <div className="item" style={{paddingTop: '50px', color: 'green'}}><h3 style={{color: 'green'}}>您的登录密码已经重新设置，请妥善保管!</h3></div>
						      <div className="login">
						      <Button type="primary" htmlType="submit" className="quickLogin-btn" onClick={this.downClick.bind(this)}>立即登录</Button>
						      </div>
						</div>
				    </div>
			    </div>
		)
	}
	downClick() {
    	hashHistory.push('login')
	}
}

export default carryout;