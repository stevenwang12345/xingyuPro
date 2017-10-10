import React from 'react';
import { Icon, Tabs, Table } from 'antd';
const TabPane = Tabs.TabPane;
import { HOST } from '../../config/config';
import { Link, hashHistory } from 'dva/router';
import fetch from 'dva/fetch';
import './style.css'
class MyBbs extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state= {
      type: '',
      id: '',
      isDialogfbShow: false,
      isDialogShow: false,
      dialogStatus: 1,
      dialogMsg: '',
      tieziRecord: [],
      caogaoRecord: [],
      dialogStatus: 0,
      fabutype: '',
      fabuid: 0,
      current: 1, //当前页码
      pageSize: 6,
      filterDataList: [],
      key: '01'
    }
  }
	render() {
		return (
			<div className="member-containter">
				<Tabs defaultActiveKey="01" onChange={this.changeTab.bind(this)}>
				    <TabPane tab="我的帖子" key="01">
              <div className="inner-box">
  						  <table className="bbs-table">
                  <thead>
                    <tr><th>标题</th><th>模块名称</th><th>收藏量</th><th>评论量</th><th>创建时间</th><th>操作</th></tr>
                  </thead>
                  <tbody>
                    {
                      (this.state.filterDataList && this.state.filterDataList.length > 0) ? 
                      this.state.filterDataList.map((item, index) => {
                        let styles = {}
                        if ((index + 1) % 2 == 0) {styles = {background: '#faf2e5'}}
                        return <tr key={index} style={styles}>
                        <td style={{width: '350px'}}><Link target="_blank" className="bbsTitle" to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link></td>
                        <td>{item.modelName}</td>
                        <td>{item.collectionCount}</td>
                        <td>{item.commentCount}</td>
                        <td>{item.dateTime}</td>
                        <td><div className="editable-row-operations"><span><button style={{background: '#999', fontWeight: 'normal', fontSize: '12px'}} className="layui-btn layui-btn-mini layui-btn-normal" onClick={this.isDelinfo.bind(this, '02', item.bbsId)}>删 除</button></span>
                        </div></td>
                        </tr>
                      }) : <tr><td colSpan="6"><span style={{color: 'red', display: 'block', width: '100%', textAlign: 'center'}}>暂无数据</span></td></tr>
                    }

                  </tbody>
                </table>
              </div>
              <div id="tiezi_page"></div>


				    </TabPane>
				    <TabPane tab="我的草稿" key="02">
                  <div className="inner-box">
                    <table className="bbs-table">
                      <thead>
                        <tr><th>标题</th><th>模块名称</th><th>创建时间</th><th>操作</th></tr>
                      </thead>
                      <tbody>
                        {
                          (this.state.filterDataList && this.state.filterDataList.length > 0) ? 
                          this.state.filterDataList.map((item, index) => {
                            let styles = {}
                            if ((index + 1) % 2 == 0) {styles = {background: '#faf2e5'}}
                            return <tr key={index} style={styles}>
                            <td style={{width: '350px'}}>{item.bbsTitle}</td>
                            <td>{item.modelName}</td>
                            <td>{item.dateTime}</td>
                            <td><div className="editable-row-operations"><span><button className="layui-btn layui-btn-mini layui-btn-normal" onClick={this.isPublishinfo.bind(this, '01', item.bbsId)}>发 布</button></span>
                            </div></td>
                            </tr>
                          }) : <tr><td colSpan="4"><span style={{color: 'red', display: 'block', width: '100%', textAlign: 'center'}}>暂无数据</span></td></tr>
                        }

                      </tbody>
                    </table>
                  </div>
                  <div id="caogao_page"></div>
				    </TabPane>
				 </Tabs>         
			</div>
		)
	} 
  filterCaogaoResult(id) {
    var arr = []
    this.state.caogaoRecord.map((item, index) => {
      if (item.bbsId != id) {
        arr.push(item)
      }
    })
    this.setState({
      caogaoRecord: arr
    })
    this.setPage(this.state.key)
    layer.closeAll()
  }
  isDelinfo(type, id) {
      var This = this;
      layer.confirm('确定要删除吗?', {title: '提示'}, function(index) {
         This.deleteBbs(type, id)
      }, function(index) {
         layer.close(index); 
      })   
  }
  deleteBbs(type, id) {
    var url = HOST + 'api/client/bbs/v1.0/update.security'
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid')
    var myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + type + '&bbsId=' + id
    }
    fetch(url, myFecthOption).then((res) => {
      return res.json()
    }).then(json => {
      if (json.footer.status == '200') {
         this.filterResult(id)
      }
    })
  }
  filterResult(id) {
    var arr = []
    this.state.tieziRecord.map((item, index) => {
      if (item.bbsId != id) {
        arr.push(item)
      }
    })
    this.setState({
      tieziRecord: arr
    })
    this.setPage(this.state.key)
    layer.closeAll()
  }
  isPublishinfo(type, id) {
       var This = this;
       layer.confirm('确定要发布吗?', {title: '提示'}, function(index) {
         This.publishBbs(type, id)
       }, function(index) {
         layer.close(index); 
       })
  }
  publishBbs(type, id) {
    var url = HOST + 'api/client/bbs/v1.0/update.security'
    var memberId = this.getCookie('memberId')
    var uuid = this.getCookie('uuid')
    var myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + type + '&bbsId=' + id
    }
    fetch(url, myFecthOption).then((res) => {
      return res.json()
    }).then(json => {
      if (json.footer.status == '200') {
        this.filterCaogaoResult(id)
      }
    })
  
  }
  changeTab(key) {
    this.setState({key: key})
    this.doAjax(key)
  }
  componentDidMount() {
    this._isMounted = true;
    this.setState({key: '01'})
    this.doAjax('01')
  }
  pageClick(pageNum) {
    this.setState({
      filterDataList: []
    })
    let arr = []
    for(var i = (pageNum - 1) * this.state.pageSize; i < this.state.pageSize * pageNum; i++){
        if (this.state.key == '01') {
           if (this.state.tieziRecord[i]) {
              arr.push(this.state.tieziRecord[i])
           }
        }
        if (this.state.key == '02') {
           if (this.state.caogaoRecord[i]) {
              arr.push(this.state.caogaoRecord[i])
           }
        }
    }
    this.setState({filterDataList: arr})
    if(pageNum != this.state.current){        
      this.state.current = pageNum        
    }   
  }
  getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
  }
  doAjax(key='') {
    var url = HOST + 'api/client/center/v1.0/mybbs.security';
    var memberId = this.getCookie('memberId');
    var uuid = this.getCookie('uuid');
    var type = key;
    let myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + type + "&page=1&size=1000"
    }
    fetch(url, myFecthOption).then((res) => {
      return res.json()
    }).then(json => {
        if (this._isMounted) {
          if (json.footer.status == '200') {
            if (key == '01') {
              this.setState({
                tieziRecord: json.body.records
              })
            }
            if (key == '02') {
              this.setState({
                caogaoRecord: json.body.records,
              })
            }
            this.setPage(key)
          } else {
            layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
          }
        }
    })
  }
  //分页输出
  setPage(key) {
    var laypage = layui.laypage;
    var elem, count;
    if (key == '01') {
        elem = 'tiezi_page'
        count = this.state.tieziRecord.length
    }
    if (key == '02') {
        elem = 'caogao_page'
        count = this.state.caogaoRecord.length
    }
    laypage.render({
      elem: elem,
      limit: this.state.pageSize,
      count: count,
      theme: '#6b3906',
      layout: ['count', 'prev', 'page', 'next'],
      jump: (obj, first) => {
        this.pageClick(obj.curr)
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false
  }

}


export default MyBbs;