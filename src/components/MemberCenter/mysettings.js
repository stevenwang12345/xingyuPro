import React from 'react';
import { Icon, Tabs, Table, Form, Input } from 'antd';
const TabPane = Tabs.TabPane;
import PersonInfo from './setting/personinfo';
import ModifyCode from './setting/modifycode';
import ModifyPhoto from './setting/modifyphoto';
import CountBind from './setting/countbind';
import './style.css'
class MySettings extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="member-containter">
				<Tabs defaultActiveKey="1">
				    <TabPane tab="个人资料" key="1">
						<PersonInfo />
				    </TabPane>
				    <TabPane tab="修改密码" key="2">
              			<ModifyCode />
				    </TabPane>
				    <TabPane tab="修改头像" key="3">
              			<ModifyPhoto />
				    </TabPane>
				    <TabPane tab="账户绑定" key="4">
              			<CountBind />
				    </TabPane>
				 </Tabs>
			</div>
		)
	}
	componentDidMount() {}
}


export default MySettings;