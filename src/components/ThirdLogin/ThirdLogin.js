import React from 'react';
import { Row, Col, Tabs } from 'antd';

class ThirdLogin extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Row style={{display: 'none'}}>
			<Col span={24} className="otherLogin">第三方登陆</Col>
				<Col span={12} className="qq-login">
				    <a>QQ登陆</a>
				    <span id="qqLoginBtn"></span>
					
				</Col>
				<Col span={12} className="wx-login">
					微信登陆
				</Col>
			</Row>
		)
	}
	componentDidMount() {
		// QC.Login({
  //      		btnId:"qqLoginBtn"	//插入按钮的节点id
		// });
	}
}
export default ThirdLogin
