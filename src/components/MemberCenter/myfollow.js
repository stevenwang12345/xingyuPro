import React from 'react';
import { Icon, Tabs, Table, Modal } from 'antd';
const TabPane = Tabs.TabPane;
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';

class MyFollow extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      gzRecords: [],
      fansRecords: [],
      platRecords: []
    }
  }
	render() {
		return (
			<div className="member-containter">
				<Tabs defaultActiveKey="02" onChange={this.tabChange.bind(this)}>
				    <TabPane tab="我的关注" key="02">
              <ul className="follow-ul">
						  {
                this.state.gzRecords.length > 0 ?
                this.state.gzRecords.map((item ,index) => {
                  return <li key={index}>
                    <img src={item.profileName} className="profileName"/>
                    <div className="follow-p">
                      <h2>{item.memberName}</h2>
                      <span>投友: <strong>{item.followCount}</strong></span> | <span>粉丝: <strong>{item.fans}</strong> </span>
                    </div>
                    <span className="cancel-attention" onClick={this.cancelAttention.bind(this, '01', index, item.memberId)}>
                     {item.isAttention ? '取消关注' : '关注'}
                    </span>
                  </li>
                }) : <li className="no-data">暂无数据</li>
              }
              </ul>
				    </TabPane>
				    <TabPane tab="我的粉丝" key="03">
              <ul className="follow-ul">
              {
                this.state.fansRecords.length > 0 ?
                this.state.fansRecords.map((item ,index) => {
                  return <li key={index}>
                    <img src={item.profileName} className="profileName"/>
                     <div className="follow-p">
                      <h2>{item.memberName}</h2>
                      <span>投友: <strong>{item.followCount}</strong></span> | <span>粉丝: <strong>{item.fans}</strong> </span>
                    </div>
                    <span className="cancel-attention" onClick={this.cancelAttention.bind(this, '02', index, item.memberId)}>
                    {item.isAttention ? '取消关注' : '关注'}
                    </span>
                  </li>
                }) : <li className="no-data">暂无数据</li>
              }
              </ul>
				    </TabPane>
            <TabPane tab="关注平台" key="01">
              <ul className="follow-ul">
              {
                this.state.platRecords.length > 0 ?
                this.state.platRecords.map((item ,index) => {
                  return <li key={index}>
                    <img src={item.companyLogo} className="companyLogo"/>
                     <div className="follow-p">
                      <h2>{item.platformName}</h2>
                      <span>推荐度: <strong>{item.platformHits}</strong></span> | <span>关注数: <strong>{item.followCount}</strong> </span>
                    </div>
                    <span className="cancel-attention" onClick={this.cancelAttention.bind(this, '03', index, item.platformId)}>
                    {item.isAttention ? '取消关注' : '关注'}
                    </span>
                  </li>
                }) : <li className="no-data">暂无数据</li>
              }
              </ul>
            </TabPane>
				 </Tabs>
			</div>
		)
	}
  cancelAttention(type, index, id) {
    var url = ""
    var newtype = ''
    var memberId = this.getCookie('memberId');
    var uuid = this.getCookie('uuid');
    var myFecthOption = {}
    if (type == '03') {
      url = HOST + 'api/client/member/v1.0/collection.security'
      newtype = '01'
      myFecthOption = {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + newtype + "&foreignKey=" + id
      }
    } else {
      url = HOST + 'api/client/center/v1.0/member/collection.security'
      newtype = type
      myFecthOption = {
          method: 'post',
          credentials: 'include',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: "memberId=" + memberId + "&uuid=" + uuid + "&type=" + newtype + "&fansId=" + id
      }
    }
    
    fetch(url, myFecthOption).then(res => {
      return res.json()
    }).then(json => {
      if (json.footer.status == '200') {
        let dataSource = []
        if (type == '01') {
            dataSource = [...this.state.gzRecords];
            dataSource[index]['isAttention'] = !dataSource[index]['isAttention']
            this.setState({ dataSource });
          // console.log(this.state.gzRecords)
        }
        if (type == '02') {
            dataSource = [...this.state.fansRecords];
            dataSource[index]['isAttention'] = !dataSource[index]['isAttention']
            this.setState({ dataSource });
           // console.log(this.state.fansRecords)
        }
        if (type == '03') {
            dataSource = [...this.state.platRecords];
            dataSource[index]['isAttention'] = !dataSource[index]['isAttention']
            this.setState({ dataSource });
           // console.log(this.state.platRecords)
        }
        
      } else {
          Modal.error({
            title: '',
            content: json.footer.message,
          });
      }
    })
  }
  tabChange(key) {
    this.doAjax(key)
  }
  componentDidMount() {
    this._isMounted = true
    this.doAjax('02')
  }
  getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
      else
      return null;
  }

  doAjax(key='') {
    var url = HOST + 'api/client/center/v1.0/follow.security';
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
                gzRecords: this.addKey(json.body.records),
              })
              console.log(444, this.state.gzRecords)
            }
            if (key == '03') {
              this.setState({
                fansRecords: this.addKey(json.body.records),
              })
              console.log(this.state.fansRecords)
            }
            if (key == '01') {
              this.setState({
                platRecords: this.addKey(json.body.records),
              })
              // console.log(this.state.platRecords)
            }
          } else {
              Modal.error({
                title: '',
                content: json.footer.message,
              });
          }
        }
    })
  }
  addKey(records) {
    records.map((records, index) => {
      records['isAttention'] = true
    })
    return records
  }
  componentWillUnmount() {
    this._isMounted = false
  }

}


export default MyFollow;