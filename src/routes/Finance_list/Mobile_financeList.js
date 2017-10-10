import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Select, Input, Checkbox, Cascader, Table } from 'antd';
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
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../common/css/mobile.css';
class Banking extends React.Component {
	constructor(props, context) {
		super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
        <Header />
				<div className="finance">
					 <div className="conditional">
                        <div className="finance-title"><h3>{this.state.datas['productName']}</h3></div>
                        <div className="finance-list">
							<ul>
								<li style={{display: 'none'}}><div className="form-title">等级编码:</div><div className="form-txt">65456456456</div></li>
                                <li><div className="form-title">发行机构:</div><div className="form-txt">{this.state.datas['platformName']}</div></li>
                                <li><div className="form-title">募集币种:</div><div className="form-txt">{this.state.datas['operationPattern']}</div></li>
                                <li><div className="form-title">起点销售金额:</div><div className="form-txt">{this.state.datas['startingSalesAmount']}</div></li>
                            </ul>
                            <ul>
                                <li><div className="form-title">风险等级:</div><div className="form-txt">{this.state.datas['riskLevel']}</div></li>
                                <li><div className="form-title">收益类型:</div><div className="form-txt">{this.state.datas['incomeType']}</div></li>
                                <li><div className="form-title">预期最高收益率:</div><div className="form-txt">{this.state.datas['maxDesiredRate']}%</div></li>
                                <li><div className="form-title">预期最低收益率:</div><div className="form-txt">{this.state.datas['minDesiredRate']}%</div></li>
                                <li><div className="form-title">运作模式:</div><div className="form-txt">{this.state.datas['operationPattern']}</div></li>
                                <li><div className="form-title">期限类型:</div><div className="form-txt">{this.state.datas['deadlinType']}</div></li>
                            </ul>
                            <ul>
                                <li><div className="form-title">募集起始日期:</div><div className="form-txt">{this.state.datas['productStartDate']}</div></li>
                                <li><div className="form-title">募集结束日期:</div><div className="form-txt">{this.state.datas['productEndDate']}</div></li>
                                <li><div className="form-title">产品起始日期:</div><div className="form-txt">{this.state.datas['productStartDate']}</div></li>
                                <li><div className="form-title">产品终止日期:</div><div className="form-txt">{this.state.datas['productEndDate']}</div></li>
                                <li><div className="form-title">业务起始日:</div><div className="form-txt">{this.state.datas['operationPattern']}</div></li>
                                <li><div className="form-title">业务结束日:</div><div className="form-txt">{this.state.datas['operationPattern']}</div></li>
                                <li><div className="form-title">初始净值:</div><div className="form-txt">{this.state.datas['operationPattern']}</div></li>
                                <li><div className="form-title">产品净值:</div><div className="form-txt">{this.state.datas['operationPattern']}</div></li>
                                <li><div className="form-title">实际天数:</div><div className="form-txt">{this.state.datas['actualDay']}天</div></li>
                                <li><div className="form-title">投资资产类型:</div><div className="form-txt">{this.state.datas['productType']}</div></li>
                                <li style={{width: '100%', height: 'auto'}}><div className="form-title">销售区域:</div><div className="form-txt" style={{width: '100%'}}>{this.state.datas['saleArea']}</div></li>
                            </ul>
                        </div>  
                    </div>
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
