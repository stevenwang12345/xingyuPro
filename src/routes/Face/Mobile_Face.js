import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Link } from 'dva/router';
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import $ from 'jquery';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../common/css/mobile.css';
const onLineTime = [
	{title: '不限', dataType: ''},
	{title: '2017年', dataType: '2017'},
	{title: '2016年', dataType: '2016'},
	{title: '2015年', dataType: '2015'},
	{title: '2014年', dataType: '2014'},
	{title: '2013年', dataType: '2013'},
	{title: '2012年', dataType: '2012'},
	{title: '2011年', dataType: '2011'},
	{title: '2010年', dataType: '2010'},
	{title: '2009年', dataType: '2009'},
	{title: '2008年', dataType: '2008'},
	{title: '2007年', dataType: '2007'},
	{title: '2006年', dataType: '2006'},
	{title: '2005年', dataType: '2005'},
	{title: '2004年', dataType: '2004'},
	{title: '2003年', dataType: '2003'}
]
const warningData = [
	{title: '全部', dataType: ''},
	{title: '提现困难', dataType: '01'},
	{title: '跑路', dataType: '02'},
	{title: '网站异常', dataType: '03'},
	{title: '重大舆情', dataType: '04'},
	{title: '虚假宣传', dataType: '05'},
	{title: '互金指数过低', dataType: '06'},
	{title: '停业', dataType: '07'}
]
function randomData() {
    return Math.round(Math.random()*1000);
}
const tabStyle = {}
class Face extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			warnCurrent: 0,
			warnCurrent1: 0,
			currIndex: 0,
			currPlatIndex: 0,
			provinces: [],
			platFormList: [],
			provincesArr: [],
			warningPlat: [],
			isShow: true,
			isShow1: false,
			tabIndex: 0
		}
	}
	render() {
		return (
			<div>
			    <Header />
				<div className="face-wrapper face">
				    <ul className="faceNav">
				    	<li onClick={this.setTabChange.bind(this, 0)}><span style={{backgroundColor: this.state.tabIndex == 0 ? 'white': '',fontWeight: this.state.tabIndex == 0 ? 'bold': '',color: this.state.tabIndex == 0 ? '#9c6c22': '',borderBottom: this.state.tabIndex == 0 ? '2px solid #6b3906': ''}}>网贷平台</span></li>
				    	<li onClick={this.setTabChange.bind(this, 1)}><span style={{backgroundColor: this.state.tabIndex == 0 ? 'white': '',fontWeight: this.state.tabIndex == 1 ? 'bold': '',color: this.state.tabIndex == 1 ? '#9c6c22': '',borderBottom: this.state.tabIndex == 1 ? '2px solid #6b3906': ''}}>问题平台</span></li>
				    </ul>
				    <div className="face-main" style={{display: this.state.isShow ? '': 'none'}}>
				    	<div className="faceCityTime">
				    			<Row className="timeBox">
				    				<Col span={24} className="tit" style={{marginBottom: '15px', fontSize: '18px'}}>
					    				上线时间
					    			</Col>
					   				<Col span={24}>
					   					<ul className="time">
					   					   {
						   						onLineTime.map((item, index) => {
						   							let styls = {};
				                         			if (index == this.state.currIndex) {
				                         				styls = {color: '#9c6c24'}
				                         			}
							    					return <li key={index}><span style={styls} onClick={this.filterData.bind(this, index, item.dataType)}>{item.title}</span></li>
							    				})   	
					   					   }
					    				</ul>
					    			</Col>
					    		</Row>
					    		<Row className="provincesBox">
				    				<Col span={24} className="tit" style={{marginBottom: '15px', fontSize: '18px'}}>
					    				平台省份
					    			</Col>
					   				<Col span={24}>
					   				    <ul className="provinces">
												{
													this.state.provinces.length > 0 ? 
													this.state.provinces.map((item, index) => {
														let styls = {};
														if (index == this.state.currPlatIndex) {styls = {color: '#9c6c24'}}
														return <li key={index}>
															<span style={styls} onClick={this.setScroll.bind(this,index)}>{item.title}<span className="cnt">({item.cnt})</span></span>
														</li>
													}) : ""
												}
					    				</ul>
					    			</Col>
					    		</Row>
				    	</div>
				    	<div className="plat-unit">
				    		{
				    			this.state.platFormList.length > 0 ?
				    			this.state.platFormList.map((item, index) => {
								    	return <Row key={index} className="unit zc-data">
								    		<Col span={24} className="subtit" style={{textAlign: 'left', marginBottom: '10px'}}>{item.title}: <span className="red">({item.cnt})</span></Col>
								    		<Col span={24}>
								    			<ul className="platFormList-ul">
								    			{
								    				item.platform.length > 0 ?
								    				item.platform.map((itm,i) => {
								    					return <li key={i}><Link to={{pathname: 'platDetail', query: {platformId: itm.platformId}}}>{itm.platformName}</Link></li>
								    				}) : ''
								    			}
								    			</ul>
								    		</Col>
								    	</Row>
				    			}) : <span className="no-data"><Spin size="large" /></span>
				    		}
				        </div>
				    </div>
				    <div className="face-main" style={{display: this.state.isShow1 ? '': 'none'}}>
				    	<div className="faceMain">
				    		{
				    			warningData.map((item, index) => {
	    						    let styls = {};
	                     			if (index == this.state.warnCurrent) {
	                     				styls = {color: '#9c6c24'}
	                     			}
				    				return <li key={index} style={styls} onClick={this.filterWarn.bind(this, index, item.dataType)}>{item.title}</li>
				    			})
				    		}
				    	</div>
				    	<Row className="facewarn">
				    		{
				    		this.state.warningPlat.length > 0 ?
				    			this.state.warningPlat.map((item, index) => {
				    				let styls = {};
	                     			if (index == this.state.warnCurrent1) {
	                     				styls = {color: '#9c6c24'}
	                     			}
				    				
				    				return <Col span={6} key={index} style={styls} onClick={this.setWarnScroll.bind(this,index)}>{item.title}<span className="cnt">({item.cnt})</span></Col>
				    			})
				    			:
				    			<span className="no-data"><Spin size="large" /></span>
				    		}
				    	</Row>
				    	<div className="plat-unit">
				    		{
				    			this.state.warningPlat.length > 0 ?
				    			this.state.warningPlat.map((item, index) => {
								    	return <Row key={index} className="unit warn-data ">
								    		<Col span={24} className="subtitle" style={{marginBottom: '10px'}}>{item.title} <span className="red">({item.cnt})</span></Col>
								    		<Col span={24}>
								    			<ul className="platFormList-ul">
								    			{
								    				item.platform.length > 0 ?
								    				item.platform.map((itm,i) => {
								    					return <li key={i}><Link to={{pathname: 'platDetail', query: {platformId: itm.platformId}}}>{itm.platformName}</Link></li>
								    				}) : ''
								    			}
								    			</ul>
								    		</Col>
								    	</Row>
				    			}) : <span className="no-data"><Spin size="large" /></span>
				    		}
				    	</div>
				    </div>

				</div>
				<Footer />
			</div>
		)
	}
	setTabChange(type) {
		if (type == 0) {
			this.setState({
				tabIndex: type,
				isShow: true,
				isShow1: false
			})
		} else {
			this.setState({
				tabIndex: type,
				isShow: false,
				isShow1: true
			})
		}
	}
	setScroll(index) {
		this.setState({
			currPlatIndex: index
		})
		var platUnits = document.getElementsByClassName('zc-data')
		$('html,body').animate({
	        scrollTop: platUnits[index].offsetTop -15 + 'px'
	      },800)
	}
	setWarnScroll(index) {
		this.setState({
			warnCurrent1: index
		})
		var platUnits = document.getElementsByClassName('warn-data')
		$('html,body').animate({
	        scrollTop: platUnits[index].offsetTop - 15 + 'px'
	    },800)
	}
	filterWarn(index, status) {
		this.setState({
			warnCurrent: index
		})
		this.waringplatform(status)
	}
	waringplatform(status= '') {
		var url = HOST + 'api/client/facebook/v1.0/province/platform'
		var dateYY = '';
		var type ='01';
		var status = status;
	   	let params = 'dateYY=' + dateYY + '&type=' + type + '&status=' + status;
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
	  			warningPlat: json.body
	  		})
	  	})
	}
	filterData(i, type) {
		this.getInitData(i,type)
	}
	getPlatformList(dateYY) {
		var url = HOST + 'api/client/facebook/v1.0/province/platform'
		var dateYY = dateYY;
		var type ='00';
	   	let params = 'dateYY=' + dateYY + '&type=' + type;
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
	  			platFormList: json.body
	  		})
	  		console.log(1111, this.state.platFormList.length)
	  	})
	}
	filterCity(cityName) {
		this.state.platFormList.map((item, index) => {
			if (item.title == cityName) {
				this.setScroll(index)
				return true;
			}
		})
	}
	componentDidMount() {
		this.getInitData('', '')
		this.waringplatform()
	}
	getInitData(i, dateYY) {
		var url = HOST + 'api/client/facebook/v1.0/province/init'
		var dateYY = dateYY;
		var type ='00';
	   	let params = 'dateYY=' + dateYY + '&type=' + type;
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
	  			provinces: json.body
	  		})
	  		this.setState({
	  			provincesArr: this.filterProvince(this.state.provinces)
	  		})
	  		this.setState({
	  			currIndex: i
	  		})
	  		
	  	})
	  	this.getPlatformList(dateYY)
	}
	filterProvince(arr) {
		let newarr = []
		arr.map((item, index) => {
			let obj = {}
			newarr.push({name: item.title, value: item.cnt})
		})
		return newarr;
	}
}

export default Face
