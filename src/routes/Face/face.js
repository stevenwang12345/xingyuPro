import React from 'react';
import { Row, Col, Tabs, Anchor, Input, BackTop, Spin } from 'antd';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
import { Link } from 'dva/router';
import { HOST } from '../../config/config';
import echarts from 'echarts';
import 'echarts/map/js/china.js';
import 'echarts/map/js/province/shanghai.js';
import fetch from 'dva/fetch';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Searchbox from '../../components/Search'
import $ from 'jquery'
import './style.css';
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
				<BackTop />
				<Header />
				<div className="face-wrapper">
				    <ul className="face-ul">
				    	<li onClick={this.setTabChange.bind(this, 0)} style={{backgroundColor: this.state.tabIndex == 0 ? 'white': '',fontWeight: this.state.tabIndex == 0 ? 'bold': '',color: this.state.tabIndex == 0 ? '#9c6c22': '',borderTop: this.state.tabIndex == 0 ? '2px solid #6b3906': ''}} >网贷平台</li>
				    	<li onClick={this.setTabChange.bind(this, 1)} style={{backgroundColor: this.state.tabIndex == 1 ? 'white': '',fontWeight: this.state.tabIndex == 1 ? 'bold': '',color: this.state.tabIndex == 1 ? '#9c6c22': '',borderTop: this.state.tabIndex == 1 ? '2px solid #6b3906' : ''}}>问题平台</li>
			          <div className="search-rt" style={{marginTop:'4px'}}>
			          <Searchbox />
					  </div>
				    </ul>
				    <div className="face-main" style={{display: this.state.isShow ? '': 'none'}}>
				    	<div className="face-lf">
				    			<Row className="time-box">
				    				<Col span={4} className="tit">
					    				上线时间
					    			</Col>
					   				<Col span={20}>
					   					<ul className="time">
					   					   {
						   						onLineTime.map((item, index) => {
						   							let styls = {};
				                         			if (index == this.state.currIndex) {
				                         				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                         			}
							    					return <li key={index}><span style={styls} onClick={this.filterData.bind(this, index, item.dataType)}>{item.title}</span></li>
							    				})   	
					   					   }

					    				</ul>
					    			</Col>
					    		</Row>
					    		<Row className="provinces-box">
				    				<Col span={4} className="tit">
					    				平台省份
					    			</Col>
					   				<Col span={20}>
					   				    <ul className="provinces">

					    				{
					    					this.state.provinces.map((item, index) => {
					    						let styls = {};
				                         			if (index == this.state.currPlatIndex) {
				                         				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
				                         			}
					    						return <li key={index}>
					    						<span style={styls} onClick={this.setScroll.bind(this,index)}>{item.title} <span className="cnt">({item.cnt})</span></span>
					    						</li>
					    					})
					    				}
					    				</ul>
					    			</Col>
					    		</Row>
				    	</div>
				    	<div className="face-rt">
				    		<div id="main1" style={{width: '500px', height: '400px', borderColor: '1px solid #000'}}></div>
				    	</div>
				    	<div style={{clear: 'both'}}></div>
				    	<div className="plat-unit">
				    		{
				    			this.state.platFormList.length > 0 ?
				    			this.state.platFormList.map((item, index) => {
								    	return <Row key={index} className="unit zc-data">
								    		<Col span={2} className="subtit">{item.title}<br/><span className="red">({item.cnt})</span></Col>
								    		<Col span={22}>
								    			<ul className="platFormList-ul">
								    			{
								    				item.platform.length > 0 ?
								    				item.platform.map((itm,i) => {
								    					return <li key={i}><Link to={{pathname: 'platDetail', query: {platformId: itm.platformId}}} title={itm.platformName} target="_blank">{itm.platformName}</Link></li>
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
				    	<div className="warn-type">
				    		{
				    			warningData.map((item, index) => {
	    						    let styls = {};
	                     			if (index == this.state.warnCurrent) {
	                     				styls = {color: '#9c6c24', padding: '3px 8px', border: '1px dashed #9c6c24', borderRadius: '4px'}
	                     			}
				    				return <span key={index} style={styls} onClick={this.filterWarn.bind(this, index, item.dataType)}>{item.title}</span>
				    			})
				    		}
				    	</div>
				    	<Row className="provinces-warn">
		    				<Col span={2} className="tit">
			    				平台省份
			    			</Col>
			    			<Col span={22}>
				    		{
				    		this.state.warningPlat.length > 0 ?
				    			this.state.warningPlat.map((item, index) => {
				    				let styls = {};
	                     			if (index == this.state.warnCurrent1) {
	                     				styls = {color: '#9c6c24', fontWeight: 'bold'}
	                     			}
				    				
				    				return <Col span={2} key={index} style={styls} onClick={this.setWarnScroll.bind(this,index)}>{item.title}<span className="cnt">({item.cnt})</span></Col>
				    			})
				    			:
				    			<span className="no-data"><Spin size="large" /></span>
				    		}
				    		</Col>
				    	</Row>
				    	<div className="plat-unit">
				    		{
				    			this.state.warningPlat.length > 0 ?
				    			this.state.warningPlat.map((item, index) => {
								    	return <Row key={index} className="unit warn-data ">
								    		<Col span={2} className="subtit">{item.title}<br/><span className="red">({item.cnt})</span></Col>
								    		<Col span={22}>
								    			<ul className="platFormList-ul">
								    			{
								    				item.platform.length > 0 ?
								    				item.platform.map((itm,i) => {
								    					return <li key={i}><Link to={{pathname: 'platDetail', query: {platformId: itm.platformId}}} target="_blank">{itm.platformName}</Link></li>
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
	        scrollTop: platUnits[index].offsetTop - 15 +  'px'
	      }, 400)

		//document.body.scrollTop= platUnits[index].offsetTop
	}
	setWarnScroll(index) {
		this.setState({
			warnCurrent1: index
		})
		var platUnits = document.getElementsByClassName('warn-data')
		$('html,body').animate({
	        scrollTop: platUnits[index].offsetTop -15 + 'px'
	    },400)
		//document.body.scrollTop= platUnits[index].offsetTop
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
	  	})
	}
	setChinaMap() {
		var myChart = echarts.init(document.getElementById('main1'));
		var option = {
		    title: {
		    	show: false,
		        text: 'iphone销量',
		        subtext: '纯属虚构',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item'
		    },
		    legend: {
		    	show: true,
		        orient: 'vertical',
		        left: 'left',
		        data:['iphone3','iphone4','iphone5']
		    },
		    dataRange: {
            x: 'left',
            y: 'bottom',
            splitList: [
                { start: 150 },
                { start: 80, end: 150 },
                { start: 30, end: 80 },
                { start: 5, end: 30 },
                { start: 1, end: 5, /*label: '10 到 200（自定义label）' */ },
                { start: 0, end: 1 },
            ],
            color: ['#E0022B', '#E09107', '#A3E00B']
        },
		    toolbox: {
		        show: false,
		        orient: 'vertical',
		        left: 'right',
		        top: 'center',
		        feature: {
		            dataView: {readOnly: false},
		            restore: {},
		            saveAsImage: {}
		        }
		    },
		    series: [
		        {
		            name: '平台数量',
		            type: 'map',
		            mapType: 'china',
		            roam: false,
		            zoom:1.2,
		            label: {
		                normal: {
		                    show: true
		                },
		                emphasis: {
		                    show: true
		                }
		            },
		            data: this.state.provincesArr
		            // name: value:
		        }
		    ]
		};
		myChart.setOption(option);
		myChart.on('click', (params) => {
		   var cityName = params.name;
		   this.filterCity(cityName) 
		});
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
		window._hmt && window._hmt.push(['_trackEvent', '脸谱页', '点击','访问次数']);
		var queryObj = this.props.location.query;
		if (queryObj.type == '1') {
			this.setTabChange(1);
			this.getInitData('', '')
			this.waringplatform()
		} else {
			this.getInitData('', '')
			this.waringplatform()
		}

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
	  		this.setChinaMap()
	  		
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
