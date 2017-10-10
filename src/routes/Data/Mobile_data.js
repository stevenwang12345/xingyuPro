import React from 'react';
import { Form, Spin } from 'antd';
import fetch from 'dva/fetch';
import { HOST } from '../../config/config';
const FormItem = Form.Item;
import Compared from '../../components/Compared/Mobile_Dataindex';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import doAjax from '../../common/js/doAjax.js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.css';
import '../../common/css/mobile.css';
class Data extends React.Component {
    constructor(props, context){
	    super(props, context);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	    this.state = {
	    	filterParams: {
	            platformName: '',
	            dataTime: '04',
	            month:''
	    	},
	    	result: []
	    }
    }
	render() {
	    return (
	    	<div>
	    		<Header />
	    		<div className="data">
	    		     <div className="time" style={{display: 'none'}}>数据更新时间: {this.state.month}</div>
		             <div className="datacontainer">
				            {
				            	this.state.result ? this.state.result && this.state.result.length > 0 ? <Compared info={this.state.result} /> : <span className="no-data"><Spin size="large" /></span> :
				            	<span className="no-data"><Spin size="large" /></span>
				            }
			         </div> 
	    		</div>

	    		<Footer />
	    	</div>
	    )
	}
    DateTime() {
    	var myDate = new Date();
    	myDate.toLocaleDateString();
    	var month = myDate.toLocaleDateString();
    	this.setState({
    		month:month
    	})
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
    componentDidMount() {
  		this.getData();
  		this.DateTime();
    }
    getData() {
  		var This = this;
		var url = HOST + 'api/client/platform/v1.0/data/list';
		var params = this.obj2params(this.state.filterParams)
		doAjax(url, params, this)
    }
}
export default Data;