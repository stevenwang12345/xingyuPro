import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal, BackTop } from 'antd';
import { Link, hashHistory } from 'dva/router';
import fetch from 'dva/fetch';
import { HOST } from '../../config/config';
import { connect } from 'dva';
import Dialog from '../../components/Dialog/';
import LoginDialog from '../../components/Dialog/loginDialog';
import ZhLogin from '../../components/Loginlayer/ZhLogin';
import QuickLogin from '../../components/Loginlayer/QuickLogin';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './style.css';
import $ from 'jquery';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
let newPage = 1;
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
			collectionNFBCount: 0,
			essentialslist: [],
			isMemberCollection: 0,
			Bbscontent:'',
			foreignKey:'',
			records: [],
			id:'',
			page:1,
			size:10,
			isMore: false,
			memberId:''
		}
	}
	render() {
		return (
			<div>
         <Header />
                <div className="contentLogReg" style={{display:"none"}}>
                     <div className="login-mask"></div>
                     <div className="login-box">
                          <div className="close" onClick={this.closeLogin.bind(this)}><Icon type="close" /></div>
                          <div className="loginWrapper" style={{width: '100%',paddingTop: '0px'}}>
                            <Row>
                              <Col span={20} offset={2}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="账号登陆" key="1">
                                      <ZhLogin backRouter={this.state.backRoute}/>
                                    </TabPane>
                                    <TabPane tab="快捷登陆" key="2">
                                      <QuickLogin />
                                    </TabPane>
                                  </Tabs>
                              </Col>
                            </Row>
                          </div>
                     </div>
                </div>

				<div className="member-center">
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

						<div className="fright">
						     {
                                this.state.isMemberCollection ? 
                                <a className="p-btn-2" href="javascript:void(0)">已关注</a>
                                : this.state.memberId == this.getCookie('memberId') ? <a className="p-btn-2" href="javascript:void(0)">关注</a> : 
                                <a className="p-btn-2" href="javascript:void(0)" onClick={this.guanzhu.bind(this, this.state.memberId)}>关注</a>
                               
                              }
						</div>
					</div>

					<div className="p-content">
					     <div className="p-con-left fleft">
					          <div className="p-con-ul">
					                <ul>
					                   {
					                   	this.state.records.length > 0 ? 
					                   	this.state.records.map((item, index) => {
					                   		 return <li key={index}>
							                       <strong className="p-li-title"><Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link></strong>
							                       <div className="p-li-headTime">
								                       <img className="himg" src= {this.state.profile}/>
								                       <span className="ft14"><Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.memberName} </Link></span>
								                       <span className="gray"> 发表于 {item.dateTime}</span>
							                       </div>
							                       <div className="p-li-txt">{item.bbsContent}</div>
							                       <div className="p-li-view">
							                            <a className="p-btn-3" target="_blank" href="javascript:void(0)">{item.modelName}</a>
							                            <span><Icon type="eye" /> {item.collectionCount}</span>
							                            <span><Icon type="message" /> {item.commentCount}</span>
							                       </div>
					                   		 </li>
					                   	}) : <span className="no-data">暂无数据</span>
					                   }
					                </ul>
					                {
								  	 this.state.isMore == 'true' ? 
								  	 <p className="loadmore-box"><span className="loadMore" onClick={this.loadMoreData.bind(this)}>加载更多</span></p> : " "
								    }
					          </div>
					     </div>

					     <div className="p-con-right fright">
	                           <div className="bbs-hot bbs-read  n-nav">
	                                <div className="bg-nav"><span className="avtive">最新精华</span></div>
	                                <div className="hot-list">
		                                  <ul>
	                                         {
	                                            this.state.essentialslist.length > 0 ? 
	                                            this.state.essentialslist.map((item, index) => {
	                                              return <li key={index}>
	                                                 <em>{index+1}</em><Link target="_blank" to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link>
	                                               </li>  
	                                            }):"暂无数据"        
	                                          }
		                                  </ul>
	                                 </div>
	                           </div>
					     </div>
					</div>
                 
				</div>
        <Footer />
			</div>
		)
	}
	getPageNum() {
		newPage++;
		return newPage;
	}
	loadMoreData() {
		var page = this.getPageNum()
		this.getBbsList(page);
	}
	  closeLogin() {
	    $(".contentLogReg").hide();
	  }
	 //精华贴
	  getEssentials() {
	      var url = HOST + '/api/client/bbs/v1.0/list';
	      var memberId = this.props.location.query.memberId;
	      var uuid = this.getCookie('uuid');
	      var num = '';
	      let myFecthOption = {
	          method: 'post',
	          credentials: 'include',
	          headers: {
	            'Accept': 'application/json, text/plain, */*',
	            'Content-Type': 'application/x-www-form-urlencoded'
	          },
	          body: "&type=01&limit=10"
	      }
	      fetch(url, myFecthOption).then(res => {
	        return res.json()
	      }).then(json => {
	        if (json.footer.status == '200') {
	          num = this.state.num ++;
	          this.setState({
	            essentialslist:json.body,
	            num:this.state.num
	          })
	        } else {
	          alert(json.footer.message)
	        }
	      })
	  }

	 guanzhu(tomemberId) {
	 	var memberId = this.getCookie('memberId')
	    var uuid = this.getCookie('uuid')
	    if (!memberId && !uuid) {
	      $(".contentLogReg").show();
	      this.setState({
	        isLoginDialogShow: true,
	        dialogMsg: '您尚未登录'
	      })
	    } else {
	        this.gzMember(tomemberId)
	    }
	  }
	  //关注会员
	  gzMember(tomemberId) {
	      var url = HOST + 'api/client/center/v1.0/member/collection.security'
	      var memberId = this.getCookie('memberId')
	      var uuid = this.getCookie('uuid');
	      var type = '01';
	      let myFecthOption = {
	          method: 'post',
	          credentials: 'include',
	          headers: {
	            'Accept': 'application/json, text/plain, */*',
	            'Content-Type': 'application/x-www-form-urlencoded'
	          },
	          body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + type + "&fansId=" + tomemberId
	      }
	      fetch(url, myFecthOption).then(res => {
	        return res.json()
	      }).then(json => {
	        if (json.footer.status == '200') {
	          this.setState({
	            isMemberCollection: 1
	          })
	        } else {
	          alert(json.footer.message)
	        }
	      })
	  }
	 //获取详情
	getBbsList(page) {
		var memberId = this.props.location.query.memberId;
	    var uuid = this.getCookie('uuid');
		var url = "http://10.10.20.201/client/api/client/bbs/v1.0/member/page";
		let myFecthOption = {
		  	method: 'post',
		  	credentials: 'include',
		  	headers: {
		      'Accept': 'application/json, text/plain, */*',
		      'Content-Type': 'application/x-www-form-urlencoded'
		  	},
	  		body: "memberId=" + memberId + "&uuid=" + uuid + "&page=" + page + "&size=10"
  		}
  		fetch(url, myFecthOption).then((res) => {
  			return res.json()
  		}).then(json => {
  			this.setState({
  				isMore: json.body.isMore,
  				records: this.state.records.concat(this.filterResult(json.body.records))
  			})
  		})
	}
    filterResult(data) {
		 let newArr = []
		 data.map((item, index) => {
		 	var str = item.bbsContent.replace(/<[^>]+>/g,"")
		 	item['bbsContent'] = str;
		 	newArr.push(item);
		 })
		 return newArr
	}
	componentDidMount() {
		var memberId = this.props.location.query.memberId;
        this.getBbsList(1);
		this.getEssentials();
		this.doAjax();
		this.setState({
			memberId:memberId
		})
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
		var memberId = this.props.location.query.memberId;
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

