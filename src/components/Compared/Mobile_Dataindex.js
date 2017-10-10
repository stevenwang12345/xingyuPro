import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Form, Icon, Button, Modal } from 'antd';
import BScroll from 'better-scroll';
import $ from 'jquery';
import '../../common/css/mobile.css';
import { Link } from 'react-router';
class Compared extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			datas: [],
			filterData: [],
		}
	}
	render() {
		return (
			<div className="mobile_dataTable">
				<ul className="mobile_platName">
					<li className="mobile_paltname_tit">平台名称</li>
				    {
				    	this.props.info.length > 0 ? 
				    	this.props.info.map((item, index) => {
				    		var styles = {}
							if ((index + 1) % 2 == 0) {styles = {background: '#faf2e5'}}
				    		return <li key={index} style={styles}><Link to={{pathname: 'platDetail', query: {platformId: item.platformId}}} style={{color: '#9d6d25'}}>{item.platformName}</Link></li>
				    	}) : ""
				    }
				</ul>
				<div className="mobile_data_rt" ref="mobiledataWrapper">
					<div className="" ref="datainner">
					    <ul className="mobile_datahead" ref="mobileheadWrapper">
							<li>成交量（万元）</li><li>平均参考收益（%）</li><li>平均借款期限（月）</li><li>资金净流入（万元）</li>
							<li>待还余额（万元）</li><li>投资人数（个）</li>
						</ul>
						{
							this.props.info.length > 0 ? 
							this.props.info.map((item, index) => {
								var styles = {}
								if ((index + 1) % 2 == 0) {styles = {background: '#faf2e5'}}
								return <ul key={index} className="mobile_data_unit" style={styles}>
									<li style={{color: 'green'}}>{item.turnVolume}</li>
									<li>{item.averageRate}</li>
									<li>{item.averageTerm}</li>
									<li>{item.inflowFunds}</li>
									<li>{item.payBalance}</li>
									<li style={{color: '#6b3906'}}>{item.investorCount}</li>
								</ul>
							}) : ""
						}
					</div>
				</div>
			</div>
		)
	}
	componentDidMount() {
		this._initScroll()
	}
	_initScroll() {
		this.calculationWidth();
      	if (!this.scroll) {
          this.scroll = new BScroll(this.refs.mobiledataWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        } else {
          this.scroll.refresh();
        }
	}
	calculationWidth() {
		let len = this.refs.mobileheadWrapper.getElementsByTagName('li').length;
		let liWidth = 160;
		this.refs.datainner.style.width = liWidth * len + 'px';
	}
}

export default Compared;