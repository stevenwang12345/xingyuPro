import React from 'react';
import { Form, Input, Menu, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, BackTop, Spin } from 'antd';
import { HOST } from '../../config/config';
const FormItem = Form.Item;
const Search = Input.Search;
import fetch from 'dva/fetch';
import Searchbox from '../../components/Search'
import Compared from '../../components/Compared/dataindex';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import doAjax from '../../common/js/doAjax.js'
import './style.css'
const dataTimeArr = [
	{title: '昨日', dataType: '00'},
	{title: '近7日', dataType: '01'},
	{title: '30日', dataType: '02'},
	{title: '2017年5月', dataType: '03'},
	{title: '2017年4月', dataType: '04'},
	{title: '2017年3月', dataType: '05'},
	{title: '2017年2月', dataType: '06'},
	{title: '2017年1月', dataType: '07'},
	{title: '2017年12月', dataType: '08'}
]
const backGroundArr = [
	{title: '全部', dataType: '00'},
	{title: '民营系', dataType: '01'},
	{title: '银行系', dataType: '02'},
	{title: '上市公司系', dataType: '03'},
	{title: '国资系', dataType: '04'},
	{title: '风投系', dataType: '05'},
]
const averageTerm = [
	{title: '全部', dataType: '00'},
	{title: '小于3个月', dataType: '01'},
	{title: '3-6个月', dataType: '02'},
	{title: '6-12个月', dataType: '03'},
	{title: '12个月以上', dataType: '04'}
]
const averageRate = [
	{title: '全部', dataType: '00'},
	{title: '小于8%', dataType: '01'},
	{title: '8%-16%', dataType: '02'},
	{title: '16%-20%', dataType: '03'},
	{title: '20%以上', dataType: '04'}
]
const businessType = [
	{title: '全部', dataType: '00'},
	{title: '个人信贷', dataType: '01'},
	{title: '企业信贷', dataType: '02'},
	{title: '车贷', dataType: '03'},
	{title: '房贷', dataType: '04'},
	{title: '供应链金融', dataType: '05'},
	{title: '融资租赁', dataType: '06'},
	{title: '票据', dataType: '07'},
	{title: '艺术品质押', dataType: '08'},
	{title: '农村金融', dataType: '09'},
	{title: '消费金融', dataType: '10'}
]
const sort = [
	{title: '按成交量', dataType: '01'},
	{title: '按人气', dataType: '02'},
	{title: '按平台运营', dataType: '03'},
	{title: '按分散性', dataType: '04'},
]


class Data extends React.Component {
    constructor(props, context){
	    super(props, context);
	    this.state = {
			dataTimeArr: [],
	    	showMark: false,
	    	dataTimeCurrent: 0,
	    	backGroundCurrent: 0,
	    	averageTermCurrent: 0,
	    	averageRateCurrent: 0,
	    	businessTypeCurrent: 0,
	    	sortCurrent: 0,
	    	filterParams: {
	            platformName: '',
	            dataTime: '02',//数据时间
	            dataValue: '',
	            backGround: '00',//平台背景
	            averageTerm: '00',//投资期限
	            averageRate: '00',//平台收益
	            businessType: '00',//业务类型
	            sort: '01'
	    	},
	    	result: []
	    }
    }
	render() {
	    return (
	    	<div>
	    	    <BackTop />
	    		<Header />
	    		<div className="w1170">
	    			<Row>
						 <Col span={24} className="datalist">
			                  <Col span={24} className="transaction">
				                  <h2>平台成交数据</h2>
				                   <Col className="searchTime">
				                        <Col className="search" style={{marginTop:'0px'}}>
				                        	<Searchbox />
				                        </Col>
				                        <Col className="time" style={{paddingTop: '0px', display: 'none'}}>更新时间: 2017-06-26</Col>
				                   </Col>
			                   </Col>
			                   <Col span={24} className="conditional">
				                    <Col className="condition-date conditionitem">
				                         <Col className="conditionlabel" style={{float: 'left'}}>数据时间:</Col>
				                         <ul className="condition-sel" style={{float: 'left'}} ref="dataTime">
				                         	{
				                         		this.state.dataTimeArr.length > 0 ? 
				                         		this.state.dataTimeArr.map((item, index) => {
				                         			let styls = {};
				                         			if (index == this.state.dataTimeCurrent) {
				                         				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                         			}
				                         			return <li key={index}><span style={styls} onClick={this.setDateEle.bind(this, 1, index, item.dataTime, item.dataValue)}>{item.dataTitle}</span></li>
				                         		}) : ""
				                         	}
						                 </ul>
				                    </Col>
				                    <Col className="conditionitem">
				                         <Col className="conditionlabel" style={{float: 'left'}}>平台背景:</Col>
				                         <ul className="condition-sel" style={{float: 'left'}}>
				                         	{
				                         		backGroundArr.map((item, index) => {
				                         			let styls = {};
				                         			if (index == this.state.backGroundCurrent) {
				                         				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                         			}
				                         			return <li key={index}><span style={styls} onClick={this.setEle.bind(this, 2, index, item.dataType)}>{item.title}</span></li>
				                         		})
				                         	}
						                 </ul>
						                 <Col className="reset-condition" onClick={this.reset.bind(this)}>重置清空</Col>
				                    </Col>
				                    <Col className="conditionitem">
				                         <Col className="conditionlabel" style={{float: 'left'}}>投资期限:</Col>
				                         <ul className="condition-sel" style={{float: 'left'}}>
				                         	{
				                         		averageTerm.map((item, index) => {
				                         			let styls = {};
				                         			if (index == this.state.averageTermCurrent) {
				                         				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                         			}
				                         			return <li key={index}><span style={styls} onClick={this.setEle.bind(this, 3, index, item.dataType)}>{item.title}</span></li>
				                         		})
				                         	}
						                 </ul>
				                    </Col>
				                    <Col className="conditionitem">
				                         <Col className="conditionlabel" style={{float: 'left'}}>平台收益:</Col>
				                         <ul className="condition-sel" style={{float: 'left'}}>
				                         	{
				                         		averageRate.map((item, index) => {
				                         			let styls = {};
				                         			if (index == this.state.averageRateCurrent) {
				                         				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                         			}
				                         			return <li key={index}><span style={styls} onClick={this.setEle.bind(this, 4, index, item.dataType)}>{item.title}</span></li>
				                         		})
				                         	}
						                 </ul>
				                    </Col>
				                    <Col className="conditionitem" style={{display: 'none'}}>
				                         <Col className="conditionlabel" style={{float: 'left'}}>业务类型:</Col>
				                         <ul className="condition-sel" style={{float: 'left'}}>
				                         	{
				                         		businessType.map((item, index) => {
				                         			let styls = {};
				                         			if (index == this.state.businessTypeCurrent) {
				                         				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                         			}
				                         			return <li key={index}><span style={styls} onClick={this.setEle.bind(this, 5, index, item.dataType)}>{item.title}</span></li>
				                         		})
				                         	}
						                 </ul>
				                    </Col>
			                   </Col>

				          </Col>	
				          <Col span={24} className="datacondition">
			                  <ul className="condition-sel sort-ul-li" style={{float: 'left'}}>
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
			             </Col> 

			             	<Col span={24} className="table">
				            {
				            	this.state.result ? this.state.result && this.state.result.length > 0 ? <Compared mark={this.setMark.bind(this)} info={this.state.result} /> : <span className="no-data">暂无数据</span> :
				            	<span className="no-data">暂无数据</span>
				            }
				         </Col> 
	    			</Row>
	    		</div>
	    		<div className="layermark" style={{display: this.state.showMark ? '' : 'none'}}></div>
	    		<Footer />
	    	</div>
	    )
	}
	setMark(type) {
		if (type == 1) {
			this.setState({
				showMark: true
			})
		}else {
			this.setState({
				showMark: false
			})
		}
	}
	setDateEle(type, i, dataTime, dataValue) {
		const state = this.state;
		this.setState({
	  		dataTimeCurrent: i
	 	})
	 	state.filterParams.dataTime = dataTime;
	 	state.filterParams.dataValue = dataValue;
	 	this.getData();
	}
	setEle(type, i, d) {
	  	const state = this.state;
	  	if (type == 2) {
	  		this.setState({
	  			backGroundCurrent: i
	  		})
	  		state.filterParams.backGround = d;
	  	}
	  	if (type == 3) {
	  		this.setState({
	  			averageTermCurrent: i
	  		})
	  		state.filterParams.averageTerm = d;
	  	}
	  	if (type == 4) {
	  		this.setState({
	  			averageRateCurrent: i
	  		})
	  		state.filterParams.averageRate = d;
	  	}
	  	if (type == 5) {
	  		this.setState({
	  			businessTypeCurrent: i
	  		})
	  		state.filterParams.businessType = d;
	  	}
	  	if (type == 6) {
	  		this.setState({
	  			sortCurrent: i
	  		})
	  		state.filterParams.sort = d;
	  	}
	  	this.getData();
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
    reset() {
	  	const state = this.state;
	  	state.filterParams.platformName = '';
	  	state.filterParams.dataTime = '02';
	  	state.filterParams.dataValue = '';
	  	state.filterParams.backGround = '00';
	  	state.filterParams.averageTerm = '00';
	  	state.filterParams.averageRate = '00';
	  	state.filterParams.businessType = '00';
	  	state.filterParams.sort = '01';
	  	this.setState({
		  	dataTimeCurrent: 0,
			backGroundCurrent: 0,
			averageTermCurrent: 0,
			averageRateCurrent: 0,
			businessTypeCurrent: 0,
			sortCurrent: 0
	  	})
	  	this.getData();

	}
    componentDidMount() {
    	window._hmt && window._hmt.push(['_trackEvent', '数据页', '点击','访问次数']);
    	this.getDatatime();
  		this.getData();
    }
    getDatatime() {
    	var url = HOST + 'api/client/platform/v1.0/data/YM';
    	fetch(url, {method: 'GET'}).then(res => {
    		return res.json()
    	}).then(json => {
    		if(json.footer.status == '200') {
    			this.setState({
    				dataTimeArr: json.body
    			})
    		} else {
    			layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
    		}
    	})
    }
    getData() {
  		var This = this;
		var url = HOST + 'api/client/platform/v1.0/data/list';
		var params = this.obj2params(this.state.filterParams)
		let myFecthOption = {
		  	method: 'post',
		  	credentials: 'include',
		  	headers: {
		      'Accept': 'application/json, text/plain, */*',
		      'Content-Type': 'application/x-www-form-urlencoded'
		  	},
		  	body: params
	  	}
	  	fetch(url, myFecthOption).then(res => {
	  		return res.json()
	  	}).then(json => {
	  		this.setState({
	  			result: json.body
	  		})
	  	})
    }
}


export default Data;