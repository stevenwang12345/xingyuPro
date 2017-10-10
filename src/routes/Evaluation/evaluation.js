import React from 'react';
import { connect } from 'dva';
import { HOST, HOSTIMAGE } from '../../config/config';
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import { Form, Input, Menu, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Tabs, Radio, BackTop, Spin } from 'antd';
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './evaluation.css';
import Compared from '../../components/Compared';
class Evaluation extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
	    	mode: 'top',
	    	showMark: false,
	    	filterParams: {},
	    	result: [],
	    	report:[],
	    	ymdList: [],
	    	modal1Visible: false,
	    	filterData: []
	    }
	}
	setModalVisible() {
		this.setState({
			modal1Visible: false
		})
	}
	render() {
		const { mode } = this.state;
		return (
			<div>
				<BackTop />
				<Header />
				<div className="evaluation w1170">
				     <Row>
				         <Col span={24} className="SolemnlyTab">
				               <div className="solemnly">
				                     <h2>郑重说明</h2>
				                     <ul className="txt">
							             <li>1. 平台发展指数是表征某一家平台综合情况的指标，代表平台综合影响力，不表征平台安全性，不构成投资建议！</li>
							             <li>2. 网贷有风险，投资需谨慎，本页面所提供的信息仅作为参考与研究用途，不构成平台业绩证据，平台不做任何推荐。</li>
							             <li>3. 银行、信托榜单中的数据来源于各银行及信托公司2015年度报告（昆仑信托的数据来源于其2014年度报告）。</li>
							             <li>4. 网贷榜单中各月份的数据来源于各网贷公司官网，部分网贷平台未披露历史总交易额，暂时空置。</li>
							        </ul>
				               </div>
				         </Col>
				         <Col span={24} className="nav listreports">
				         	<div className="evaluation-tab">
								<Tabs defaultActiveKey="1" className="Tab">
								    <TabPane tab="平台榜单" key="1">
								          <div className="displayData">
					               			<div className="table">
					               				{/*平台榜单*/}
					               				<div className="bangdan">
					               					<Tabs defaultActiveKey="1" tabPosition={mode} onTabClick={this.dataYmd.bind(this)} style={{ height: 50 }} >
					               						{
					               							this.state.ymdList ? 
					               							this.state.ymdList.map((item, index) => {
					               								return <TabPane tab={item.title} key={item.key}></TabPane>
					               							}) : ""
					               						}
					               					</Tabs>
					               				</div>
					               			    {/*平台榜单对应数据列表*/}
					               			    <table className="data-table evalu-table" style={{border: 0, cellspacing: 0, cellpadding: 0}}>
														
														<colgroup>
															    <col width="80" />
															    <col width="200" />
															    <col width="100" />
															    <col width="140" />
															    <col width="140" />
															    <col width="200" />
																<col width="140" />
															    <col width="130" />
															    <col />
														</colgroup>

														<thead>
															<tr>
																<th style={{width: '80px'}}>序号</th>
																<th style={{width: '200px'}}>平台名称</th>
																<th style={{width: '100px'}}>透明度</th>
																<th style={{width: '140px'}}>基础指标</th>
																<th style={{width: '140px'}}>运营指标</th>
																<th style={{width: '200px'}}>风控指标</th>
																<th style={{width: '140px'}}>合规指标</th>
																<th style={{width: '130px'}}>综合</th>
																<th style={{width: '38px'}}>对比</th>
															</tr>
														</thead>
														<tbody>
                          										{
                          											this.state.result && this.state.result.length > 0 ?
																		this.state.result.map((item, index) => {
																				let styles = {}
																				if ((index + 1) % 2 == 0) {styles = {background: '#faf2e5'}}
																						return <tr key={index} style={styles}>
																							<td style={{width: '80px'}}>{index+1}</td>
																							<td style={{width: '180px'}}>
																							<span style={{color: '#9d6d25'}}><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}} style={{color: '#9d6d25'}} title={item.platformName} target="_blank">{item.platformName}</Link></span></td>
																					{
																						item.dimensionls.map((item1, index1) => {
																							return <td key={index1}>{item1.score}</td>
																								})
																					}
																					<td>{item.totalScore}</td>
																					<td>
											 										<input type="checkbox" checked={item.ischeck} value={item.platformName} onChange={(e) => {this.showComparedModal(e, item.platformId)}} lay-skin="primary" />
																					</td>
																						</tr>
																					}) : <tr><td colSpan="9"><span className="no-data" tip="Loading...">暂无数据</span></td></tr>
																				}
														</tbody>
					               			    </table>
												<div className="" id="compared-list" style={{display: 'none'}}>
													<div>
					  								{
					  									this.state.filterData.length > 0 ? 
					  									this.state.filterData.map((item, index) => {
		          										return <p className="modal-p" key={index}>{item.platformName} <Icon onClick={this.deleteData.bind(this, item.platformId)} className="fr" style={{width: '20px', height: '20px',marginTop: '4px', float: 'right'}} type="close-circle-o" /></p>
			          									}) : ""
			          								}
		          	 								 <Button type="primary" className="compared-btn" onClick={this.showCompareDialog.bind(this)}>对比</Button>
													</div>
												</div>





												<div id="data-box" style={{display: 'none'}}>
													<table className="layui-table" lay-even lay-skin="row" lay-size="lg" style={{width: '800px'}}>
													  <colgroup>
													    <col width="100" />
													    <col width="100" />
													    <col width="100" />
													    <col width="100" />
													    <col width="100" />
													    <col width="100" />
													    <col width="100" />
													    <col />
													  </colgroup>
													  <thead>
														<tr>
															<th>序号</th><th>平台名称</th><th>透明度</th><th>基础指标</th><th>运营指标</th>
															<th>风控指标</th><th>合规指标</th><th>综合</th>
														</tr>
													  </thead>
													  <tbody>
														{    
												          	this.state.filterData.map((item, index) => {
												          		return <tr className="comparedModal-tr" key={index}>
												          		<td style={{borderLeft: '0'}}>{index+1}</td>
												          		<td><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}} style={{color: '#9d6d25'}} target="_blank" >{item.platformName}</Link></td>
									                            {
																	item.dimensionls.map((item1, index1) => {
																		return <td key={index1}>{item1.score}</td>
																	})
															     }
												          		<td>{item.totalScore}</td></tr>
												          	})
												        }
													  </tbody>
													</table>
												</div>
					                  		</div>
						                  </div>
								    </TabPane>
								    <TabPane tab="平台报告" key="2">
								          <div className="platformreportTime">
								               {
								               	this.state.report ?
								                this.state.report.map((item2, index2) => {
								                    return <li onClick={this.Download.bind(this, item2.key)} key={index2}><span>{item2.title}</span></li>
								                }) : <span className="no-data"></span>
								               }
								          </div>
								    </TabPane> 
							  	</Tabs>
				         	</div>
				         </Col>
				     </Row>
				</div>
				<div className="layermark" style={{display: this.state.showMark ? '' : 'none'}}></div>
				<Footer />
			</div>
		)
	}
	componentDidMount() {
		window._hmt && window._hmt.push(['_trackEvent', '评价页', '点击','访问次数']);
		this.getYmd(); //平台榜单年月日
		this._getData();//默认获取榜单数据
	  	this._getReport();//平台报告

	  	var top = $('.evalu-table').offset().top;
		$(window).scroll((event) => {
			var winPos = $(window).scrollTop();
			if(top <= winPos) {
				$('.evalu-table thead').addClass('theadFixed')
			} else {
				$('.evalu-table thead').removeClass('theadFixed')
			}
		})


	}
	//平台榜单年月日
	getYmd() {
		let url = HOST + 'api/client/assess/v1.0/billboard/dataYmd';
		let myFecthOption = {
			method:'get'
		}
	    fetch(url,myFecthOption).then(res => {
	    	return res.json()
	    }).then(json => {
	    	this.setState({
	    		ymdList: json.body
	    	})
	    })	
	}
	//点击年月日切换榜单
	dataYmd(key) {
		this._getData(key)
	}
	//获取榜单
    _getData(key='') {
  	  let url = HOST + 'api/client/assess/v1.0/billboard/init?billboardYmd=' + key;
  	  let myFecthOption = {
	  	method: 'get',
  	  }
  	  fetch(url, myFecthOption).then(res => {
  		return res.json()
  	  }).then(json => {
  		json.body.map((item, index) => {
  			item.ischeck = false
  		})
  		this.setState({
  			result: json.body,
  			modal1Visible: false,
  			filterData: []
  		})
  	   })
    }

    //显示平台对比
    showComparedModal(e, platformId) {
    	let checked = e.target.checked;
    	if (checked) {
    		if (this.state.filterData.length < 5) { 
    			this.getResult(platformId)
    		} else {
    			layer.alert('最多选择五个元素', {icon: 1});
    			e.target.checked = !e.target.checked;
    		}
    	} else {
		  	this.state.result.map((item, index) => {
		  		if (item.platformId == platformId) {
		  			item.ischeck = false;
		  		}
		  	})
			this.state.filterData.map((item, index) => {
		  	 	if (item.platformId == platformId) {
		  	 		this.state.filterData.splice(index,1)
		  	 		this.setState({
		  	 			filterData: this.state.filterData
		  	 		})
		  	 	}
		  	 })
    	}
    	if(this.state.filterData.length <= 0) {
  	 		layer.closeAll()
  	 	}
		 var index = layer.open({
			  type: 1,
			  title: '平台对比', 
			  area: '400px',
			  shade: 0,
			  closeBtn: 1,
			  content: $('#compared-list'), //这里content是一个普通的String
			  cancel: function(index, layero) {
			  	$('#compared-list').hide()
			  }
		});
    }
    //从总数据中过滤选择需要的元素
    getResult(platformId) {
    	this.state.result.map((item, index) => {
    		if (platformId == item.platformId) {
    			item.ischeck = true;
    			this.state.filterData.push(item)
    			this.setState({
    				modal1Visible: true,
    				filterData: this.state.filterData
    			})
    		}
    	})
    }
    //显示平台数据对比弹窗
    showCompareDialog() {
    	if (this.state.filterData.length <= 0) {
    		layer.alert('没有平台对比', {icon: 1});
    		return;
    	}
    	layer.open({
		  type: 1,
		  title: '平台对比', 
		  area: '800px',
		  closeBtn: 1,
		  content: $('#data-box'), //这里content是一个普通的String
		  cancel: function(index, layero) {
		  	$('#data-box').hide()
		  }
		});
    }
    //点击删除按钮删除平台数据
    deleteData(platformId) {
	  	 this.state.filterData.map((item, index) => {
	  	 	if (item.platformId == platformId) {
	  	 		this.state.filterData.splice(index,1)
	  	 		this.setState({
	  	 			filterData: this.state.filterData
	  	 		})
	  	 	}
	  	 })
	  	this.state.result.map((item, i) => {
 			if (item.platformId == platformId) {
 				item.ischeck = false;
 			}
 		})
 		if(this.state.filterData.length <= 0) {
 			$('#compared-list').hide()
 			layer.closeAll()
 		} 
    }
	obj2params(obj) {
	  var result = '';
	  var item;
	  for(var item in obj) {
	  	result += '&' + item + '=' + encodeURIComponent(obj[item]);
	  };

	  if(result) {
	  	result = result.slice(1);
	  };
	  return result;
  	}
  	//平台报告
	_getReport() {
	    let url = HOST + 'api/client/assess/v1.0/billboard/reportList';
	    let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: this.obj2params(this.state.filterParams)
	    }
	    
	    fetch(url, myFecthOption).then(res => {
	        return res.json()
	    }).then(json => {
	        this.setState({
	            report: json.body
	        })
	    })
  	}
  	//下载平台报告
  	_getDownload(billboardYmd='201705') {
	  let url = HOSTIMAGE + 'api/image/billboard/v1.0/report/download?billboardYmd=' + billboardYmd;
	  let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: this.obj2params(this.state.filterParams)
	    }
	    fetch(url, myFecthOption).then(res => {
	        return res.json()
	    }).then(json => {
	        this.setState({
	            download: json.body
	        })
	       window.open(this.state.download.path, '_blank')
	    })
	}
	Download(billboardYmd) {
	    this._getDownload(billboardYmd);
  	}
}
export default Evaluation;