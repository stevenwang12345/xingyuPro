import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, Modal, BackTop, Spin } from 'antd';
import { Link, hashHistory } from 'dva/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './community_list.css';
import wangeditor from 'wangeditor';
import $ from 'jquery';
import { HOST } from '../../config/config';
import Dialog from '../../components/Dialog/';
import ZhLogin from '../../components/Loginlayer/ZhLogin';
import QuickLogin from '../../components/Loginlayer/QuickLogin';
import { connect } from 'dva';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class bbsdetail extends React.Component {
	constructor(props, context) {
		super(props, context);
    this.state = {
        curIndex: -1,
        curSimpleIndex: -1,
        curAllIndex: true,
        backRoute: '',
        isLoginDialogShow: false,
        isDialogShow: false,
        dialogStatus: 2,
        dialogMsg: '',
        recordsbbs: [],
        recordscomment:[],
        isShow: false,
        textareastring:'',
        reply:'',
        colon:'',
        content: '',
        contentTxt:'',
        nickName:'',
        commentId:'',
        profile:'',
        type: '02',
        key:'',
        foreignKey:'',
        Bbscontent:'',
        collectionnum: 0, 
        addnum: 0,
        isCollection: 0,
        isThumbup: 0,
        essentialslist: [],
        num:'',
        isMemberCollection: 0,
        thumbupCount: '',
        collectionMsg: '收藏',
        newIsThumb: true
    }
	}
  getBackUrl() {
   window.location.reload()
  }
	render() {
    const {value, onIncreaseClick,onDecreaseClick} = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };
    let router = "#"+this.props.location.pathname + this.props.location.search;

		return (
      <div>
      <BackTop />
      <Header />
			<div className="w1170">
                <div className="contentLogReg" style={{display:"none"}}>
                     <div className="login-mask"></div>
                     <div className="login-box">
                          <div className="close" onClick={this.closeLogin.bind(this)}><Icon type="close" /></div>
                          <div className="loginWrapper" style={{width: '100%',paddingTop: '0px'}}>
                            <Row>
                              <Col span={20} offset={2}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="账号登陆" key="1">
                                      <ZhLogin backRouter={router} backUrl={this.getBackUrl.bind(this)}/>
                                    </TabPane>
                                    <TabPane tab="快捷登陆" key="2">
                                      <QuickLogin backRouter={router} backUrl={this.getBackUrl.bind(this)} />
                                    </TabPane>
                                  </Tabs>
                              </Col>
                            </Row>
                          </div>
                     </div>
                </div>

                 <div className="mb">
                      <div className="bbs-post-left fleft">
                           <div className="detail-commun">
                                 <span className="commun-a fleft">
                                  <img src= {this.state.Bbscontent.modelLogo} />
                                  </span>
                                 <div className="commun-licai fleft">
                                      <div className="commun-lc-txt"><span className="licaia fleft">
                                        {this.state.Bbscontent.modelName}
                                      </span></div>
                                      <div className="commun-des">{this.state.Bbscontent.modelRemark}</div>
                                 </div>
                                 <a className="pub-btn2 fright postThread" onClick={this.publishSubject.bind(this)}>发表主题</a>
                           </div>

                          <div className="post-pub-txt mb12">
                                <h1 className="context-title">{this.state.Bbscontent.bbsTitle}</h1>
                                <div className="post-time">
                                     <span>发表于  {this.state.Bbscontent.dateTime}</span>
                                     <a className="bbs-btn4" href="#" style={{display: 'none'}}>只看TA</a>
                                     <span><Icon type="star-o" /> 
                                        {
                                          this.state.Bbscontent.collectionCount
                                        }
                                     </span>
                                     <span><Icon type="message" /> {this.state.Bbscontent.commentCount} </span>
                                </div>
                                <div className="post-inner-txt">
                                     <div className="news_con_p" dangerouslySetInnerHTML={{__html: this.state.Bbscontent.bbsContent}}>

                                     

                                     </div>
                                     <div className="post-reward" style={{display: 'none'}}>
                                          <a className="bbs-btn5 img-reward" href="#"></a>
                                          <div className="post-reward-des" style={{display: 'none'}}>大爷给个赏钱吧~~您的激励是楼主前进的动力！</div>
                                          <div className="reward-list"  style={{display: 'none'}}>
                                              <span className="reward-ts">共2人打赏</span>
                                              <span className="reward-head"><a href="#"></a></span>
                                          </div>
                                     </div>
                                     <div className="bbs-zambia">
                                              {
                                                this.state.isThumbup == 0 ? 
                                                <a className="zan bbs-btn6" onClick={this.DarkLink.bind(this)}>
                                                    <span><Icon type="like-o" style={{color: '#ddd'}} /><span>赞 ({this.state.thumbupCount})</span></span>
                                               </a> : 
                                               <a className="zan bbs-btn6" href="javascript:void(0)">
                                                    <span><Icon type="like-o" style={{color: '#ddd'}} /><span>赞 ({this.state.thumbupCount})</span></span>
                                               </a>
                                              }
                                               
                                               <a className="bbs-btn6" onClick={this.Collection.bind(this)}>
                                                   {
                                                      this.state.isCollection == 0 ?
                                                         <span><Icon type="star-o" style={{color: '#ddd'}} /><span>收藏</span></span> :
                                                         <span><Icon type="star-o" style={{color: '#ffcc00'}} /><span>取消收藏</span></span>
                                                   }
                                                </a>
                                     </div>
                                </div>
                          </div>
                          <div className="comment-publish mb12">
                               <span className="bt">我有话说...</span>
                               <div className="editorBox all-form">
                                   <div><textarea id="textarea" placeholder="请输入评论内容..."></textarea></div>
                                  <button type="button" className="commenting tright bbs-btn7" onClick={this.Evaluation.bind(this)}>发布</button>
                                   <span style={{color: 'red', display: this.state.curAllIndex ? 'none' : ''}}>请输入评论内容</span>
                                </div>
                          </div>
                          <div className="bbsComment">
                                <div className="conver-nav">
                                     <div className="fleft">最新评论 <span className="fcred-1" style={{display:'none'}}>(35)</span></div>
                                </div>
                                <div className="bbs-comment-list mb12">
                                     <ul>
                                          {
                                            this.state.recordsbbs.length > 0 ?
                                            this.state.recordsbbs.map((item, index) => {  
                                              let textareId = "textarea" + index;
                                              return <li key={index}>
                                               <div className="clearfix">
                                                    <a className="comment-head fleft" href="javascript:void(0)">
                                                    {
                                                      item.profile ? 
                                                      <img src={item.profile} /> : <img src={require('../../common/img/default-member.jpg')} />
                                                    }
                                                    </a>
                                                    <div className="comment-list fleft">
                                                          <div className="comment-nav">
                                                               <span className="fleft">
                                                                   <a className="ctitle" href="javascript:void(0)">{item.memberName}</a>
                                                                   <span className="comment-time">{item.dateTime}</span>
                                                                   <a style={{display:'none'}} className="bbs-btn4" href="#">只看TA</a>
                                                               </span>
                                                               <div className="fright">
                                                                    <a className="bbs-btn6" onClick={this.replay.bind(this, index, item.memberName, item.commentId)}><Icon type="export" /> 回复</a>
                                                                     {
                                                                       this.getCookie('memberId') == item.memberId ? 
                                                                       <a className="repBtn" href="javascript:void(0)" onClick={this.delComment.bind(this, item.commentId, item.memberId)} ><Icon type="minus-circle-o" /> 删除</a> : ""
                                                                     }
                                                                    
                                                                    <a className="bbs-btn6" onClick={this.pingLink.bind(this,item.commentId)}>
                                                                       {
                                                                        item.isThumbup == 0 ?
                                                                        <Icon type="like-o" /> :
                                                                        <Icon type="like" />
                                                                       }
                                                                      {item.thumbup}
                                                                    </a>
                                                                   
                                                                   
                                                                </div>
                                                          </div>
                                                        <div className="comment-inner mb20">
                                                        {item.content}
                                                      {/*单个评论回复*/}
                                                      <div className="" style={{display: this.state.curIndex == index ? '' : 'none'}}>
                                                         <div className="editorBox all-form"  style={{marginBottom: '20px', marginTop: '20px'}}>
                                                              <div><textarea id={textareId} placeholder="请输入评论内容..."></textarea></div>
                                                              <Button type="primary" onClick={this.Evaluationlist.bind(this, index, item.commentId)} className="commenting tright bbs-btn7" >提交</Button>
                                                              <Button type="primary" onClick={this.cancelTijiao.bind(this)} className="commenting tright bbs-btn7 cancelTj" >取消</Button>
                                                          </div>
                                                          <span style={{color: 'red', display: this.state.curSimpleIndex==index ? '' : 'none'}}>请输入评论内容</span>
                                                      </div>
                                                        </div>
                                                         <div style={{clear:'both'}}></div>

                                                         {
                                                            this.state.recordscomment.length > 0 ? 
                                                            this.state.recordscomment.map((myitem, myindex) => {
                                                              return <div key={myindex}>
                                                                  {
                                                                    (myitem.releaseCommentId == item.commentId) ? 
                                                                      <div className="h-comment-reply">
                                                                          <div className="h-comment-nav">
                                                                              <a href="javascript:void(0)">{myitem.memberName}</a><span>{new Date().toLocaleTimeString()}</span>
                                                                              {
                                                                                this.getCookie('memberId') == myitem.memberId ? <a className="repBtn" style={{float: 'right'}} href="javascript:void(0)" onClick={this.delComment.bind(this, myitem.commentId, myitem.memberId)} ><Icon type="minus-circle-o" /> 删除</a> : ""
                                                                              }
                                                                          </div>
                                                                          <div className="h-comment-text"><div className="h-comment-text-inner">{myitem.content}</div></div>
                                                                      </div>
                                                                 :""
                                                              } </div>
                                                            }):""
                                                        }
                                                    </div>

                                               </div>
                                            </li>
                                            }) : <li className="no-data">暂无评论</li>
                                          }
                                        
                                     </ul>
                                </div>
                          </div>
                      </div>
                      <div className="bbs-post-right fright">

                           <div className="comment-person mb12">

                                <div className="plr17">
                                     <a className="cp-head fleft" style={{border: 0}} href="javascript:void(0)">
                                        {
                                          this.state.Bbscontent.memberProfile ? 
                                          <img src={this.state.Bbscontent.memberProfile} /> : 
                                          <img src={require('../../common/img/default-member-big.jpg')} />
                                        }
                                     </a>
                                     <div className="cp-right fright">
                                          <div className="mb8" style={{fontSize: '14px'}}><a className="atitle" href="jvascript:void(0)">{this.state.Bbscontent.memberName}</a></div>
                                          <div className="mb8">
                                              {
                                                this.state.isMemberCollection ? 
                                                <a className="bbs-btn2 fleft listFriend grey-bbs-btn2" href="javascript:void(0)" onClick={this.guanzhu.bind(this, '1', this.state.Bbscontent.memberId)} >已关注</a>
                                                : this.state.Bbscontent.memberId == this.getCookie('memberId') ? <a className="bbs-btn2 fleft listFriend grey-bbs-btn2" href="javascript:void(0)" onClick={this.guanzhu.bind(this, '0', this.state.Bbscontent.memberId)} >关注</a> : 
                                                <a className="bbs-btn2 fleft listFriend" href="javascript:void(0)" onClick={this.guanzhu.bind(this, '0', this.state.Bbscontent.memberId)}>关注</a>
                                               
                                              }
                                          </div>
                                          <div className="cp-tz" style={{display:'none'}}><a href="#">投资人</a><span className="blue-2">(1556积分)</span></div>
                                     </div>
                                </div>

                                <div className="number-list">
                                     <a href="javascript:void(0)"><span>{this.state.Bbscontent.fans}</span><i>粉丝</i></a>
                                     <a href="javascript:void(0)"><span>{this.state.Bbscontent.bbsCount}</span><i>文章</i></a>
                                </div>

                                <div className="cp-list" style={{display:'none'}}>
                                     <div className="plr17">
                                          <span className="cp-art fleft">TA最近的文章</span>
                                          <a className="cp-more fright" href="#">更多 »</a>
                                     </div>
                                     <div className="hot-list">
                                          <ul>
                                             <li><em>1</em><a href="#">【其实不想吐槽】妙资金融涉嫌非吸被立案调查，投资人慌了！</a></li>
                                             <li><em>1</em><a href="#">【其实不想吐槽】妙资金融涉嫌非吸被立案调查，投资人慌了！</a></li>
                                             <li><em>1</em><a href="#">【其实不想吐槽】妙资金融涉嫌非吸被立案调查，投资人慌了！</a></li>
                                          </ul>
                                     </div>
                                </div>

                           </div>

                           <div className="bbs-hot bbs-read  n-nav">
                                <div className="bg-nav"><span className="avtive">最新精华</span></div>
                                <div className="hot-list">
	                                  <ul>{
                                    }
                                         {
                                            this.state.essentialslist.length > 0 ? 
                                            this.state.essentialslist.map((item, index) => {
                                              return <li key={index}>
                                                 <em>{index+1}</em><Link target="_blank" to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link>
                                               </li>
                                            }) :  <span className="no-data"><Spin size="large" /></span>     
                                          }
	                                  </ul>
                                 </div>
                           </div>
                      </div>
                 </div>
                 <Dialog isDialogShow={this.state.isDialogShow} actionDialog={this.actionDialog.bind(this)} status={this.state.dialogStatus} msg={this.state.dialogMsg}/>
                </div>
        <div style={{clear: 'both'}}></div>
         <Footer />
         </div>
		)
	}
  showDialog() {
     $(".contentLogReg").show();
  }
  goLogin() {
    var bbsId = this.props.location.query.bbsId;
    window.location.href = '#/login/' + encodeURIComponent('bbsdetail?bbsId=' + bbsId)
  }
  publishSubject() {
      var memberId = this.getCookie('memberId')
      var uuid = this.getCookie('uuid')
      if (!memberId && !uuid) {
        $(".contentLogReg").show();
        return;
      }
      hashHistory.push('publicSubject')
  }
  closeLogin() {
    $(".contentLogReg").hide();
  }
  actionLoginDialog(status) {
    if (status == 1) {
      this.setState({
        isLoginDialogShow: false
      })
    }
  }
  actionDialog(status) {
    if (status == 1) {
      this.setState({
        isDialogShow: false
      })
    }
  }
  guanzhu(status, tomemberId) {
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid')
    if (!memberId && !uuid) {
        $(".contentLogReg").show();
        return;
    } else {
        this.gzMember(status, tomemberId)
    }
  }
  //关注会员
  gzMember(status, tomemberId) {
      var url = HOST + 'api/client/center/v1.0/member/collection.security'
      var memberId = this.getCookie('memberId');
      var uuid = this.getCookie('uuid');
      var type = '01';
      let myFecthOption = {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + type + "&fansId=" + tomemberId
      }
      fetch(url, myFecthOption).then(res => {
        return res.json()
      }).then(json => {
        if (json.footer.status == '200') {
          if(status=='1') {
            this.setState({
              isMemberCollection: 0
            })
          } else {
            this.setState({
              isMemberCollection: 1
            })
          }

        } else {
         layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
        }
      })
  }
  componentDidMount() {
   let foreignKey = this.props.location.query.bbsId;
   this.getEssentials();
   this.getBbsid(foreignKey);
   this.CommentList(foreignKey);
  }
  getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
  }
  
  //收藏
  Collection() {
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid')
    var foreignKey = this.props.location.query.bbsId;
    if (!memberId && !uuid) {
      $(".contentLogReg").show();
      return;
    }

    var url = HOST + 'api/client/member/v1.0/collection.security';
    let myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&foreignKey=" + foreignKey + "&type=" + '03'
    }
    fetch(url, myFecthOption).then(res => {
      return res.json()
    }).then(json => {
      if (json.footer.status == '200') {
        if (this.state.isCollection){
          this.setState({isCollection: 0})
          layer.msg('取消成功', {icon: 5, skin: 'successbox', time: 2000}); 
        } else {
          this.setState({ isCollection: 1})
          layer.msg('收藏成功', {icon: 5, skin: 'successbox', time: 2000}); 
        }           
      } else {
          layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
      }
    })
  }

  //点赞
  DarkLink() {
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid')
    var foreignKey = this.props.location.query.bbsId;
    if (!memberId && !uuid) {
      $(".contentLogReg").show();
      return;
    }
    var url = HOST + 'api/client/member/v1.0/thumbup.security'
    let myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&foreignKey=" + foreignKey + "&type=" + '03'
    }
    fetch(url, myFecthOption).then(res => {
      return res.json()
    }).then(json => {
      if(json.footer.status == '200') {
        if (this.state.newIsThumb) {
          this.setState({
            thumbupCount: this.state.thumbupCount + 1,
            newIsThumb: false
          })
          $('.zan i').css('color', '#ffcc00')
        }
        
        // if(this.state.isThumbup) {
        //   this.setState({
        //     isThumbup: 0
        //   })
        // }else{
        //   this.setState({
        //     isThumbup: 1
        //   })
        // }
      }
    })
  }

  //评论点赞
  pingLink(commentId) {
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid')
    var foreignKey = this.props.location.query.bbsId;
    if (!memberId && !uuid) {
      $(".contentLogReg").show();
      return;
    }

    var url = HOST + 'api/client/comment/v1.0/comment/thumbup'
    var memberId = this.getCookie('memberId');
    var uuid = this.getCookie('uuid');
    let myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&commentId=" + commentId
    }
    fetch(url, myFecthOption).then(res => {
      return res.json()
    }).then(json => {
      if(json.footer.status == '200') {
        var commentlist = this.state.recordsbbs;
        for(var i=0;i<commentlist.length;i++){
          var comment = commentlist[i];
          if(comment.commentId==commentId){
            if(comment.isThumbup ==0 ){
                comment.isThumbup =1;
                comment.thumbup++;
            }else{
               comment.isThumbup =0;
                comment.thumbup--;
            }
            break;
          }
        }
        this.setState({
          recordsbbs:commentlist
        })

      }
    })
  }

  //不喜欢
  LessLink(foreignKey='') {
    var lessnum = 0
    var url = HOST + 'api/client/member/v1.0/dislike.security'
    var memberId = this.getCookie('memberId');
    var uuid = this.getCookie('uuid');
    let myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&foreignKey=" + foreignKey + "&type=" + '03'
    }
    fetch(url, myFecthOption).then(res => {
      return res.json()
    }).then(json => {
      if (json.footer.status == '200') {
          lessnum = this.state.lessnum++;
          lessnum: this.state.lessnum + 1;
          this.setState({
            lessnum:this.state.lessnum
          })     
      } else {
        layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
      }
    })
  }

  //评论列表
  CommentList(foreignKey) {
    var url = HOST + '/api/client/comment/v1.0/comment/list'
    var memberId = this.getCookie('memberId');
    var uuid = this.getCookie('uuid');
    let myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&key=" + foreignKey + "&code=03&page=1&size=1000"
    }
    fetch(url, myFecthOption).then(res => {
      return res.json()
    }).then(json => {
      if (json.footer.status == '200') {
          var length = json.body.records.length;
          var bbslist=[];
          var commentlist =[];
          for(var i = 0; i < length; i++){
            var comment = json.body.records[i];
            if(comment.releaseCommentId == ""){
                bbslist[bbslist.length]=comment;
            }else{
                commentlist[commentlist.length]=comment;
            }
          }
          this.setState({
            recordsbbs:bbslist,
            recordscomment:commentlist
          })
          //console.log(666, this.state.recordscomment)
        }
    })
  }
  addKeys(obj) {
    obj.records.map((item, index) => {
      item['isShow'] = false
    })
    return obj
  }
  //回复评价 单个评论回复
  Evaluationlist(index, commentId) {
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid');
    var contentTxt = $("#textarea"+index ).val();   
    if (!memberId && !uuid) {
      $(".contentLogReg").show();
      return;
    }
    if (contentTxt == "") {
        this.setState({
          curSimpleIndex: index
        })
        return;
    }

    var foreignKey = this.props.location.query.bbsId;
    var huiArr = this.state.recordsbbs;
    var url = HOST + '/api/client/comment/v1.0/comment/add';
       
    let params ="memberId=" + memberId + "&key=" + foreignKey + "&code=03&content=" + contentTxt + "&commentId="+commentId;
    let myFecthOption = {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
    }
    this.simpleHuifu(url, myFecthOption, huiArr, $("#textarea"+index))
  }
simpleHuifu(url, myFecthOption, huiArr, obj) {
         let foreignKey = this.props.location.query.bbsId;
         fetch(url, myFecthOption).then(res => {
              return res.json()
          }).then(json => {
              if (json.footer.status == "200") {
                this.setState({
                  report: json.body,
                  curIndex: -1
                })
                this.CommentList(foreignKey);
                $(obj).val("")
              } else {
                layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
              }
          })
  }

  //帖子回复
  Evaluation() {
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid')
    var contentTxt = $("#textarea").val();  
    if (!memberId && !uuid) {
      $(".contentLogReg").show();
      return;
    }

    if (contentTxt == "") {
        this.setState({
          curAllIndex: false
        })
        return;
    }
    var foreignKey = this.props.location.query.bbsId;
    var huiArr = this.state.recordsbbs;
    var url = HOST + 'api/client/comment/v1.0/comment/add';
    var content = contentTxt;
    let params ="memberId=" + memberId + "&key=" + foreignKey + "&code=03&content=" + content + "&commentId=";
    let myFecthOption = {
            method: 'post',
            credentials: 'include',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
    }
    this.Huifu(url, myFecthOption, huiArr, $("#textarea"))
  }
  Huifu(url, myFecthOption, huiArr, obj) {
         let foreignKey = this.props.location.query.bbsId;
         fetch(url, myFecthOption).then(res => {
              return res.json()
          }).then(json => {
              if (json.footer.status == "200") {
                this.setState({
                  report: json.body
                })
                $(obj).val("");
                this.CommentList(foreignKey);
              } else {
                layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
              }
          })
  }
 //获取详情
   getBbsid(foreignKey) {
      var url = HOST + '/api/client/bbs/v1.0/detail';
      var memberId = this.getCookie('memberId');
      var uuid = this.getCookie('uuid');
      let myFecthOption = {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "memberId=" + memberId + "&uuid=" + uuid + "&bbsId=" + foreignKey
      }
      fetch(url, myFecthOption).then(res => {
        return res.json()
      }).then(json => {
        if (json.footer.status == '200') {
            this.setState({
              Bbscontent: json.body,
              collectionnum: json.body.collectionCount,
              isCollection:json.body.isCollection,
              isThumbup: json.body.isThumbup,
              thumbupCount: json.body.thumbupCount,
              collectionCount: json.body.collectionCount,
              isMemberCollection: json.body.isMemberCollection,
            })
            console.log(111, json)
            this.setPageTitle()
        } else {
          layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
        }
      })
  }
  setPageTitle() {
      var str = this.state.Bbscontent.bbsTitle;
      $("title").html("")
      $("title").html(str); 
  }
 //精华贴
  getEssentials() {
      var url = HOST + '/api/client/bbs/v1.0/list';
      var memberId = this.getCookie('memberId');
      var uuid = this.getCookie('uuid');
      var num = '';
      let myFecthOption = {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "&type=01&limit=10"
      }
      fetch(url, myFecthOption).then(res => {
        return res.json()
      }).then(json => {
        if (json.footer.status == '200') {
          this.setState({
            essentialslist:json.body
          })
        } else {
          layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
        }
      })
  }
  cancelTijiao() {
    this.setState({
      curIndex: -1
    })
  }
  //回复评论
  replay(index, memberName,commentId) {
    var memberId = this.getCookie('memberId');
    var uuid = this.getCookie('uuid');
    if (!memberId && !uuid) {
      $(".contentLogReg").show();
      return;
    }
    this.setState({
      curIndex: index,
      curSimpleIndex: -1
    })
    $('#textarea' + index).val("")
  }
  //删除评论
  delComment(commentId, originMemberId) {
    var memberId = this.getCookie('memberId');
    var uuid = this.getCookie('uuid');
    if (!memberId && !uuid) {
      $(".contentLogReg").show();
      return;
    }
    if (originMemberId == memberId) {
      var url = HOST + '/api/client/comment/v1.0/comment/delete';
      let myFecthOption = {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "id=" + commentId
      }
      fetch(url, myFecthOption).then(res => {
        return res.json()
      }).then(json => {
        if (json.footer.status == '200') {
              this.CommentList(this.props.location.query.bbsId)
              layer.alert('删除成功', {icon: 5, skin: 'successbox'})
        } else {
             layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
        }
      })     
    } else {
      layer.alert('无法删除其他用户发布的评论', {icon: 1, skin: 'warnbox'});
    }
  }

}

//export default Form.create()(bbsdetail)

function mapStateToProps({ common }) {
  return {common};
}
export default connect(mapStateToProps)(Form.create()(bbsdetail));
















































