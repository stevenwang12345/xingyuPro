import React from 'react';
import { Icon, Tabs, Table } from 'antd';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';
import './style.css'
class MyNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plRecord: [],//评论总记录数 
      filterDataList: [], //获取数据的存放位置
      bbsRecord: [],
      stystemRecord: [],
      goValue: '',
      totalNum: '',//总记录数
      current: 1, //当前页码
      pageSize: 5, //每页显示的条数5条
      totalPage: '',//总页数
      key: '01'
    }
  }
  changeTab(key) {
    this.setState({
      key: key
    })
    this.doAjax(key)
  }
	render() {
		return (
			<div className="member-containter">
				<Tabs defaultActiveKey="01" onChange={this.changeTab.bind(this)}>
				    <TabPane tab="评论" key="01">
              <div className="inner-box">
              <ul className="mynews-box">
              {
                this.state.filterDataList.length > 0 ?
                this.state.filterDataList.map((item, index) => {

                  return <li key={index}><span className="memberName">{item.memberName}</span> 论了你的文章： <Link>{item.bbsTitle}</Link> <span className="time">{item.dateTime}</span></li>
                }) : <span>暂无数据</span>
              }
              </ul>
              </div>
              <div id="pl_page"></div>
				    </TabPane>
				    <TabPane tab="文章" key="02">
             <div className="inner-box">
                <ul className="mynews-box">
                  {
                    this.state.filterDataList.length > 0 ?
                    this.state.filterDataList.map((item, index) => {
                      let tag = '';
                      tag = item.type == '01' ? '收藏' : '点赞'
                      return <li key={index}>您的文章被 <span className="memberName">{item.memberName} {tag}: {item.bbsTitle}</span>
                      <span className="time">{item.dateTime}</span>
                      </li>
                    }) : <span style={{display: 'block', width: '100%', textAlign: 'center', color: 'red'}}>暂无数据</span>
                  }
                </ul>
              </div>
              <div id="bbs_page"></div>
				    </TabPane>
				    <TabPane tab="系统" key="03">
              <div className="inner-box">
                <ul className="mynews-box stystem">
                {
                  this.state.filterDataList.length > 0 ?
                  this.state.filterDataList.map((item, index) => {
                    return <li key={index}>
                      <h2>{item.title} <span className="time">{item.dateTime}</span></h2>
                      <p>{item.content}</p>
                      </li>
                  }) : <span>暂无数据</span>
                }
                </ul>
              </div>
              <div id="system_page"></div>
				    </TabPane>
				 </Tabs>
			</div>
		)
	}
  componentDidMount() {
    this._isMounted = true;
    this.doAjax('01')
  }
  pageClick(pageNum) {
    this.setState({
      filterDataList: []
    })
    let arr = []
    for(var i = (pageNum - 1) * this.state.pageSize; i < this.state.pageSize * pageNum; i++){
        if (this.state.key == '01') {
           if (this.state.plRecord[i]) {
              arr.push(this.state.plRecord[i])
           }
        }
        if (this.state.key == '02') {
           if (this.state.bbsRecord[i]) {
              arr.push(this.state.bbsRecord[i])
           }
        }
        if (this.state.key == '03') {
           if (this.state.stystemRecord[i]) {
              arr.push(this.state.stystemRecord[i])
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
    var url = HOST + 'api/client/center/v1.0/message.security';
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
                plRecord: json.body.records
              })
            }
            if (key == '02') {
              this.setState({
                bbsRecord: json.body.records
              })
            }
            if (key == '03') {
              this.setState({
                stystemRecord: json.body.records,
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
        elem = 'pl_page'
        count = this.state.plRecord.length
    }
    if (key == '02') {
        elem = 'bbs_page'
        count = this.state.bbsRecord.length
    }
    if (key == '03') {
        elem = 'system_page'
        count = this.state.stystemRecord.length
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


export default MyNews;