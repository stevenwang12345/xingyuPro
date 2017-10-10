import React from 'react';
import { Row, Col, Tabs, Anchor, Input, message, Modal, Icon  } from 'antd';
import { Link, hashHistory } from 'dva/router';
import fetch from 'dva/fetch';
import Header from '../../components/Header/Header';
import { HOST } from '../../config/config';
import MemberMenu from '../../components/MemberCenter/menu';
import MemberMain from '../../components/MemberCenter/mynews';
import { connect } from 'dva';
// import $ from 'jquery';
import './style.css';
class MemberCenter extends React.Component {
	constructor(props) {
		super(props);
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
			<div className="member-wrapper">
				<div className="member-center">
					<Row className="member-top">
						<Col span={24}>
							<div className="member-box">
								<span className="gohome"><a href="/" target="_blank">金评社首页</a></span>
								<p className="member-top-rt">
									<span className="bbs"><Link to="bbs">社区</Link></span>
									<span className="username" style={{width: 'auto'}}>
									{
										this.props.common.userInfo.nickName ? 
										this.props.common.userInfo.nickName : 
										this.state.nickName
									}
									</span>
									<i className="line"></i>
									<span className="logout" onClick={this.newLogout.bind(this)}>退出</span>
								</p>
							</div>
						</Col>
					</Row>

					<div className="member-info-box">
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
								<b>签名:</b>

								{
									this.props.common.userInfo.signature ? 
									this.props.common.userInfo.signature : 
									 (this.state.signature && this.state.signature.length > 0) ? 
								 	<span>{this.state.signature}</span> : "这家伙很懒什么都没有留下!"
								}
							</p>
							<div className="p-nav-list">
								<ul>
									<li style={{paddingLeft: '10px'}}><span>{this.state.followCount}</span>关注</li>
									<li><span>{this.state.collectionPlatformCount}</span>平台</li>
									<li><span>{this.state.fansCount}</span>粉丝</li>
									<li><span>{this.state.collectionNFBCount}</span>收藏</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="member-info-wrapper">
						<MemberMenu/>
						{this.props.children}
					</div>
				</div>
				<div className="member-footer">© ©2017 沪ICP备11002007号  |   主办：上海互联网金融评价中心有限公司</div>
			</div>
			

		)
	}
	newLogout() {
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
	    		window.location.href="#/login"
	    	} else {
	    		layer.alert(json.body.msg, {icon: 1, skin: 'warnbox'});
	    	}
	    })
	}
	componentDidMount() {
		window._hmt && window._hmt.push(['_trackEvent', '会员中心页', '点击','访问次数']);
		if (this.getCookie('memberId') && this.getCookie('uuid')) {
			this.doAjax();
			window.location.href="#/memberCenter/mynews"
		} else {
			hashHistory.push('login')
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
				collectionNFBCount: json.body.collectionNFBCount
	    	})
	    })
	}
	

}
function mapStateToProps({ common }) {
	return {common};
}
export default connect(mapStateToProps)(MemberCenter);

