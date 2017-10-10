import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, BackTop } from 'antd';
import { HOST } from '../../config/config';
const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './finance.css'
/*产品状态*/
const productStatus = [
     {title:'不限', dataType:''},
     {title:'预售', dataType:'01'},
     {title:'在售', dataType:'02'},
     {title:'存续', dataType:'03'},
]
/*收益类型*/
const incomeType = [
     {title:'不限', dataType:''},
     {title:'保证收益', dataType:'01'},
     {title:'保本浮动收益', dataType:'02'},
     {title:'非保本浮动收益', dataType:'03'},
]
/*运行模式*/
const operationPattern = [
     {title:'不限', dataType:''},
     {title:'封闭式非净值型', dataType:'01'},
     {title:'封闭式净值型', dataType:'02'},
     {title:'开放式非净值型', dataType:'03'},
     {title:'开放式净值型', dataType:'04'},
]
/*风险等级*/
const riskLevel = [
     {title:'不限', dataType:''},
     {title:'谨慎型产品', dataType:'01'},
     {title:'稳健性产品', dataType:'02'},
     {title:'平衡型产品', dataType:'03'},
     {title:'进取型产品', dataType:'04'},
     {title:'激进型产品', dataType:'05'},
]
/*期限类型*/
const deadlinType = [
     {title:'不限', dataType:''},
     {title:'T+0', dataType:'01'},
     {title:'7天（含）以内', dataType:'02'},
     {title:'7天-1个月（含）', dataType:'03'},
     {title:'1-3个月（含）', dataType:'04'},
     {title:'3-6个月(含)', dataType:'05'},
     {title:'6-12个月（含）', dataType:'06'},
]
const sort = [
	{title: '按风险等级排序', dataType: 'risk'},
	{title: '按预期最低收益率排序', dataType: 'minDesiredRate'},
	{title: '按预期最高收益率排序', dataType: 'maxDesiredRate'},
	{title: '按实际天数排序', dataType: 'actualDay'},
]
class Finance extends React.Component {
	constructor(props, context){
	    super(props, context);
	    this.state = {
	    	productStatusCurrent: 0,
	    	incomeTypeCurrent: 0,
	    	operationPatternCurrent: 0,
	    	riskLevelCurrent: 0,
	    	deadlinTypeCurrent: 0,
	    	sortCurrent: 0,
	    	pageCurrent: 0,
            sizeCurrent: 0,
	    	filterParams: {
	            productStatus: '',//产品状态
	            incomeType: '',//收益类型
	            operationPattern: '',//运行模式
	            riskLevel: '',//风险等级
	            deadlinType: '',//期限类型
	            sort:'risk',
	            page: 1, 
	            size: 10
	    	},
	    	info: [],
	    	result: [],
	    	isLoadMoreShow: true
	    }
  }
	componentWillMount() {}
	render() {
		return (
			<div>
				<BackTop />
				<Header />
				<div className="finance w1170" style={{paddingBottom: '20px'}}>
					<div className="finance_datalist">
						<div className="transaction">
		                  <h2>银行理财</h2>
	                    </div>
	                    <div className="conditional">
	                    	<div className="condition-date conditionitem">
	                    		<div className="conditionlabel" style={{float: 'left'}}>产品状态:</div>
                				<ul className="condition-sel"  style={{float: 'left'}}>
			                        {
			                        	productStatus.map((item, index) => {
			                        		let styles = {};
			                        		if (index == this.state.productStatusCurrent) {
			                        			styles = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
			                        		} 
			                        		return <li key={index}><span style={styles} onClick={this.setEle.bind(this, 1, index, item.dataType)}>{item.title}</span></li>
			                        	})
			                        }
				                </ul>
	                    	</div>
	                    	<div className="conditionitem">
			                     <div className="conditionlabel" style={{float: 'left'}}>收益类型:</div>
			                     <ul className="condition-sel" style={{float: 'left'}}>
			                         {
			                        	incomeType.map((item, index) => {
			                        		let styles = {};
			                        		if (index == this.state.incomeTypeCurrent) {
			                        			styles = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
			                        		} 
			                        		return <li key={index}><span style={styles} onClick={this.setEle.bind(this, 2, index, item.dataType)}>{item.title}</span></li>
			                        	})
			                        }
				                 </ul>
	                    	</div>

	                    	<div className="conditionitem">
				                     <div className="conditionlabel" style={{float: 'left'}}>运行模式:</div>
				                     <ul className="condition-sel"  style={{float: 'left'}}>
					                      {
				                        	operationPattern.map((item, index) => {
				                        		let styles = {};
				                        		if (index == this.state.operationPatternCurrent) {
				                        			styles = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                        		} 
				                        		return <li key={index}><span style={styles} onClick={this.setEle.bind(this, 3, index, item.dataType)}>{item.title}</span></li>
				                        	})
				                        }
					                 </ul>
	                    	</div>
							<div className="conditionitem">
					                     <div className="conditionlabel" style={{float: 'left'}}>风险等级:</div>
					                     <ul className="condition-sel" style={{float: 'left'}}>
						                      {
					                        	riskLevel.map((item, index) => {
					                        		let styles = {};
					                        		if (index == this.state.riskLevelCurrent) {
					                        			styles = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
					                        		} 
					                        		return <li key={index}><span style={styles} onClick={this.setEle.bind(this, 4, index, item.dataType)}>{item.title}</span></li>
					                        	})
					                        }
						                 </ul>
					        </div>
					        <div className="conditionitem">
			                     <div className="conditionlabel" style={{float: 'left'}}>期限类型:</div>
			                     <ul className="condition-sel" style={{float: 'left'}}>
				                      {
			                        	deadlinType.map((item, index) => {
			                        		let styles = {};
			                        		if (index == this.state.deadlinTypeCurrent) {
			                        			styles = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
			                        		} 
			                        		return <li key={index}><span style={styles} onClick={this.setEle.bind(this, 5, index, item.dataType)}>{item.title}</span></li>
			                        	})
			                        }
				                 </ul>
			                </div>
	                    </div>
					</div>
					<div className="condition-tab">
		                   <ul className="condition-sel mation_body_title" style={{float: 'left'}}>
	                         	{
	                         		sort.map((item, index) => {
	                         			let styls = {};
	                         			if (index == this.state.sortCurrent) {
	                         				styls = {background: '#9c6c24', color: 'white'}
	                         			}
	                         			return <li key={index} style={styls}><span onClick={this.setEle.bind(this, 6, index, item.dataType)}>{item.title} <Icon type="arrow-up" /></span></li>
	                         		})
	                         	}
	                       </ul>
		           </div>
		          <div className="details">
		               <div className="condition-sel">
		                     <ul>
		                     {
		                     	this.state.info ? this.state.info && this.state.info.length > 0 ?
		                       	this.state.info.map((item, index) => {
                                     return <li key={index}>
                                     <div className="sorting-img" style={{display: 'none'}}><Link to={{pathname: 'financeList', query: {memberId: '', uuid: '', productId: item.productId}}}><img alt="pic" src={require('../../common/img/default.gif')} /></Link></div>
                                     <div className="title"><Link target="_blank" to={{pathname: 'financeList', query: {memberId: '', uuid: '', productId: item.productId}}}>{item.productName}</Link>
                                     
                                     	{item.statusTitle ? <span className="finance_status">{item.statusTitle}</span> : ""}
                                     
                                     </div>
                                     <div className="con">
                                          <p><span>发行机构: {item.platformName}</span><span>年化收益: <font style={{color: '#6a3906', fontWeight: 'bold'}}>{item.maxDesiredRate}</font></span><span>产品类型: {item.incomeType}</span>
                                          <span>起购金额: <font style={{color: '#6a3906',fontSize: '16px',fontWeight: 'bold'}}>{item.startingSalesAmount}</font> 元</span><span>产品期限: <font style={{color: '#6a3906', fontWeight: 'bold'}}>{item.actualDay}</font> 天</span><span>风险等级: {item.riskLevel}</span><span>存续期: {item.productDate}</span><span>募集期: {item.raisedDate}</span></p></div>
                                   </li>}) : <span className="no-data">暂无数据...</span> : <span className="no-data">暂无数据...</span>
		                       }
		                     </ul>
		               </div>
		          </div>  

		          <span style={{display: this.state.isLoadMoreShow ? "" : "none"}} className="finance-loadMore" onClick={this.loadMoreData.bind(this)}>加载更多</span>
				</div>
				<Footer />
			</div>
		)
	}

  loadMoreData() {
  	// var state = this.state.filterParams;
  	// var dataSource = {...state}
  	// dataSource['page']
  	// console.log(state)
  	this._getData()
  }

  setEle(type, i, d) {
  	//console.log(type, i, d)
  	this.setState({
  		info: []
  	})
  	const state = this.state;
    state.filterParams.page = 1;
    //console.log(this.state.filterParams.page)
  	if (type == 1) {
  		this.setState({
  			productStatusCurrent: i,
  		})
  		state.filterParams.productStatus = d;
  	}
  	if (type == 2) {
  		this.setState({
  			incomeTypeCurrent: i,
  		})
  		state.filterParams.incomeType = d;;
  	}
  	if (type == 3) {
  		this.setState({
  			operationPatternCurrent: i,
  		})
  		state.filterParams.operationPattern = d;
  	}
  	if (type == 4) {
  		this.setState({
  			riskLevelCurrent: i,
  		})
  		state.filterParams.riskLevel = d;
  	}
  	if (type == 5) {
  		this.setState({
  			deadlinTypeCurrent: i,
  		})
  		state.filterParams.deadlinType = d;
  	}
  	if (type == 6) {
  		this.setState({
  			sortCurrent: i
  		})
  		state.filterParams.sort = d;
  	}
  	this._getData();
  }
  componentDidMount() {
  	window._hmt && window._hmt.push(['_trackEvent', '银行页', '点击','访问次数']);
  	this._getData();
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
  _getData() {
  	var url = HOST + 'api/client/bankFinance/v1.0/page'
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
    	//console.log(1, json)
    	this.state.filterParams.page++;
    	var currPage = this.state.filterParams.page;
    	this.state.filterParams.page = currPage
        this.setState({
            info: this.state.info.concat(json.body.records),
        })
        if (!this.state.info.length) {
        	this.setState({
        		isLoadMoreShow: false
        	})
        }
        if(json.body.isMore != "true") {
        	this.setState({
        		isLoadMoreShow: false
        	})
        } else {
        	this.setState({
        		isLoadMoreShow: true
        	})
        }
    })
  }
}
export default Finance