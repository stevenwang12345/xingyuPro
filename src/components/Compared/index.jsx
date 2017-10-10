import React from 'react';
import { Form, Input, Menu, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Tabs, Radio, Modal } from 'antd';
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
const columns = [
	{ title: '序号',dataIndex: 'key',key: 'key' }, 
	{ title: '平台名称', dataIndex: 'platformName', key: 'platformName' }, 
	{ title: '透明度', dataIndex: 'dimensionlName', key: 'dimensionlName'}, 
	{ title: '基础指标', dataIndex: 'dimensionlName', key: 'dimensionlName'}, 
	{ title: '运营指标', dataIndex: 'dimensionlName', key: 'dimensionlName'}, 
	{ title: '风控指标', dataIndex: 'inflowFunds', key: 'inflowFunds'}, 
	{ title: '合规指标', dataIndex: 'payBalance', key: 'payBalance'}, 
	{ title: '综合', dataIndex: 'investorCount', key: 'investorCount'}, 
	{ title: '对比', dataIndex: 'compared', key: 'compared' }
];
class Compared extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			mode: 'top',
			info: [],
			result: [],
			modal2Visible: false,
			modal1Visible: false,
			filterData: [],
			datas: []
		}
	}
	render() {
		const { mode } = this.state;
		return (
			<div>
				<div className="bangdan">
			        <Tabs defaultActiveKey="1" tabPosition={mode} onTabClick={this.dataYmd.bind(this)} style={{ height: 50 }} >
			        {
			        	this.state.info ?
			        	this.state.info.map((item, index) => {
		                      return <TabPane tab={item.title} key={item.key}></TabPane>
			        	}) :
			        	'正在加载中...'
			        }
			        </Tabs>
			    </div>
				<table className="data-table evalu-table" style={{border: 0, cellspacing: 0, cellpadding: 0}}>
				      <thead>
							<tr>
								<th>序号</th><th>平台名称</th><th>透明度</th><th>基础指标</th><th>运营指标</th>
								<th>风控指标</th><th>合规指标</th><th>综合</th><th>对比</th>
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
										<td style={{width: '180px'}}><span style={{color: '#9d6d25'}}><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}} style={{color: '#9d6d25'}} title={item.platformName} target="_blank">{item.platformName}</Link></span></td>
										{
											item.dimensionls.map((item1, index1) => {
												return <td key={index1}>{item1.score}</td>
											})
										}
										<td>{item.totalScore}</td>
										<td>
										 <input type="checkbox" checked={item.ischeck} value={item.platformName} onChange={(e) => {this.showComparedModal(e, item.platformName)}} />
										</td>
									</tr>
								}) : <tr><td colSpan="9"><span className="no-data">暂无数据</span></td></tr>
						}
					</tbody>
				</table>
				<div className="compared-list" style={{display: this.state.modal1Visible ? '' : 'none'}}>
					  <div className="title">
					  	<span>平台对比</span>
					  	<Icon className="fr" style={{marginTop: '11px', width: '20px', height: '20px', lineHeight: '20px', float: 'right'}} type="close" onClick={this.setModalVisible.bind(this)} />
					  </div>
					  {
		          		this.state.filterData.map((item, index) => {
		          		return <p className="modal-p" key={index}>{item.platformName} <Icon onClick={this.filterData.bind(this, item.platformName)} className="fr" style={{width: '20px', height: '20px',marginTop: '4px', float: 'right'}} type="close-circle-o" /></p>
			          	})
			          }
		          	  <Button type="primary" className="compared-btn" onClick={this.show.bind(this)}>对比</Button>
				</div>

					<div className="comparedDialog"  style={{display: this.state.modal2Visible ? '' : 'none'}}>
			        	<div className="comparedtitle">
			        		<span className="biaoti">平台对比</span>
			        		<span className="close" onClick={this.closeDialog.bind(this)}>×</span>
			        	</div>
			             <table className="data-table modal-table" style={{border: 0, cellspacing: 0, cellpadding: 0}}>
			                  <thead>
			                     <tr>
									<th>序号</th><th>平台名称</th><th>透明度</th><th>基础指标</th><th>运营指标</th>
									<th>风控指标</th><th>合规指标</th><th>综合</th>
								</tr>
							  </thead>
			             	  <tbody>
				          		{    
						          	this.state.filterData.map((item, index) => {
						          		return <tr className="comparedModal-tr" key={index}><td style={{borderLeft: '0'}}>{index+1}</td><td><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}} style={{color: '#9d6d25'}} target="_blank" >{item.platformName}</Link></td>
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
		)
	}
	componentDidMount() {
		this._getYmd();
		this._getData();
	}
	setModal2Visible() {
		this.setState({
			modal2Visible: false
		})
	}
	closeDialog() {
		this.setState({
			modal2Visible: false
		})
		this.props.mark(0)
	}
	show() {
		this.setState({
			modal2Visible: true
		})
		this.props.mark(1)
	}
	filterData(v) {
	  	 this.state.filterData.map((item, index) => {
	  	 	if (item.platformName == v) {
	  	 		this.state.filterData.splice(index,1)
	  	 		this.setState({
	  	 			filterData: this.state.filterData
	  	 		})
	  	 	}
	  	 })
	  	this.state.result.map((item, i) => {
 			if (item.platformName == v) {
 				item.ischeck = false;
 			}
 		})
 		this.setState({
			datas: this.state.datas
		})
	}
	setModalVisible() {
		this.setState({modal1Visible: false});
	}
	showComparedModal(e, v) {
	  let checked = e.target.checked;
	  if (checked) {
	  	if (this.state.filterData.length < 5) {
		  	this.state.result.map((item, index) => {
		  		if (item.platformName == v) {
		  			item.ischeck = true;
		  			this.state.filterData.push(item)
		  			this.setState({
		  	 			filterData: this.state.filterData
		  	 		})
		  		}
		  	})
		  	this.setState({
		  		datas: this.state.datas
		  	})
		} else {
			Modal.warning({
			    title: '',
			    content: '最多选择五个元素',
			  });
	  		e.target.checked = !e.target.checked;
		  }
	  } else {
	  	this.state.result.map((item, index) => {
	  		if (item.platformName == v) {
	  			item.ischeck = false;
	  		}
	  	})
	  	// this.setState({
	  	// 	datas: this.state.datas
	  	// })
	    this.state.filterData.map((item, index) => {
	  	 	if (item.platformName == v) {
	  	 		this.state.filterData.splice(index,1)
	  	 		this.setState({
	  	 			filterData: this.state.filterData
	  	 		})
	  	 	}
	  	 })
	}
	  this.setState({
	  	modal1Visible: true
	  })
	 
	}
	dataYmd(key) {
	  	this._getData(key);
	}
	//榜单
  _getData(k='') {
  	let url = HOST + 'api/client/assess/v1.0/billboard/init?billboardYmd=' + k;
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
  			filterData: []
  		})
  	})
  }
   //日期
	_getYmd() {
		let url = HOST + 'api/client/assess/v1.0/billboard/dataYmd';
		let myFecthOption = {
			method:'get'
		}
	    fetch(url,myFecthOption).then(res => {
	    	return res.json()
	    }).then(json => {
	    	this.setState({
	    		info:json.body
	    	})
	    })
	 }
}
export default Compared;