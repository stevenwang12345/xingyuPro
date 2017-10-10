import React from 'react';
import { Icon, Tabs, Table, Modal } from 'antd';
import { HOST } from '../../config/config';
const TabPane = Tabs.TabPane;
import fetch from 'dva/fetch';
import { Link, hashHistory } from 'dva/router';
import './style.css'

class MyThumpUp extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: '02',
      records: [],
      bbsRecords: [],
      timer: null,
      current: 1, //当前页码
      pageSize: 5, //每页显示的条数5条
      filterDataList: [],
      key: '02'
    }
  }
  render() {
    return (
      <div className="member-containter">
        <Tabs defaultActiveKey="02" onChange={this.changeTab.bind(this)}>
            <TabPane tab="资讯" key="02">
             <div className="inner-box">
                <table className="thumbup-collected-table">
                  <thead>
                    <tr><th>标题</th><th>来源</th><th>创建时间</th><th>操作</th></tr>
                  </thead>
                  <tbody>
                    {
                      (this.state.filterDataList && this.state.filterDataList.length > 0) ? 
                      this.state.filterDataList.map((item, index) => {
                        return <tr key={index}>
                        <td style={{width: '478px'}} className="bbsTitle">{item.documentTitle}</td>
                        <td>{item.documentSource}</td>
                        <td>{item.documentTime}</td>
                        <td>
                        <div className="editable-row-operations">
                        <span>
                        <button style={{width: '68px'}} className="layui-btn layui-btn-normal layui-btn-small" onClick={this.cancelSc.bind(this, '02', item.documentId, index)}>
                        {item.isThumbUp ? '取消点赞' : '点赞'}
                        </button>
                        </span>
                        </div></td>
                        </tr>
                      }) : <tr><td colSpan="4">暂无数据</td></tr>
                    }
                  </tbody>
                </table>
              </div>
                 <div id="info_page"></div>
            </TabPane>
           <TabPane tab="帖子" key="03">
               <div className="inner-box">
                <table className="thumbup-collected-table">
                  <thead>
                    <tr><th>帖子名称</th><th>创建时间</th><th>操作</th></tr>
                  </thead>
                  <tbody>
                    {
                      (this.state.filterDataList && this.state.filterDataList.length > 0) ? 
                      this.state.filterDataList.map((item, index) => {
                        return <tr key={index}>
                        <td style={{width: '478px'}}><Link target="_blank" className="bbsTitle" to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link></td>
                        <td>{item.dateTime}</td>
                        <td>
                        <div className="editable-row-operations">
                        <span>
                        <button style={{width: '68px'}} className="layui-btn layui-btn-normal layui-btn-small" onClick={this.cancelSc.bind(this, '03', item.bbsId, index)}>
                        {item.isThumbUp ? '取消点赞' : '点赞'}
                        </button>
                        </span>
                        </div></td>
                        </tr>
                      }) : <tr><td colSpan="3">暂无数据</td></tr>
                    }

                  </tbody>
                </table>
                </div>
                <div id="bbs_page"></div>
            </TabPane>
         </Tabs>
      </div>
    )
  }
  changeTab(key) {
    this.setState({key: key})
    this.doAjax(key)
  }
  cancelSc(type, foreignKey, index) {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    this.state.timer = setTimeout(() => {
      var url = HOST + 'api/client/member/v1.0/thumbup.security'
      var memberId = this.getCookie('memberId');
      var uuid = this.getCookie('uuid');
      let myFecthOption = {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + type + "&foreignKey=" + foreignKey
      }
      fetch(url, myFecthOption).then(res => {
        return res.json()
      }).then(json => {
        if (json.footer.status == '200') {
            let dataSource = []
            if (type == '02') {
              dataSource = [...this.state.records];
            } else {
              dataSource = [...this.state.bbsRecords];
            }
            dataSource[index]['isThumbUp'] = !dataSource[index]['isThumbUp']
            this.setState({ dataSource });
        } else {
          layer.alert(json.footer.message, {icon: 1, skin: 'warnbox'});
        }
      })
    }, 50)

  }
  getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
  }

  componentDidMount() {
    this._isMounted = true
    this.setState({key: '02'})
    this.doAjax('02')
  }
  doAjax(key='') {
    var url = HOST + 'api/client/center/v1.0/thumbup.security';
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
            if (key == '02') {
              this.setState({
                records: this.filterResult(json.body.records, key),
              })
            }
            if (key == '03') {
              this.setState({
                bbsRecords: this.filterResult(json.body.records, key),
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
    if (key == '02') {
        elem = 'info_page'
        count = this.state.records.length
    }
    if (key == '03') {
        elem = 'bbs_page'
        count = this.state.bbsRecords.length
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
  pageClick(pageNum) {
    this.setState({
      filterDataList: []
    })
    let arr = []
    for(var i = (pageNum - 1) * this.state.pageSize; i < this.state.pageSize * pageNum; i++){
        if (this.state.key == '02') {
           if (this.state.records[i]) {
              arr.push(this.state.records[i])
           }
        }
        if (this.state.key == '03') {
           if (this.state.bbsRecords[i]) {
              arr.push(this.state.bbsRecords[i])
           }
        }
    }
    this.setState({filterDataList: arr})
    if(pageNum != this.state.current){        
      this.state.current = pageNum        
    }   
  }
  filterResult(data, key) {
    let arr= []
    data.map((item, index) => {
      if (key == '02') {
        data.map((item, index) => {
          item['isThumbUp'] = true
        })
      }
      if (key == '03') {
        data.map((item, index) => {
          item['isThumbUp'] = true
        })
      }     
    })
    return data;
  }
  componentWillUnmount() {
    clearTimeout(this.state.timer)
    this._isMounted = false
  }


}


export default MyThumpUp;