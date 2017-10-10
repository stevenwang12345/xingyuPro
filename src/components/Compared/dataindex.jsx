import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Form, Icon, Button, Modal } from 'antd';
import './style.css';
const columns = [
	{ title: '序号',dataIndex: 'key',key: 'key' }, 
	{ title: '平台名称', dataIndex: 'platformName', key: 'platformName' }, 
	{ title: '成交量（万元）', dataIndex: 'turnVolume', key: 'turnVolume'}, 
	{ title: '平均参考收益（%）', dataIndex: 'averageRate', key: 'averageRate'}, 
	{ title: '平均借款期限（月）', dataIndex: 'averageTerm', key: 'averageTerm'}, 
	{ title: '资金净流入（万元）', dataIndex: 'inflowFunds', key: 'inflowFunds'}, 
	{ title: '待还余额（万元）', dataIndex: 'payBalance', key: 'payBalance'}, 
	{ title: '投资人数（个）', dataIndex: 'investorCount', key: 'investorCount'}, 
	{ title: '关注', dataIndex: 'attention', key: 'attention'}, 
	{ title: '对比', dataIndex: 'compared', key: 'compared' }
];

import { Link } from 'react-router';
class Compared extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			modal1Visible: false,
			modal2Visible: false,
			datas: [],
			filterData: []
		}
	}
	render() {
		return (
			<div>
				<table className="data-table newdatas-table" style={{border: 0, cellspacing: 0, cellpadding: 0}}>
					<colgroup>
						    <col width="50" />
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
							<th style={{width: '50px'}}>序号</th>
							<th style={{width: '200px'}}>平台名称</th>
							<th style={{width: '100px'}}>成交量（万元）</th>
							<th style={{width: '140px'}}>平均参考收益（%）</th>
							<th style={{width: '140px'}}>平均借款期限（月）</th>
							<th style={{width: '200px'}}>资金净流入（万元）</th>
							<th style={{width: '140px'}}>待还余额（万元）</th>
							<th style={{width: '130px'}}>投资人数（个）</th>
							<th style={{display: 'none'}}>关注</th>
							<th style={{width: '70px'}}>对比</th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.info.length > 0 ? 
								this.props.info.map((item, index) => {
								let styles = {}
								if ((index + 1) % 2 == 0) {styles = {background: '#faf2e5'}}
								return <tr key={index} style={styles}>
									<td>{index+1}</td>
									<td style={{color: '#9c6c24'}}><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}} style={{color: '#9d6d25'}} title={item.platformName} target="_blank">{item.platformName}</Link></td>
									<td>{item.turnVolume}</td>
									<td>{item.averageRate}</td>
									<td>{item.averageTerm}</td>
									<td>{item.inflowFunds}</td>
									<td>{item.payBalance}</td>
									<td>{item.investorCount}</td>
									<td style={{display: 'none'}}><a className="gz">关注</a></td>
									<td>
										<input type="checkbox" checked={item.ischeck} value={item.platformName} onChange={(e)=> {this.showComparedModal(e, item.platformName)}} />
									</td>
								</tr>
							}) : ""

						}
					</tbody>
				</table>




				<div className="" id="compared-list" style={{display: 'none'}}>
				 <div>
			          {
			          	this.state.filterData.map((item, index) => {
			          		return <p className="modal-p" key={index}>{item.platformName} <Icon onClick={this.filterData.bind(this, item.platformName)} className="fr" style={{width: '20px', height: '20px',marginTop: '4px', float: 'right'}} type="close-circle-o" /></p>
			          	})
			          }
			           <Button type="primary" className="compared-btn" onClick={this.setShows.bind(this)}>对比</Button>
		           </div>
		        </div>




		        <div id="data-box" style={{display: 'none'}}>
		        	<table className="layui-table" lay-even lay-skin="row" lay-size="lg" style={{width: '900px'}} >
						<colgroup>
						    <col width="100" />
						    <col width="100" />
						    <col width="100" />
						    <col width="100" />
						    <col width="140" />
						    <col width="100" />
						    <col />
						</colgroup>
					  <thead>
					     <tr>
							<th>平台名称</th><th>成交量（万元）</th><th>平均参考收益（%）</th><th>平均借款期限（月）</th><th>资金净流入（万元）</th>
							<th>待还余额（万元）</th><th>投资人数（个）</th>
						</tr>
					  </thead>
						  <tbody>
							{    
					      	this.state.filterData.map((item, index) => {
					      		return <tr className="comparedModal-tr" key={index}><td style={{borderLeft: '0'}}><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}} style={{color: '#9d6d25'}} target="_blank" >{item.platformName}</Link></td>
					      			<td>{item.turnVolume}</td>
					            	<td>{item.averageRate}</td>
					            	<td>{item.averageTerm}</td>
					            	<td>{item.inflowFunds}</td>
					            	<td>{item.payBalance}</td>
					            	<td>{item.investorCount}</td>
					      		</tr>
					      	})
					  	}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
	componentDidMount() {
		var top = $('.newdatas-table').offset().top;
		$(window).scroll((event) => {
			var winPos = $(window).scrollTop();
			if(top <= winPos) {
				$('.newdatas-table thead').addClass('theadFixed')
			} else {
				$('.newdatas-table thead').removeClass('theadFixed')
			}
		})
	}
	closeDialog() {
		this.setState({
			modal2Visible: false
		})
		this.props.mark(0)
	}
	setShows() {
    	if (this.state.filterData.length <= 0) {
    		layer.alert('没有平台对比', {icon: 1, skin: 'warnbox'});
    		return;
    	}
    	layer.open({
		  type: 1,
		  title: '平台对比', 
		  area: '900px',
		  closeBtn: 1,
		  content: $('#data-box'), //这里content是一个普通的String
		  cancel: function(index, layero) {
		  	$('#data-box').hide()
		  }
		});
	}
	setModal2Visible() {
		this.setState({
			modal2Visible: false
		})
	}
	setModalVisible() {
		this.setState({modal1Visible: false})
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
	  	this.state.datas.map((item, i) => {
 			if (item.platformName == v) {
 				item.ischeck = false;
 			}
 		})
 		this.setState({
			datas: this.state.datas
		})
		if(this.state.filterData.length <= 0) {
 			$('#compared-list').hide()
 			layer.closeAll()
 		} 
	  	
	}
	showComparedModal(e, v) {
			  let checked = e.target.checked;
			  if (checked) {
			  	if (this.state.filterData.length < 5) {
				  	this.props.info.map((item, index) => {
				  		if (item.platformName == v) {
				  			item.ischeck = true;
				  			this.state.filterData.push(item)
				  			this.setState({
				  	 			filterData: this.state.filterData
				  	 		})
				  		}
				  	})
				  	this.setState({
				  		datas: this.props.info
				  	})
			  	} else {
					layer.alert('最多选择五个元素', {icon: 1, skin: 'warnbox'});
			  		e.target.checked = !e.target.checked;
			  	}
			  } else {
			  	this.state.datas.map((item, index) => {
			  		if (item.platformName == v) {
			  			item.ischeck = false;
			  		}
			  	})
			  	this.setState({
			  		datas: this.state.datas
			  	})
			  	this.state.filterData.map((item, index) => {
			  	 	if (item.platformName == v) {
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


	  // this.setState({
	  // 	modal1Visible: true
	  // })
	}
}

export default Compared;