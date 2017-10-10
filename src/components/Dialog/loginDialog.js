import React from 'react';
import { Icon } from 'antd';
import { hashHistory } from 'dva/router'
class Dialog extends React.Component{
	render() {
		return (
			<div style={{display: this.props.isDialogShow ? '' : 'none'}}>
				<div className="jumpMark"></div>
				    <div className="jumpPopup" style={{zIndex: '20000'}}>
				    	<div className="title">
				    			<span  className="close" onClick={this.hideDialog.bind(this)}>×</span>
				    	</div>
				    	<p>
					    	{
					    		this.props.status == 1 ? <Icon type="check-circle" /> : 
					    		this.props.status == 2 ? <Icon type="exclamation-circle" /> : <Icon type="close-circle" />
					    	}
					    	<span className="txt">{this.props.msg}</span>
				    	</p>
				    	<button className="confirmBtn" onClick={this.goUrl.bind(this)}>确定</button>
				    </div>
			</div>
		)
	}
	hideDialog() {
		this.props.actionLoginDialog(1)
	}
	goUrl() {
		this.props.goLogin()
	}


}


export default Dialog;