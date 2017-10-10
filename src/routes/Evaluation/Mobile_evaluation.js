import React from 'react';
import { connect } from 'dva';
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import { Select, Spin } from 'antd';
const Option = Select.Option;
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../common/css/mobile.css';
class Evaluation extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	    this.state = {
	    	loadingShow: false,
	    	dateArr: [],
	    	defaultSelectValue: '',
	    	dateinfo: [],
	    	result: []
	    }
	}
	render() {
		return (
			<div>
				<Header />
				<div className="mobile_evaluations">
					<div className="mobile_selectbox">
							{
								this.state.defaultSelectValue ? 
								<Select defaultValue={this.state.defaultSelectValue} style={{ width: 160 }} onChange={this.handleChange.bind(this)}>
						   			{this.state.dateinfo}
					    		</Select> : ''
							}
				    </div>
					<table className="evaluationTables" cellPadding="0" cellSpacing="0">
		                  <thead>
		                     <tr>
								<th width="40px">排名</th><th className="platform-th" style={{width: '100px'}}>平台名称</th><th>综合</th><th>涨幅</th>
							</tr>
						  </thead>
		             	  <tbody>
		             	  	<tr style={{display: this.state.loadingShow ? '' : 'none'}}><td colSpan="4"><span className="no-data"><Spin size="large" /></span></td></tr>
			          		{
			          			this.state.result.length > 0 ? 
			          			this.state.result.map((item, index) => {
			          				let styles = {}
									if ((index + 1) % 2 == 0) {styles = {background: '#efe8e2'}}
			          				return <tr key={index} style={styles}>
			          					<td>{index+1}</td>
			          					<td><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}}>{item.platformName}</Link></td>
			          					<td style={{color: 'green'}}>{item.totalScore}</td>
			          					<td>-</td>
			          				</tr>
			          			}) : <tr><td colSpan="4"><span className="no-data"><Spin size="large" /></span></td></tr>
			          		}
			          	</tbody>
		          	</table>
				</div>
				<Footer />
			</div>
		)
	}
	handleChange(key) {
		this._getData(key)
	}
	componentDidMount() {
		this._getYmd()
		this._getData()
	}
	//日期
	_getYmd() {
		this.setState({loadingShow: true})
		let url = HOST + 'api/client/assess/v1.0/billboard/dataYmd';
		let myFecthOption = {
			method:'get'
		}
	    fetch(url,myFecthOption).then(res => {
	    	return res.json()
	    }).then(json => {
	    	this.setState({
	    		dateArr: json.body,
	    		dateinfo:this.filterResult(json.body)
	    	})
	    	this.setState({
	    		defaultSelectValue: json.body[0].title
	    	})
	    	this.setState({loadingShow: false})
	    })
	 }
	 filterResult(data) {
	 	let arr = []
	 	data.map((item, index) => {
	 		arr.push(<Option key={index} value={item.key}>{item.title}</Option>)
	 	});
	 	return arr;	 
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
	  		var tit = this._filterData(this.state.dateArr, k)
	  		if (tit) {
	  			this.setState({
	  				defaultSelectValue: tit
	  			})
	  		}
	  		this.setState({
	  			result: json.body
	  			
	  		})
	  	})
	}
	_filterData(data, k) {
		var tit = ''
		if (data.length > 0) {
			data.map((item, index) => {
				if (item.key == k) {
					tit = item.title
				}
			})
		}
		return tit
	}
	
}
export default Evaluation;