import React from 'react';
import { Row, Col, Tabs, message, Icon  } from 'antd';
import $ from 'jquery'
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import './style.css'
import { HOST } from '../../config/config';
class Searchbox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: true,
			keyList: [],
			timer: null,
			key: '',
			platformId: 0,
			platformName: ''
		}
	}
	render() {
		return (
			<div className="searchbox">
				<input type="text" className="serach-input" id="serach-input" placeholder="请输入平台名称或简拼" onKeyUp={this.setKeyword.bind(this)} />
				<Icon type="search" onClick={this.jumpUrl.bind(this)}/>
				<ul className="keyword-list" style={{display: this.state.isShow ? '' : 'none'}}>
					{
						(this.state.keyList && this.state.keyList.length > 0) ? 
						this.state.keyList.map((item, index) => {
							return <li style={{width: '200px'}}key={index}><Link to={{pathname:'platDetail',query: {platformId: item.platformId}}}>{item.platformName}</Link></li>
						}) : ""
					}
				</ul>
			</div>
		)
	}
	_getSearchValue(value) {
		
		if (value == "") {
			this.setState({
	  			isShow: false
	  		})
		} else {
			var url = HOST + 'api/client/platform/v1.0/like/name';
			let myFecthOption = {
			  	method: 'post',
			  	credentials: 'include',
			  	headers: {
			      'Accept': 'application/json, text/plain, */*',
			      'Content-Type': 'application/x-www-form-urlencoded'
			  	},
			  	body: '&name=' + value
	  		}
	  		fetch(url, myFecthOption).then((res) => {
	  			return res.json()
	  		}).then(json => {
	  			if (json.body.length > 0) {
	  				$('.keyword-list').show()	
	  				this.setState({
	  					isShow: true,
	  					keyList: json.body
	  				})

	  			}
	  		})
		}
	}
	jumpUrl() {
		if (this.state.platformName != '' && this.state.platformName != '') {
			window.location.href='#/platDetail?platformId=' + this.state.platformId
		} else {
			
			return;
		}
		
	}
	setKeyword() {
		var input = document.getElementById('serach-input')
		var keyword = input.value
		 if (keyword == '') {
			this.setState({
				keywords: '',
	  			isShow: false
	  		})
		 } else {
			 this.setState({
			 	keyList: [],
				keywords: keyword,
				isShow: true
			 })
			 if (!this.state.timer) {
			 	this.state.timer = setTimeout(() => {
			 		this._getSearchValue(keyword)
			 	}, 50)
			 } else {
			 	clearTimeout(this.state.timer)
			 	this.state.timer = setTimeout(() => {
			 		this._getSearchValue(keyword)
			 	}, 50)

			 }
		}
		return false
	}
	componentDidMount() {
		$('#serach-input').bind('click', function(event){
			event.stopPropagation(); 
		})
		$('body').bind('click', function() {
			$('.keyword-list').hide()
		})
	}

	componentWillUnmount() {
	  clearInterval(this.state.timer);
	}
}
export default Searchbox;
