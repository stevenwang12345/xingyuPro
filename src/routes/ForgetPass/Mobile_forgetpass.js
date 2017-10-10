import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table } from 'antd';
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
import { Link } from 'react-router';
import './forgetpass.css';
import Confirm from './Confirm/Mobile_confirm';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PureRenderMixin from 'react-addons-pure-render-mixin';
class Financetab extends React.Component {
    constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
	    	report: {},
	    	currIndex: 0
		};
	}
	render() {
		
		return (
			<div>
				<Header />
				<div className="confirm">
				     <div className="mod-main mod-comm">
	                      <div className="mc"><Confirm /></div>
	                 </div> 
				</div>
				<Footer />
			</div>
				
		)

	}
}

export default Form.create()(Financetab);



















