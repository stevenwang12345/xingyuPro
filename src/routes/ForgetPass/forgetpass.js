import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table } from 'antd';
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router';
// import './forgetpass.css';
import Confirm from './Confirm';
class Financetab extends React.Component {
    constructor(props, context) {
		super(props, context);
		this.state = {
	    	report: {},
	    	currIndex: 0
		};
	}
	render() {
		return (
			<div>
				<Header />
				<div className="w1170">
				     <div className="mod-main mod-comm">
	                      <div className="mc">
	                          <div className="mc-title">
		                          <ul>
			                          <li className="curr"><b>1.</b>确认帐号</li>
			                          <li><b>2.</b>验证方式</li>
			                          <li><b>3.</b>验证/修改</li>
			                          <li><b>4.</b>完成</li>
		                          </ul>
	                          </div>
	                          <div className="form">
	                                <Confirm/>
	                          </div>                             
	                      </div>
	                 </div> 
				</div>
				<Footer />
			</div>
				
		)

	}
}

export default Form.create()(Financetab);



















