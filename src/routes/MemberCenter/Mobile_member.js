import React from 'react';
import { Row, Col, Tabs, Anchor, Input, message, Modal, Icon  } from 'antd';
import { Link, hashHistory } from 'dva/router';
import fetch from 'dva/fetch';
import Header from '../../components/Header/Header';
import { HOST } from '../../config/config';
import MemberMenu from '../../components/MemberCenter/menu';
import { connect } from 'dva';
import Footer from '../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../common/css/mobile.css';
class MemberCenter extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			signature: null,
			profile: '',
			nickName: '',
			collectionCount: 0,
			fansCount: 0,
			thumbupCount: 0,
			followCount: 0,
			collectionPlatformCount: 0,
			collectionNFBCount: 0
		}
	}
	render() {
		return (
			<div>
				<div className="member">
					<Row className="member-top">
						<Col span={24}>
							<div className="member-box">
								<a href="http://www.1-1.com:8080/home/" target="_blank"><span className="gohome">金评社首页</span></a>
								<p className="member-top-rt">
									<i className="line"></i>
									<span className="logout" onClick={this.logout.bind(this)}>退出</span>
								</p>
							</div>
						</Col>
					</Row>

					<div className="member-head">
					    <div className="member-header">
							<div className="member-photo">
								{
									this.props.common.userInfo.profile ?
										<img src={this.props.common.userInfo.profile} /> : 
										<img src={this.state.profile} />
								}
							</div>
							<div className="member-info-txt">
								<h2>
									{
										this.props.common.userInfo.nickName ? 
										this.props.common.userInfo.nickName : 
										this.state.nickName
									}
								</h2>
								<p>
									签名:

									{
										this.props.common.userInfo.signature ? 
										this.props.common.userInfo.signature : 
										 (this.state.signature && this.state.signature.length > 0) ? 
									 	<span>{this.state.signature}</span> : "这家伙很懒什么都没有留下!"
									}
								</p>
							</div>
					    </div>
						<div className="member-list">
							<ul>
								<li><p>{this.state.followCount}</p>关注</li>
								<li><p>{this.state.collectionPlatformCount}</p>平台</li>
								<li><p>{this.state.fansCount}</p>粉丝</li>
								<li><p>{this.state.collectionNFBCount}</p>收藏</li>
							</ul>
					    </div>
					</div>

					<div className="memberList">
					     <ul>
					        <a href="#/personal"><li><Icon type="file-text" /> 个人资料 <span className="arrow"> <Icon type="right" /> </span></li></a>
					        <a href="#/changepassword"><li><Icon type="key" /> 修改密码 <span className="arrow"> <Icon type="right" /> </span></li></a>
					        <a href="#/modifyavatar"><li><Icon type="user" /> 修改头像 <span className="arrow"> <Icon type="right" /> </span></li></a>
					        <a href="#/accountbinding"><li><Icon type="select" /> 账户绑定 <span className="arrow"> <Icon type="right" /> </span></li></a>
					     </ul>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
	logout() {
		var url = HOST + 'api/client/member/v1.0/loginout.security';
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
	    		$.cookie('memberId', '', { expires: -1, path: '/' }); // 删除 cookie
	    		$.cookie('uuid', '', { expires: -1, path: '/' }); // 删除 cookie
	    		$.cookie('profile', '', { expires: -1, path: '/' }); // 删除 cookie
	    		$.cookie('memberName', '', { expires: -1, path: '/' }); // 删除 cookie
	    		// this.delCookie('memberId')
	    		// this.delCookie('uuid')
	    		// this.delCookie('profile')
	    		// this.delCookie('memberName')
	    		window.location.href="#/login"
	    	} else {
				alert(json.body.msg)
	    	}
	    })
	}
	componentDidMount() {
		if (this.getCookie('memberId') && this.getCookie('uuid') && !this.getCookie('isForgetCode')) {
			this.doAjax()
			hashHistory.push('memberCenter/mynews')
		} else {
			window.location.href="#/login"
		}
		
	}
	getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
  	}
  	delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
	doAjax() {
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
	    	//console.log(333333, json)
	    	this.props.dispatch({
		      type:'common/querySuccess',
		      payload: {userInfo: {phone: json.body.phone}}
		    })
	    	this.setState({
	    		signature: json.body.signature,
	    		profile: json.body.profile,
	    		nickName: json.body.nickName,
	    		collectionCount: json.body.collectionCount,
	    		fansCount: json.body.fansCount,
	    		thumbupCount: json.body.thumbupCount,
	    		followCount: json.body.followCount,
	    		collectionPlatformCount: json.body.collectionPlatformCount,
				collectionNFBCount: json.body.collectionNFBCount,
	    	})
	    })
	}
	

}
function mapStateToProps({ common }) {
	return {common};
}
export default connect(mapStateToProps)(MemberCenter);
// export default MemberCenter;

