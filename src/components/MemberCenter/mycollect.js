import React from 'react';
import { Icon, Tabs, Table, Modal } from 'antd';
import { HOST } from '../../config/config';
const TabPane = Tabs.TabPane;
import fetch from 'dva/fetch';
import { Link, hashHistory } from 'dva/router';
import './style.css'
const data1 = [{
  key: '1',
  documentTitle: 'John Brown',
  documentSource: 32,
  documentTime: 'New York No. 1 Lake Park',
}];

class MyCollect extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: '02',
      records: [],
      riskRecords: [],
      bbsRecords: [],
      timer: null,
      current: 1, //当前页码
      pageSize: 5, //每页显示的条数5条
      filterDataList: []
    }
  }
	render() {
		return (
			<div className="member-containter">
				<Tabs defaultActiveKey="02" onChange={this.changeTab.bind(this)}>
				    <TabPane tab="资讯" key="02">
                <div className="inner-box">
                  <table className="info-collected-table">
                    <thead>
                      <tr><th>标题</th><th>来源</th><th>创建时间</th><th>操作</th></tr>
                    </thead>
                    <tbody>
                      {
                        (this.state.filterDataList && this.state.filterDataList.length > 0) ? 
                        this.state.filterDataList.map((item, index) => {
                          return <tr key={index}>
                          <td><Link target="_blank" className="bbsTitle" to={{pathname: 'bbsdetail', query: {}}}>{item.documentTitle}</Link></td>
                          <td>{item.documentSource}</td>
                          <td>{item.documentTime}</td>
                          <td>
                          <div className="editable-row-operations">
                          <span>

                          <button className="layui-btn layui-btn-mini layui-btn-normal" onClick={this.cancelSc.bind(this, '02', item.documentId, index)} >
                            {item.isCollected ? '取消收藏' : '收藏'}
                          </button>
                          </span>
                          </div></td>
                          </tr>
                        }) : <tr><td colSpan="4"><span style={{color: 'red', display: 'block', width: '100%', textAlign: 'center'}}>暂无数据</span></td></tr>
                      }

                    </tbody>
                  </table>
                </div>
                <div id="info_page"></div>
				    </TabPane>
				    <TabPane tab="银行理财" key="04">
                <div className="inner-box">
                <table className="collected-table">
                  <thead>
                    <tr><th>产品名称</th><th>创建时间</th><th>操作</th></tr>
                  </thead>
                  <tbody>
                    {
                      (this.state.filterDataList && this.state.filterDataList.length > 0) ? 
                      this.state.filterDataList.map((item, index) => {
                        return <tr key={index}>
                        <td><Link target="_blank" className="bbsTitle" to={{pathname: 'bbsdetail', query: {}}}>{item.productName}</Link></td>
                        <td>{item.productDate}</td>
                        <td>
                        <div className="editable-row-operations">
                        <span>
                        <button style={{width: '68px'}} className="layui-btn layui-btn-normal layui-btn-small" onClick={this.cancelSc.bind(this, '04', item.productId, index)}>
                        {item.isCollected ? '取消收藏' : '收藏'}
                        </button>
                        </span>
                        </div></td>
                        </tr>
                      }) : <tr><td colSpan="3"><span style={{color: 'red', display: 'block', width: '100%', textAlign: 'center'}}>暂无数据</span></td></tr>
                    }

                  </tbody>
                </table>
                </div>
                <div id="bank_page"></div>
				    </TabPane>
				   <TabPane tab="帖子" key="03">
                <div className="inner-box">
                <table className="bbs-collected-table">
                  <thead>
                    <tr><th>帖子名称</th><th>创建时间</th><th>操作</th></tr>
                  </thead>
                  <tbody>
                    {
                      (this.state.filterDataList && this.state.filterDataList.length > 0) ? 
                      this.state.filterDataList.map((item, index) => {
                        return <tr key={index}>
                        <td><Link target="_blank" className="bbsTitle" to={{pathname: 'bbsdetail', query: {bbsId: item.bbsId}}}>{item.bbsTitle}</Link></td>
                        <td>{item.dateTime}</td>
                        <td>
                        <div className="editable-row-operations">
                        <span>
                        <button style={{width: '68px'}} className="layui-btn layui-btn-normal layui-btn-small" onClick={this.cancelSc.bind(this, '03', item.bbsId, index)}>
                        {item.isCollected ? '取消收藏' : '收藏'}
                        </button>
                        </span>
                        </div></td>
                        </tr>
                      }) : <tr><td colSpan="3"><span style={{color: 'red', display: 'block', width: '100%', textAlign: 'center'}}>暂无数据</span></td></tr>
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
    this.setState({
      key: key
    })
    this.doAjax(key)
  }
  cancelSc(type, foreignKey, index) {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    this.state.timer = setTimeout(() => {
      var url = HOST + 'api/client/member/v1.0/collection.security';
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
            if (type == '02') {
              let dataSource = [...this.state.records];
              dataSource[index]['isCollected'] = !dataSource[index]['isCollected']
              this.setState({ dataSource });
            }
            if (type == '04') {
              let dataSource = [...this.state.riskRecords];
              dataSource[index]['isCollected'] = !dataSource[index]['isCollected']
              this.setState({ dataSource });
            }
            if (type == '03') {
               let dataSource = [...this.state.bbsRecords];
               dataSource[index]['isCollected'] = !dataSource[index]['isCollected']
               this.setState({ dataSource });
            }
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
    var url = HOST + 'api/client/center/v1.0/collection.security';
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
                records: this.filterResult(json.body.records, key)
              })
            }
            if (key == '04') {
              this.setState({
                riskRecords: this.filterResult(json.body.records, key)
              })
            }
            if (key == '03') {
              this.setState({
                bbsRecords: this.filterResult(json.body.records, key)
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
    if (key == '04') {
        elem = 'bank_page'
        count = this.state.riskRecords.length
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
        if (this.state.key == '04') {
           if (this.state.riskRecords[i]) {
              arr.push(this.state.riskRecords[i])
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
      //let obj = {}
      if (key == '02') {
        data.map((item, index) => {
          item['isCollected'] = true
        })
        //obj = {key: index, documentTitle: item.documentTitle, documentSource: item.documentSource, documentTime: item.documentTime, isCollected: true}
      }
      if (key == '04') {
        data.map((item, index) => {
          item['isCollected'] = true
        })
        // obj = {key: index, productName: item.productName, productDate: item.productDate, isCollected: true}
      }
      if (key == '03') {
        data.map((item, index) => {
          item['isCollected'] = true
        })
       // obj = {key: index, bbsTitle: item.bbsTitle, dateTime: item.dateTime, isCollected: true}
      }     
     // arr.push(obj)
    })
    return data;
  }
  componentWillUnmount() {
    clearTimeout(this.state.timer)
    this._isMounted = false
  }


}


export default MyCollect;