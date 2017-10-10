import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Select, Input, Checkbox, Cascader, Table, BackTop } from 'antd';
import { HOST } from '../../config/config';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './finance_list.css';
class Banking extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
	    	filterParams: {
	    		productId: '3'
	    	},
	    	datas: {},
	    	result: []
	    	
	    }
	}
	handleClick() {

	}
	render() {
		return (
			<div>
				<BackTop />
				<Header />
				<div className="w1170 bankfinance">
					<Row>
					     <Col span={24} className="leftRight">

		                    <Col span={16} className="left">
		                          <Col span={24} className="datalist">
					                  <Col span={24} className="transaction"><Link to="/"><h2>银行理财 ></h2></Link> <Link to="/"><h2>理财产品</h2></Link></Col>
					                   <Col span={24} className="conditional">
		                                    <Col className="conditional-title"><h3>{this.state.datas['productName']}</h3></Col>
		                                    <Col className="conditional-list">
												<ul>
													<li style={{display: 'none'}}><div className="form-title">等级编码:</div><div className="form-txt">65456456456</div></li>
	                                                <li><div className="form-title">发行机构:</div><div className="form-txt">{this.state.datas['platformName']}</div></li>
	                                                <li><div className="form-title">运作模式:</div><div className="form-txt">{this.state.datas['operationPattern']}</div></li>
	                                                <li><div className="form-title">收益类型:</div><div className="form-txt">{this.state.datas['incomeType']}</div></li>
	                                                <li><div className="form-title">期限类型:</div><div className="form-txt">{this.state.datas['deadlinType']}</div></li>
	                                                <li><div className="form-title">募集币种:</div><div className="form-txt">{this.state.datas['raisedCurrency']}</div></li>
	                                                <li><div className="form-title">起点销售金额:</div><div className="form-txt">{this.state.datas['startingSalesAmount']} 元</div></li>
	                                                <li><div className="form-title">风险等级:</div><div className="form-txt">{this.state.datas['riskLevel']}</div></li>
	                                                <li><div className="form-title">募集起始日期:</div><div className="form-txt">{this.state.datas['productStartDate']}</div></li>
	                                                <li><div className="form-title">募集结束日期:</div><div className="form-txt">{this.state.datas['productEndDate']}</div></li>
	                                                <li><div className="form-title">产品起始日期:</div><div className="form-txt">{this.state.datas['productStartDate']}</div></li>
	                                                <li><div className="form-title">产品终止日期:</div><div className="form-txt">{this.state.datas['productEndDate']}</div></li>
	                                                <li><div className="form-title">业务起始日:</div><div className="form-txt">{this.state.datas['raisedStartDate']}</div></li>
	                                                <li><div className="form-title">业务结束日:</div><div className="form-txt">{this.state.datas['raisedEndDate']}</div></li>
	                                                <li><div className="form-title">初始净值:</div><div className="form-txt">{this.state.datas['initialNetWorth']?this.state.datas['initialNetWorth']:'-'}</div></li>
	                                                <li><div className="form-title">产品净值:</div><div className="form-txt">{this.state.datas['productNetWorth']?this.state.datas['productNetWorth']:'-'}</div></li>
	                                                <li><div className="form-title">预期最低收益率:</div><div className="form-txt">{this.state.datas['minDesiredRate']}%</div></li>
	                                                <li><div className="form-title">预期最高收益率:</div><div className="form-txt">{this.state.datas['maxDesiredRate']}%</div></li>
	                                                <li><div className="form-title">实际天数:</div><div className="form-txt">{this.state.datas['actualDay']}天</div></li>
	                                                <li><div className="form-title">投资资产类型:</div><div className="form-txt">{this.state.datas['productType']}</div></li>
	                                                <li style={{width: '100%', height: 'auto'}}><div className="form-title">销售区域:</div><div className="form-txt" style={{width: '100%'}}>{this.state.datas['saleArea']}</div></li>
												</ul>
		                                    </Col>  
					                   </Col>
					              </Col>
		                    </Col>
		                    
		                    <Col span={7} className="right" style={{ float: 'right' }}>
						        <Col className="bbs-detail-right">
						            <Col className="circle-rule mb12 n-nav">
						                <Col className="bg-nav clearfix">
						                     <span className="active">该行理财产品推荐</span>
						                     <Col className="right"><Link to={{pathname: 'finance'}} ><b>更多</b><Icon type="right" /></Link></Col>
						                </Col>
						                <Col className="bankRight">
						                     <ul className="bankRighTxt">
						                        <li>{this.state.datas['productName']}</li>
						                        <li>收益类型: {this.state.datas['incomeType']}</li>
						                        <li>预期最高收益率: <span className="syl">{this.state.datas['maxDesiredRate']}%</span></li>
						                        <li>期限类型: {this.state.datas['deadlinType']}</li>
						                    </ul>
						                </Col>
						            </Col>
						        </Col>
		                    </Col>
					     </Col>
				     </Row>
				</div>
				<Footer />
			</div>
		)
	}
   
  componentDidMount() {
  	var queryObj = this.props.location.query;
  	var productId = queryObj.productId;
  	var memberId = queryObj.memberId;
  	var uuid = queryObj.uuid;
  	this._getData(productId, memberId, uuid);
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
  _getData(productId, memberId, uuid) {
  	var url = HOST + 'api/client/bankFinance/v1.0/detail'
  	let params = 'productId=' + productId + '&memberId=' + memberId + '&uuid=' + uuid;
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
    		datas: json.body
    	})
    })
  }
}


export default Banking
