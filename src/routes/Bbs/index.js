import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal, Select, BackTop } from 'antd';
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
import { HOST } from '../../config/config'
import { Link, hashHistory } from 'react-router';
import fetch from 'dva/fetch';
import wangeditor from 'wangeditor';
import Dialog from '../../components/Dialog/'
import LoginDialog from '../../components/Dialog/loginDialog'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import $ from 'jquery';
import './post.css';

class community extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                 isLoginDialogShow: false,
                 isDialogShow: false,
                 dialogStatus: 2,
                 dialogMsg: '',
                 exposureStatus: false,
                 title: '', platformName: '', platformWebsite: '', platformCause: '',
                 Othertitle: '',
                 titleShow: false, platformNameShow: false, platformWebsiteShow: false, platformCauseShow: false,
                 OthertitleShow: false,
                 info:[],
                 modelId:'',
                 currType: '00',
                 filterParams:{
                     memberId: 0,
                     uuid: 0,
                     modelId: '',
                     title:'',
                     content:'',
                     isPublish:'0'
                 }
            }
        }
        render() {  
            const { getFieldDecorator } = this.props.form;
            return (
              <div>
              <BackTop />
              <Header />
              <div className = "w1170" >
                  <div className = "pdlr20 posFixed" >
                      <div className = "mb20 clearfix" >
                          <select id="selects" style = {{ width: 160 }} onChange={this.getSelectValue.bind(this)}>
                            {
                              (this.state.info && this.state.info.length > 0) ? 
                              this.state.info.map((item, index) => {
                                  return <option key={index} value={item.type}>
                                  {
                                    item.modelName == '全部' ? '请选择' : item.modelName
                                  }
                                  </option>
                              }) : ''
                            }
                           </select> 

                           <div id="Exposure">
                                <input className="px option_field" id="expos_title" onKeyUp={this.getInputValue.bind(this, 1)} placeholder="请输入标题，最多可输入40个字符" maxLength = "40" type="text" />
                                <span className="errortips" style={{display: this.state.titleShow ? '' : 'none'}}>请输入标题</span>
                                <input className="px option_field" id="expos_platformName" onKeyUp={this.getInputValue.bind(this, 2)} type="text" placeholder="请输入平台名称" />
                                <span className="errortips" style={{display: this.state.platformNameShow ? '' : 'none'}}>请输入平台名称</span>
                                <input className="px option_field" id="expos_platformWebsite" onKeyUp={this.getInputValue.bind(this, 3)} type="text" placeholder="请输入平台链接" />
                                <span className="errortips" style={{display: this.state.platformWebsiteShow ? '' : 'none'}}>请输入平台链接</span>
                                <textarea type="text" id="expos_platformCause" placeholder="请输入曝光原因, 不能超过500字, 曝光帖必须在正文中上传图片证据" onKeyUp={this.getInputValue.bind(this, 4)} defaultValue={this.state.platformCause}></textarea>
                                <span className="errortips" style={{display: this.state.platformCauseShow ? '' : 'none'}}>请输入曝光原因</span>
                           </div>

                           <div id="Other" style={{display:'none'}}>
                                <input className="px option_field" id="other_title" onKeyUp={this.getInputValue.bind(this, 5)}  placeholder="请输入标题，最多可输入40个字符" maxLength = "40" type="text" />
                                <span className="errortips" style={{display: this.state.OthertitleShow ? '' : 'none'}}>请输入标题</span>
                           </div>

                           <div id="editor" style={{height: '200px'}}></div> 

                          <div className="pnpost">
                                <Button id="postsubmit" onClick={this.exPosure.bind(this, 0)} className="h-btn1">保存草稿</Button>
                                <Button id="tie" onClick={this.exPosure.bind(this, 1)} className="h-btn1 pnc">发布帖子</Button>
                          </div>
                      </div>
                 </div>
                 <Dialog isDialogShow={this.state.isDialogShow} actionDialog={this.actionDialog.bind(this)} status={this.state.dialogStatus} msg={this.state.dialogMsg}/>
                 <LoginDialog bbsId = {this.props.location.query.bbsId} isDialogShow={this.state.isLoginDialogShow} actionLoginDialog={this.actionLoginDialog.bind(this)} status={this.state.dialogStatus} msg={this.state.dialogMsg}/>
                  
             </div>
             <Footer />
             </div>
            )
        }
      getInputValue(type) {

      }
      actionDialog(status) {
        if (status == 1) {
          this.setState({
            isDialogShow: false
          })
        }
      }
      actionLoginDialog(status) {
        if (status == 1) {
          this.setState({
            isLoginDialogShow: false
          })
        }
      }
      //发布帖子
      exPosure(isPublish) {
        var memberId = this.getCookie('memberId')
        var uuid = this.getCookie('uuid')
        if (!memberId && !uuid) {
          layer.alert(
            '您尚未登录', 
            {icon: 1, skin: 'warnbox'}
          )
          return;
        }
        let vtext = $('#selects option:selected').text();
        if (vtext == '请选择') {
            layer.alert('请选择社区模块', {icon: 1, skin: 'warnbox'})
            return;
        }
         var Edittext = this.state.editor.$txt.text();
         var EditHtml = this.state.editor.$txt.html();
         var imgindex = EditHtml.indexOf('<img');
          if (this.state.currType == '00') {
            var other_title = $('#other_title').val()

            if (other_title == '' || (Edittext== '' && imgindex < 0)) {
              layer.alert('所填选项不能为空', {icon: 1, skin: 'warnbox'})
            } else {
              this.doOtherAjax(other_title, isPublish, EditHtml)
            }
        } else {
          var title = $('#expos_title').val()
          var platformName = $('#expos_platformName').val()
          var platformWebsite = $('#expos_platformWebsite').val()
          var platformCause = $('#expos_platformCause').val()
          if ((Edittext== '' && imgindex < 0) || title == '' || platformName== '' || platformWebsite=='' || platformCause=='') {
            layer.alert('所填选项不能为空', {icon: 1, skin: 'warnbox'})
          } else {
            this.doExposureAjax(title, platformName, platformWebsite, platformCause, isPublish, EditHtml)
          }
        }
         

      }
      filterFileId(EditHtml) {
          var ids = ''
          EditHtml = EditHtml.match(/<img[^>]+>/g);
          if (EditHtml) {
            EditHtml.map((item, index) => {
              if(item.indexOf('id=') >= 0) {
                var id = (item.split('id=')[1].split(' style=')[0]);
                id = id.replace(/\"/g, "");
                ids += parseInt(id) + ','
              }
            })
          }
          return ids;
      }
      doOtherAjax(title, isPublish, EditHtml) {
          var memberId = this.getCookie('memberId')
          var uuid = this.getCookie('uuid')
          if (!memberId && !uuid) {
            layer.alert('您尚未登录', {icon: 1, skin: 'warnbox'})
            return;
          }
          var imageIds = this.filterFileId(EditHtml);
          let modelId = this.getCookie('modelId');
          let url = HOST + 'api/client/bbs/v1.0/publish';
          var content = encodeURIComponent(this.state.editor.$txt.html());
          let params ='memberId=' + memberId + '&uuid=' + uuid + '&modelId=' + modelId + '&imageIds=' + imageIds + '&title=' + title + '&content=' + content + '&isPublish=' + isPublish;
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
                  report: json.body
              })
              if (json.footer.status == "200") {
                layer.alert('发布成功', {icon: 5, skin: 'successbox'})
                this.state.editor.clear()
                hashHistory.push('bbs')
              } else {
                layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'})
              }
          })
      }
      doExposureAjax(title, platformName, platformWebsite, platformCause, isPublish, EditHtml) {
          var memberId = this.getCookie('memberId')
          var uuid = this.getCookie('uuid')
          if (!memberId && !uuid) {
            layer.alert('您尚未登录', {icon: 1, skin: 'warnbox'})
            return;
          }
          var imageIds = this.filterFileId(EditHtml);
          let modelId = this.getCookie('modelId');
          let url = HOST + 'api/client/bbs/v1.0/publish';
          let content = encodeURIComponent(this.state.editor.$txt.html());
          let params ='memberId=' + memberId + '&uuid=' + uuid + '&modelId=' + modelId + '&imageIds=' + imageIds + '&title=' + title + '&platformName=' + platformName + '&platformWebsite=' + platformWebsite + '&platformCause=' + platformCause + '&content=' + content + '&isPublish=' + isPublish;
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
                  report: json.body
              })
              if (json.footer.status == "200") {
                layer.alert('保存成功', {icon: 5, skin: 'successbox'})
                this.state.editor.clear();
                hashHistory.push('bbs');
              } else {
                layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'})
              }
          })
      }


      componentDidMount() {
        $("#Exposure").hide();
        $("#Other").show();
        this.fication(); 
        this.initEditor();
       } 
      initEditor() {
          var uploadPicUrl = "http://10.10.20.201:50080/finassesss-image/api/image/v1.0/client/upload.security"
          var memberId = this.getCookie('memberId')
          var uuid = this.getCookie('uuid');
          var picFile = null;
          this.state.editor = new wangEditor('editor')
          this.state.editor.config.uploadImgUrl = uploadPicUrl;
          
          this.state.editor.config.uploadParams = {
              memberId: memberId,
              uuid: uuid,
              bizType: '03',
              picFile: picFile
          }
          this.state.editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
               if (item === 'location') {
                   return null;
               }
               if (item == 'video') {
                return null;
               }
               return item;
           });
          this.state.editor.config.uploadImgFns.onload = (resultText, xhr) => {
           // console.log('other111111', resultText)

            var resultText = JSON.parse(resultText)
            var fileId = resultText.body.fileId;
            var imgHost = resultText.body.imageHost;
            var filePath = resultText.body.filePath;
            var allPath = imgHost + filePath
            this.state.editor.command(null, 'insertHtml', '<img src="' + allPath + '"  id="' + fileId + '" style="max-width:100%;"/>');
          }
          this.state.editor.config.hideLinkImg = true;
          this.state.editor.create();
      }
      getCookie(name) {
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
          if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
          else
          return null;
      }

      getSelectValue(e) {
        let v = $('#selects option:selected').text();
        let newtype = $('#selects option:selected').val();
        this.filterResult(v)
        if( newtype == "00"){
          $("#Exposure").hide();
          $("#Other").show();
        }else{
           $("#Other").hide();
           $("#Exposure").show();
        }
        this.setState({
          type: newtype,
          currType: newtype
        })

      }
      
      filterResult(v) {
        this.state.info.map((item, index) => {
          if (v == item.modelName) {
              document.cookie="modelId=" + item.modelId
          }
        })
      } 

      fication() {
        let url = HOST + '/api/client/bbs/v1.0/model/list';
        let myFecthOption = {
          method:'get'
        }
          fetch(url,myFecthOption).then(res => {
            return res.json()
          }).then(json => {
            this.setState({
              info:json.body
            })
          })
      }

    }

    export default Form.create()(community);
