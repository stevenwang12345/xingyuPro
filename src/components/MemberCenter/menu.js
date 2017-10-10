import React from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
class MemberMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currIndex: 0
		}
	}
	render() {
		
		return (
			<div className="menus">
				<ul>
					<li style={{borderLeft: this.state.currIndex == 0 ? '2px solid #6b3906' : ''}} onClick={this.setCur.bind(this, 0)} ><Link to="memberCenter/mynews"><Icon type="mail" />我的消息</Link></li>
					<li style={{borderLeft: this.state.currIndex == 1 ? '2px solid #6b3906' : ''}} onClick={this.setCur.bind(this, 1)}><Link to="memberCenter/mybbs"><Icon type="message" />我的社区</Link></li>
					<li style={{borderLeft: this.state.currIndex == 2 ? '2px solid #6b3906' : ''}} onClick={this.setCur.bind(this, 2)}><Link to="memberCenter/mycollect"><Icon type="star-o" />我的收藏</Link></li>
					<li style={{borderLeft: this.state.currIndex == 3 ? '2px solid #6b3906' : ''}} onClick={this.setCur.bind(this, 3)}><Link to="memberCenter/mythumbup"><Icon type="like-o" />我的点赞</Link></li>
					<li style={{borderLeft: this.state.currIndex == 4 ? '2px solid #6b3906' : ''}} onClick={this.setCur.bind(this, 4)}><Link to="memberCenter/myfollow"><Icon type="heart-o" />我的关注</Link></li>
					<li style={{borderLeft: this.state.currIndex == 5 ? '2px solid #6b3906' : ''}} onClick={this.setCur.bind(this, 5)}><Link to="memberCenter/mysettings"><Icon type="setting" />账户设置</Link></li>
				</ul>
			</div>
		)
	}
	setCur(index) {
		this.setState({
			currIndex: index
		})
	}

	componentDidMount() {
		//console.log(111)
	}
	componentWillUpdate(nextProps, nextState) {
		if (this.props.isEdit != nextProps.isEdit) {
			this.setState({
				currIndex: 5
			})
		}
	}
	componentDidUpdate(prevProps, prevState) {

	
		
	}

}


export default MemberMenu;