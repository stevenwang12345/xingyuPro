import React from 'react';
import { Icon, Row, Col, Tabs, Form, BackTop, Spin } from 'antd';
import { connect } from 'dva';
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';
import { Link, hashHistory } from 'dva/router';
// import $ from 'jquery';
import ZhLogin from '../../components/Loginlayer/ZhLogin';
import QuickLogin from '../../components/Loginlayer/QuickLogin';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import './style.css'

let newPage = 1;
class Bbs extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			currIndex: 0,
			modelId: -1,
			page: 1,
			size: 10,
			isMore: false,
			records: [],
			moduleList: [],
			essenceList: [],
			newTieziList: [],
			hotList: [],
			monthhotList: [],
			baoguantaiList: []
		}
	}
	  getBackUrl() {
	   window.location.reload()
	  }
	render() {
		let router = "#"+this.props.location.pathname + this.props.location.search;
		return (
			<div style={{clear: 'both'}}>
			    <BackTop />
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
                                      <ZhLogin backRouter={router} backUrl={this.getBackUrl.bind(this)} />
                                    </TabPane>
                                    <TabPane tab="快捷登陆" key="2">
                                      <QuickLogin backRouter={router} backUrl={this.getBackUrl.bind(this)} />
                                    </TabPane>
                                  </Tabs>
                              </Col>
                            </Row>
                          </div>
                     </div>
                </div>
				<div className="bbs w1170">
				  <div className="bbs-left">
					  <ul className="module-list">
					  	{
					  		this.state.moduleList.length > 0 ?
					  		this.state.moduleList.map((item, index) => {
					  			return <li key={index} style={{borderTop: this.state.currIndex == index ? '2px solid #a16d24' : '', color: this.state.currIndex == index ? '#a16d24' : ''}} onClick={this.switchTab.bind(this, index, item.modelId)}>{item.modelName}</li>
					  		}) : ""
					  	}
					  </ul>
					  <div className="bbs-list">
					  		{
					  			this.state.records.length > 0 ? 
					  			this.state.records.map((item, index) => {
					  				return <div key={index} className="bbs-unit">
					  					<img src={item.memberProfile} width="50" height="50" className="memberProfile"/>
					  					<div className="txt">
					  						<div className="bbstitle">
					  							<Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}} >{item.bbsTitle} </Link>
					  						    {
					  						    	item.isTop == 1 ?
					  								<span className="top">置顶</span> :
					  								""
					  						    }
					  						</div>
					  						<div className="bbs-main">
					  							{
					  								item.bbsProfile ?
					  								<img src={item.bbsProfile} width="128" height="90" className="pic"/> :
					  								""
					  							}
					  							<div className="zy-rt">
					  								<p>
					  								{
					  									(item.bbsContent.length > 50) ? item.bbsContent.substr(0, 80, '...'): item.bbsContent
					  									
					  								}
					  								<Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}} >查看全文</Link></p>
					  								<p style={{marginTop: '10px'}}><span className="memberName"><Icon type="user" /> {item.memberName}</span> <span className="datetime">{item.dateTime}</span></p>
					  							</div>
					  						</div>
					  					</div>
					  				</div>
					  			}) : <span className="no-data"><Spin size="large" /></span>
					  		}
					  </div>
					  {
					  	this.state.isMore == 'true' ? 
					  	 <p className="loadmore-box"><span className="loadMore" onClick={this.loadMoreData.bind(this)}>加载更多</span></p> : " "
					  }
					 
				  </div>
				  <div className="bbs-right">
				        <a className="pub-btn2 fright postThread" onClick={this.publishSubject.bind(this)} style={{marginBottom: '20px'}}>发表主题</a>
				  		<div className="tiezi-unit">
				  			<div className="tiezi-title">精华帖</div>
				  			<ul>
					  			{
					  				this.state.essenceList.length > 0 ? 
					  				this.state.essenceList.map((item, index) => {
					  					return <li key={index}><Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link><span className="memberName">{item.memberName}</span></li>
					  				}) : <span className="no-data"><Spin size="large" /></span>
					  			}
				  			</ul>
				  		</div>
				  		<div className="tiezi-unit">
				  			<div className="tiezi-title">最新帖</div>
				  			<ul>
					  			{
					  				this.state.newTieziList.length > 0 ? 
					  				this.state.newTieziList.map((item, index) => {
					  					return <li key={index}><Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link><span className="memberName">{item.memberName}</span></li>
					  				}) : <span className="no-data"><Spin size="large" /></span>
					  			}
				  			</ul>
				  		</div>
				  		<div className="tiezi-unit">
				  			<div className="tiezi-title">一周最热</div>
				  			<ul>
					  			{
					  				this.state.hotList.length > 0 ? 
					  				this.state.hotList.map((item, index) => {
					  					return <li key={index}><Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link><span className="memberName">{item.memberName}</span></li>
					  				}) : <span className="no-data"><Spin size="large" /></span>
					  			}
				  			</ul>
				  		</div>
				  		<div className="tiezi-unit">
				  			<div className="tiezi-title">一月最热</div>
				  			<ul>
					  			{
					  				this.state.monthhotList.length > 0 ? 
					  				this.state.monthhotList.map((item, index) => {
					  					return <li key={index}><Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link><span className="memberName">{item.memberName}</span></li>
					  				}) : <span className="no-data"><Spin size="large" /></span>
					  			}
				  			</ul>
				  		</div>
				  		<div className="tiezi-unit">
				  			<div className="tiezi-title">曝光台</div>
				  			<ul>
					  			{
					  				this.state.baoguantaiList.length > 0 ? 
					  				this.state.baoguantaiList.map((item, index) => {
					  					return <li key={index}><Link to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link><span className="memberName">{item.memberName}</span></li>
					  				}) : <span className="no-data"><Spin size="large" /></span>
					  			}
				  			</ul>
				  		</div>
				  </div>
				</div>
				<Footer />
			</div>
		)
	}
	 publishSubject() {
	      var memberId = this.getCookie('memberId')
	      var uuid = this.getCookie('uuid')
	      if (!memberId && !uuid) {
	        $(".contentLogReg").show();
	        return;
	      }
	      hashHistory.push('publicSubject')
	  }
		closeLogin() {
		    $(".contentLogReg").hide();
		  }
      getCookie(name) {
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if(arr=document.cookie.match(reg))
	    return unescape(arr[2]);
	    else
	    return null;
	  }
	componentDidMount() {
		window._hmt && window._hmt.push(['_trackEvent', '社区页', '点击','访问次数']);
		var queryObj = this.props.location.query;
		if (queryObj.Type == '1') {
			this.getModuleList();
			this.switchTab(1, '1');
		} else {
			this.getModuleList();
			this.getBbsList(this.state.modelId, 1);
			this.getEssence();
			this.getHot();
			this.getNewTiezi();
			this.getMonthHot();
			this.getBaoguang();
		}
	}
	switchTab(currIndex, modelId) {
		this.setState({
			currIndex: currIndex,
			modelId: modelId,
			records: [],
			
		})
		newPage = 1;
		this.getBbsList(modelId, 1)
	}
	//获取精华帖
	getEssence() {
		var url = HOST + 'api/client/bbs/v1.0/list';
		var This = this;
		$.ajax({
            type: "post",
            url: url,
            data: {type: '01', limit: 10},
            dataType: "json",
            async: true,
            cache: false,
			xhrFields: {
			    withCredentials: true
			},
    		crossDomain: true,
            success: function(res){
               if (res.footer.status == '200') {
               	 This.setState({
               	 	essenceList: res.body
               	 })
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }

        });
	}
	//最新帖
	getNewTiezi() {
		var url = HOST + '/api/client/bbs/v1.0/list';
		var This = this;
		$.ajax({
            type: "post",
            url: url,
            data: {type: '02', limit: 10},
            dataType: "json",
            async: true,
            cache: false,
            crossDomain: true == !(document.all),
            success: function(res){
               if (res.footer.status == '200') {
               	 This.setState({
               	 	newTieziList: res.body
               	 })
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
	}
	getHot() {
		var url = HOST + '/api/client/bbs/v1.0/list';
		var This = this;
		$.ajax({
            type: "post",
            url: url,
            data: {type: '03', limit: 10},
            dataType: "json",
            async: true,
            cache: false,
            success: function(res){
               if (res.footer.status == '200') {
               	 This.setState({
               	 	hotList: res.body
               	 })
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
	}
	//一周最热
	getHot() {
		var url = HOST + '/api/client/bbs/v1.0/list';
		var This = this;
		$.ajax({
            type: "post",
            url: url,
            data: {type: '03', limit: 10},
            dataType: "json",
            async: true,
            cache: false,
            success: function(res){
               if (res.footer.status == '200') {
               	 This.setState({
               	 	hotList: res.body
               	 })
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
	}
	//一月最热
	getMonthHot() {
		var url = HOST + '/api/client/bbs/v1.0/list';
		var This = this;
		$.ajax({
            type: "post",
            url: url,
            data: {type: '04', limit: 10},
            dataType: "json",
            async: true,
            cache: false,
            success: function(res){
               if (res.footer.status == '200') {
               	 This.setState({
               	 	monthhotList: res.body
               	 })
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
	}
	//曝光台
	getBaoguang() {
		var url = HOST + '/api/client/bbs/v1.0/list';
		var This = this;
		$.ajax({
            type: "post",
            url: url,
            data: {type: '05', limit: 10},
            dataType: "json",
            async: true,
            cache: false,
            success: function(res){
               if (res.footer.status == '200') {
               	 This.setState({
               	 	baoguantaiList: res.body
               	 })
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
	}
	getMonthHot() {
		var url = HOST + '/api/client/bbs/v1.0/list';
		var This = this;
		$.ajax({
            type: "post",
            url: url,
            data: {type: '04', limit: 10},
            dataType: "json",
            async: true,
            cache: false,
            success: function(res){
               if (res.footer.status == '200') {
               	 This.setState({
               	 	monthhotList: res.body
               	 })
               }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
	}
	getPageNum() {
		newPage++;
		return newPage;
	}
	loadMoreData() {
		var page = this.getPageNum()
		//console.log('page...', page)
		this.getBbsList(this.state.modelId, page);
	}

	getModuleList() {
		var url = HOST + "/api/client/bbs/v1.0/model/list";
		fetch(url, {method: 'GET', mode: 'cors'}).then((res) => {
			return res.json()
		}).then(json => {
			this.setState({
				moduleList: json.body
			})
		})
	}
	getBbsList(modelId, page) {
		var url = HOST + "api/client/bbs/v1.0/page";
		let myFecthOption = {
		  	method: 'post',
		  	credentials: 'include',
		  	mode: 'cors',
		  	headers: {
		      'Accept': 'application/json, text/plain, */*',
		      'Content-Type': 'application/x-www-form-urlencoded'
		  	},
	  		body: "modelId=" + modelId + "&page=" + page + "&size=" + this.state.size
  		}
  		fetch(url, myFecthOption).then((res) => {
  			return res.json()
  		}).then(json => {
  			console.log(888, json)
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
	

}

export default Bbs;