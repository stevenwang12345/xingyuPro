import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Form, Icon, Input, Button, Checkbox, Carousel  } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import ZhLogin from './ZhLogin/Mobile_zhlogin';
import QuickLogin from './QuickLogin/Mobile_quicklogin';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ThirdLogin from '../../components/ThirdLogin/ThirdLogin';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../common/css/mobile.css';
class Login extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			backRoute: ''
		}
	}
	render() {
	    const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Header />
				<div className="login">
				     <Tabs defaultActiveKey="1">
					    <TabPane tab="账号登陆" key="1">
					      <ZhLogin backRouter={this.state.backRoute} />
					    </TabPane>
					    <TabPane tab="快捷登陆" key="2">
					      <QuickLogin backRouter={this.state.backRoute} />
					    </TabPane>
				  	 </Tabs>
				  	<ThirdLogin />
				</div>
				<Footer />
			</div>
		)
	}
	componentDidMount() {
		var router = this.props.params.router;
		this.setState({
			backRoute: router
		})
	}
}

export default Form.create()(Login)