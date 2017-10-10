import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Form, Icon, Input, Button, Checkbox, Carousel  } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import ZhLogin from './ZhLogin';
import QuickLogin from './QuickLogin';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ThirdLogin from '../../components/ThirdLogin/ThirdLogin'
import './style.css'
class Login extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			backRoute: ''
		}
	}
	render() {
	    const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Header />
				<div className="loginWrapper" style={{clear: 'both', margin: '0 auto'}}>
					<Row>
						<Col span={16}>
						 <div style={{width: '100%',height: '300px'}}>
						 	<img alt="pic" src={require('../../common/img/login-banner.jpg')} />
						 </div>
						</Col>
						<Col span={6} offset={1}>
							<Tabs defaultActiveKey="1">
							    <TabPane tab="账号登陆" key="1">
							      <ZhLogin backRouter={this.state.backRoute} />
							    </TabPane>
							    <TabPane tab="快捷登陆" key="2">
							      <QuickLogin backRouter={this.state.backRoute} />
							    </TabPane>
						  	</Tabs>
						  	<ThirdLogin />
						</Col>
					</Row>
				</div>
				<Footer />
			</div>
		)
	}
	componentDidMount() {
		window._hmt && window._hmt.push(['_trackEvent', '登录页', '点击','访问次数']);
		$('.nav_column li').removeClass('cur')
		var router = this.props.params.router;
		this.setState({
			backRoute: router
		})
	}
}

export default Form.create()(Login)