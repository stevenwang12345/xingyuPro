import React from 'react';
import { Icon, message, Row, Col, Button } from 'antd';
import { HOST, HOSTIMAGE } from '../../../config/config';
import { connect } from 'dva';
class ModifyPhoto extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			baseUrl: HOSTIMAGE + '/api/client/member/v1.0/logo/upload.security',
			imageUrl: '',
			uploadIsShow: true
		}
		
	}
	render() {
		return (
			<div>
			  <Row>
			  	<Col span={12} className="personinfo-box">
					 <p className="" style={{fontSize: '14px', marginBottom: '20px'}}>选择您要上传的头像(<span style={{color:'red'}}>支持拖拽上传</span>)</p>
			  		  <div className="imgbox">
			  		  		<a id="uploads" style={{display: this.state.uploadIsShow ? '' : 'none'}}>+</a>
			  		  </div>
			  	</Col>
			  	<Col span={12} style={{background: 'white', height: '277px'}}>
			  		 <div className="thumbPic">
			  		 	{
			  		 		this.state.imageUrl ? <img src={this.state.imageUrl} /> : <span>头像缩略图</span>
			  		 	}
			  		 </div>
			  	</Col>
			  </Row>
			</div>
		)
	}
	//重新上传用户头像
	resetUploadphoto() {
	}
	saveUserphoto() {
		this.props.dispatch({
	      type:'common/querySuccess',
	      payload: {userInfo: {profile: this.state.imageUrl}}
	    })
	    document.cookie="profile="+this.state.imageUrl + ";path=/";
	}
	componentDidMount() {
		this.doUpload()
	}
	doUpload() {
		var upload = layui.upload;
		upload.render({
			elem: '#uploads',
			url:  this.state.baseUrl,
			data: { memberId: this.getCookie('memberId'), uuid: this.getCookie('uuid')},
			done: (res, index, upload) => {
				console.log(7777777, res)
				if(res.footer.status == '200') {
					this.setState({
						imageUrl: res.body.profile
					})
					this.saveUserphoto()
					layer.alert('文件上传成功', {icon: 5, skin: 'successbox'})

				} else {
					layer.alert('文件上传错误', {icon: 1, skin: 'warnbox'})
				}
			},
			error: (index, upload) => {
				layer.alert('文件上传错误', {icon: 1, skin: 'warnbox'})
			}
		})
	}
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