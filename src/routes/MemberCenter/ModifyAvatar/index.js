import React from 'react';
import { Icon, message, Row, Col, Button } from 'antd';
import { HOST, HOSTIMAGE } from '../../../config/config';
import Dialog from '../../../components/Dialog/';
import '../../../common/css/mobile.css';
import Footer from '../../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'dva';
var FileUpload = require('react-fileupload');
class ModifyPhoto extends React.Component{
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			baseUrl: HOSTIMAGE + '/api/client/member/v1.0/logo/upload.security',
			picFile: null,
			imageUrl: ''
		}
		
	}
	render() {
		var _This = this
		var options={
	        baseUrl: HOSTIMAGE + '/api/client/member/v1.0/logo/upload.security',
	        param:{
	            memberId: this.getCookie('memberId'),
	            uuid: this.getCookie('uuid'),
	        },
	        chooseAndUpload: true,
	        chooseFile: function(files) {
	        	_This.setState({
	        		picFile: files[0]
	        	})
	        },
	        uploadSuccess: function(resp) {
	        	if (resp.footer.status == '200') {
	        		_This.setState({
	        			imageUrl: resp.body.profile
	        		})
	        	}
	        }
	    }
		return (
			<div className="modifyavatar">
			    <div className="header"><a href="#/memberCenter/mynews"><Icon type="left" /></a><h2>修改头像</h2></div>
			  	<div className="personinfo-box">
			  		  <FileUpload options={options}>
							<button ref="chooseAndUpload" className="upload-btn">选择您要上传的头像</button>
			  		  </FileUpload>
			  		  <div className="img-box">
			  		    <img src={this.state.imageUrl} />
			  		  </div>
			  		  <Button type="primary" className="save-form-button" onClick={this.saveUserphoto.bind(this)}>
			            保存
			          </Button>
			  	</div>
			</div>
		)
	}
	saveUserphoto() {
		this.props.dispatch({
	      type:'common/querySuccess',
	      payload: {userInfo: {profile: this.state.imageUrl}}
	    })
	}
	componentDidMount() {}
	getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
  	}

}

function mapStateToProps({ common }) {
	return {common};
}
export default connect(mapStateToProps)(ModifyPhoto);