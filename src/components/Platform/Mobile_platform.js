import React from 'react';
import { Row, div, Tabs } from 'antd';
import { Menu, Form, Icon, Input, Modal, Button, Checkbox, Cascader, Table } from 'antd';
import echarts from 'echarts';
import fetch from 'dva/fetch';
import { HOST } from '../../config/config';
import $ from 'jquery';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import { Link } from 'dva/router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../common/css/mobile.css';
/*股东信息*/
const divumns = [
    {title: '股东',dataIndex: 'shareholder',key: 'shareholder'}, 
    {title: '出资比例',dataIndex: 'fundedratio',key: 'fundedratio '}, 
    {title: '认缴出资',dataIndex: 'subscribe',key: 'subscribe'}
];
/*知识产权*/
const divumns1 = [
      {title: '申请日期', dataIndex: 'application', key: 'application'}, 
      {title: '商标', dataIndex: 'trademark',key: 'trademark '},
      {title: '商标名称',dataIndex: 'brandname',key: 'brandname'},
      {title: '注册号',dataIndex: 'regiumber',key: 'regiumber'}, 
      {title: '类别',dataIndex: 'category',key: 'category'}, 
	  {title: '状态',dataIndex: 'status',key: 'status',}
];
const data1 = [
     {key: '1',application: '1',trademark: '100%', brandname: '1000万  2034/12/31', regiumber: '100%',category: '100%',status: '100%'}, 
     {key: '2',application: '2',trademark: '100%',brandname: '1000万  2034/12/31',regiumber: '100%',category: '100%',status: '100%'},
     {key: '3',application: '3',trademark: '100%',brandname: '1000万  2034/12/31',regiumber: '100%',category: '100%',status: '100%',}
];

/*司法信息*/
const judicialdivumns = [
     {title: '裁判文书',dataIndex: 'referee',key: 'referee'},
     {title: '出资比例',dataIndex: 'fundedratio', key: 'fundedratio '},
     {title: '案件类型',dataIndex: 'casetype', key: 'casetype'},
     {title: '案件号',dataIndex: 'casenumber',key: 'casenumber'}
];
const judicialdata = [
     {key: '1',referee: '1',fundedratio: '100%',casetype: '1000万  2034/12/31',casenumber: '100%'},
     {key: '2',referee: '2',fundedratio: '100%',casetype: '1000万  2034/12/31',casenumber: '100%'}, 
     {key: '3',referee: '3',fundedratio: '100%',casetype: '1000万  2034/12/31',casenumber: '100%'}
];
class Platform extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			visible: false,
			currTabIndex: 0,
			report: {},
			baseInfo: {},
			Platformdata: {},
			filterParams: {
	    		platformId: 0
	    	},
	    	dimensionls:[],
	    	shareholder:[],
	    	ipr:[],
	    	platformFee:{},
	    	judicial:[],
	    	manager:[],
	    	numPlatform:[],
	    	questionTitle: '',
	    	questionType: ''
		}
		this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
	}
	showModal() {
	  this.setState({
	      visible: true
	    });
	}
	handleCancel(e) {
	    this.setState({
	      visible: false,
	    });
	}

	render() {
		return(
			<div>
				<Header />
				<div className="details platdetail_w1170">
					<div  className="platdetail_datalist">
						<div className="plat_transaction"><h2>公司详情</h2></div>
		                <div className="conditional">
		                        {
		                        	this.state.report ?
									<div  className="platdetail_datalist data-list">
					                   <div className="conditional">
						                    <div className="platdetail_conditionitem">
							                     <div className="platdetail_company_left">
							                        <div className="logo">
							                            {
							                            	this.state.report['companyLogo'] ?
							                        		<img src={this.state.report['companyLogo']} />
							                        		: ""
							                            }
							                        </div>
							                        <div className="text">
							                        	<span>
							                        	    {
							                        	       this.state.report['platformName'] ?
							                        		   this.state.report['platformName']
							                        		   : ""
							                        	    }
							                        	</span>
							                        </div>
							                     </div>
							                     <div className="platdetail_company_right">
							                         <div className="company_right_title">
							                         <span style={{marginRight: '10px'}}>公司简介:</span>
							                         {
							                         	this.state.report['website'] ?
							                         	this.state.report['website']
							                         	: <span style={{color: '#ccc', fontSize: '12px'}}>暂无数据</span>
							                         } 
							                         </div>
							                         <div className="company_right_time">
								                         <span className="adress" style={{display: this.state.report['city'] ? '' : this.state.report['county'] ? '' : 'none'}}><Icon type="environment-o" />
								                         <em>
								                         {
								                         	this.state.report['city'] ?
								                         	this.state.report['city'] : ""
								                         } - 
								                         {
								                         	this.state.report['county'] ?
								                         	this.state.report['county'] : ""
								                         }
								                         </em></span> 
								                         <span className="times"><Icon type="clock-circle-o" />
								                         <em>
								                         	{this.state.report['establishmentDate'] ?
								                         	 this.state.report['establishmentDate'] : ""
								                         	}
								                         </em></span>
								                         <span className="tel">
								                         {
								                         	this.state.report['servicePhone'] ? <Icon type="phone" /> : ""
								                         }
								                         <em style={{color: '#a16d24', fontSize: '16px', fontWeight: 'bold'}}>
								                         	{this.state.report['servicePhone'] ?
								                         	 this.state.report['servicePhone'] : ""
								                         	}
								                         </em></span>
								                         {
								                         	this.state.questionType == '00' ? '' : 
								                         	this.state.questionTitle ? 
								                         	<span className='company_right_question'><Icon type="exclamation-circle-o" /> {this.state.questionTitle}</span> : ''
								                         }
			                                         </div>
			                                         {
			                                         	this.state.report['backGround'] ?
			                                         	<div className="company_right_lei"><span>
			                                         	{this.state.report['backGround']}</span></div> : ""
			                                         }
							                     </div>
						                    </div>
					                   </div>
						            </div> :
				                    "暂无数据"
		                        }
		                </div>
					</div>
			         <div className="platdetail_datalist enterprise">
		                  <div className="plat_transaction"><h2>企业资料</h2></div>
		                  <div className="enterprise-details">
	                      		{
	                      			this.state.baseInfo ?
	                      			 <ul className="plat_enterprise-details-ul">
		                      			<li>
		                      				<span className="small_title">公司名称：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['companyName'] ? this.state.baseInfo['companyName'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">注册号：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['licenseNumber'] ? this.state.baseInfo['licenseNumber'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">法定代表：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['enterpriseLegal'] ? this.state.baseInfo['enterpriseLegal'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">注册资本：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['registeredCapital'] ? this.state.baseInfo['registeredCapital'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">公司类型：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['companyType'] ? this.state.baseInfo['companyType'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">登记机关：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['registrationAuthority'] ? this.state.baseInfo['registrationAuthority'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">成立日期：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['openingDate'] ? this.state.baseInfo['openingDate'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">营业期限：</span>
		                      				<span className="small_txt"></span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">企业地址：</span>
		                      				<span className="small_txt">
		                      					{this.state.baseInfo['registeredAddress'] ? this.state.baseInfo['registeredAddress'] : "-"}
		                      				</span>
		                      			</li>
		                      			<li>
		                      				<span className="small_title">行业：</span>
		                      				<span className="small_txt">金融业（J）</span>
		                      			</li>
		                      			<li className="fanwei-li">
		                      				<span className="small_title">经营范围：</span>
		                      				<span className="small_txt fanwei">
		                      				{this.state.baseInfo['businessScope'] ? this.state.baseInfo['businessScope'] : "-"}
		                      				</span>
		                      			</li>
	                      			</ul>
						            : "暂无数据"
	                      		}
					           
		                  </div>
			        </div>
				        <div className="platdetail_datalist enterprise">
				        	 <div className="plat_transaction"><h2>最新数据</h2></div>
				        	 <ul className="platdetail_detail-ul">
				        	 	<li onClick={this.setTab.bind(this,0)} style={{background: this.state.currTabIndex==0 ? '#9d6d25':'',color: this.state.currTabIndex==0 ? '#fff':''}}>公司简介</li>

				        	 	<li onClick={this.setTab.bind(this,1)} style={{display: this.state.questionType != '00' ? 'none' : '', background: this.state.currTabIndex==1 ? '#9d6d25':'',color: this.state.currTabIndex==1 ? '#fff':''}}>运营数据</li>
				        	 	<li onClick={this.setTab.bind(this,2)} style={{display: this.state.questionType != '00' ? 'none' : '', background: this.state.currTabIndex==2 ? '#9d6d25':'',color: this.state.currTabIndex==2 ? '#fff':''}}>互金评价</li>
				        	 	


				        	 	<li onClick={this.setTab.bind(this,3)} style={{background: this.state.currTabIndex==3 ? '#9d6d25':'',color: this.state.currTabIndex==3 ? '#fff':''}}>股东信息</li>
				        	 	<li onClick={this.setTab.bind(this,4)} style={{background: this.state.currTabIndex==4 ? '#9d6d25':'',color: this.state.currTabIndex==4 ? '#fff':''}}>知识产权</li>
				        	 	<li onClick={this.setTab.bind(this,5)} style={{background: this.state.currTabIndex==5 ? '#9d6d25':'',color: this.state.currTabIndex==5 ? '#fff':''}}>平台费用</li>
				        	 	<li onClick={this.setTab.bind(this,6)} style={{background: this.state.currTabIndex==6 ? '#9d6d25':'',color: this.state.currTabIndex==6 ? '#fff':''}}>司法信息</li>
				        	 	<li onClick={this.setTab.bind(this,7)} style={{background: this.state.currTabIndex==7 ? '#9d6d25':'',color: this.state.currTabIndex==7 ? '#fff':''}}>高管信息</li>
				        	 	<li onClick={this.setTab.bind(this,8)} style={{background: this.state.currTabIndex==8 ? '#9d6d25':'',color: this.state.currTabIndex==8 ? '#fff':''}}>信息披露</li>
				        	 	<li onClick={this.setTab.bind(this,9)} style={{background: this.state.currTabIndex==9 ? '#9d6d25':'',color: this.state.currTabIndex==9 ? '#fff':''}}>舆情信息</li>
				        	 </ul>

				        	 <div className="detailMain" style={{display: this.state.currTabIndex==0 ? '' : 'none'}}>
									{
							    		<div className="">
							    			<div className="header-slider-item"> 
							    			<p>
							    			{this.state.report['companyProfile'] ? this.state.report['companyProfile'] : "暂无数据"}
							    			</p>
							    			</div>
							    		</div>
							    	}	
				        	 </div>
				        	 <div className="detailMain" style={{display: this.state.currTabIndex==1 ? '' : 'none'}}>
							    	 <div className="mutual header-slider-item">
							    	 	<div className="fl">
							    	 		<div id="newChart" className="radar" style={{width: '400px', height: '380px'}}></div>
							    	 	</div>
							    	 	
			                            <div className="fr">
			                                <div className="detail-title">
			                                    <h4 className="mr20">核心数据</h4>
			                                    <em>更新时间：
			                                    {
			                                    	this.state.Platformdata ? this.state.Platformdata.dateTime : "-"
			                                    }
			                                    </em>
			                                </div>
			                                <ul className="xlist">
												<li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                            {
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.turnVolume ?
			                                              	   this.state.Platformdata.turnVolume : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">成交量(万元)</div>
			                                    </li>
												<li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
														{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.inflowFunds ?
			                                              	   this.state.Platformdata.inflowFunds : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">资金净流入(万元)</div>
			                                    </li>
												<li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.payBalance ?
			                                              	   this.state.Platformdata.payBalance : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">待还余额(万元)</div>
			                                    </li>
												<li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.averageRate ?
			                                              	   this.state.Platformdata.averageRate : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">平均参考收益率(万元)</div>
			                                    </li>
												<li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.averageTerm ?
			                                              	   this.state.Platformdata.averageTerm : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">平均借款期限(万元)</div>
			                                    </li>
			                                </ul>
			                                <ul className="xlist">
												<li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.investorCount ?
			                                              	   this.state.Platformdata.investorCount : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">投资人数(人)</div>
			                                    </li>
			                                    <li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.perCapitaInvestment ?
			                                              	   this.state.Platformdata.perCapitaInvestment : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">人均投资金额(万元)</div>
			                                    </li>
			                                    <li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.payableInvestorsCount ?
			                                              	   this.state.Platformdata.payableInvestorsCount : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">待收投资人数(人)</div>
			                                    </li>
			                                    <li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.borrowersCount ?
			                                              	   this.state.Platformdata.borrowersCount : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">借款人数(人)</div>
			                                    </li>
			                                    <li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.perLoadAmount ?
			                                              	   this.state.Platformdata.perLoadAmount : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">人均借款金额(万元)</div>
			                                    </li>
			                                </ul>
			                                <ul className="xlist">
			                                    <li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.borrowingMark ?
			                                              	   this.state.Platformdata.borrowingMark : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">借款标数(个)</div>
			                                    </li>
			                                    <li className="normal">  
			                                        <div className="rate-data">
			                                        <span className="arro-up">
			                                        	{
			                                              this.state.Platformdata ?
			                                              	this.state.Platformdata.payableBorrowerCount ?
			                                              	   this.state.Platformdata.payableBorrowerCount : "-"
			                                              	: "-"
			                                            }
			                                        </span></div>
			                                        <div className="rate-title">待还借款人数(人)</div>
			                                    </li>
			                                </ul>

			                            </div>
							    	 </div>
				        	 </div>
				        	 <div className="detailMain" style={{display: this.state.currTabIndex==2 ? '' : 'none'}}>
		        	 				<div className="">
	                                        <div className="fl">
												<div id="radar1" className="radar1" style={{width:'400px', height:'380px'}}></div>
	                                        </div>
				                            <div className="fr">
				                                <div className="detail-title">
				                                    <h4 className="mr20">互金评价</h4>
				                                    <em>更新时间：2017-06-23</em>
				                                    <Button className="explain" type="primary" onClick={this.showModal}>名词解释</Button>
				                                    <Modal  title="名词解释" visible={this.state.visible} onOk={this.handleCancel} onCancel={this.handleCancel} >
												          <p><strong>运营时间：</strong>代表平台上线时间至今仍然处于正常营业状态的时间。</p>
												          <p><strong>运营时间：</strong>代表平台上线时间至今仍然处于正常营业状态的时间。</p>
												          <p><strong>运营时间：</strong>代表平台上线时间至今仍然处于正常营业状态的时间。</p>
											        </Modal> 
											     </div>
											     <ul className="xlist">
													{
								                     	this.state.dimensionls ? this.state.dimensionls && this.state.dimensionls.length > 0 ?
								                       	this.state.dimensionls.map((item, index) => {
					                                         return <li className="normal" key={index}>
					                                         <div className="rate-data"><span className="arro-up">
					                                         	{item.score ? item.score : "-"}
					                                         </span></div>
	                                                         <div className="rate-title">
	                                                         	{item.dimensionlName ? item.dimensionlName : "-"}
	                                                         </div>
					                                       </li>}) : '暂无数据...' : <span className="no-data">暂无数据...</span>
								                    }
				                                </ul>
				                            </div>								          						               
							          </div>
				        	 </div>

				        	 <div className="detailMain" style={{display: this.state.currTabIndex==3 ? '' : 'none'}}>
	        	 					<div className="">
	                                    <div className="header-slider-item shareholder">
	                                        <table className="data-table">
	                                            <thead>
				                                    <tr>
				                                        <th>股东</th>
				                                        <th>出资比例</th>
				                                        <th>认缴出资</th>
				                                    </tr>
				                                 </thead>
				                                 <tbody>
				                                        {
				                                        	(this.state.shareholder && this.state.shareholder.length > 0) ?
															this.state.shareholder.map((item, index) => {
																return <tr key={index} >
																	<td style={{textAlign: 'center'}}>{item.shareholderName ? item.shareholderName : "-"}</td>
																	<td style={{textAlign: 'center'}}>{item.investmentRate ? item.investmentRate : "-"}</td>
																	<td style={{textAlign: 'center'}}>{item.contributedCapital ? item.contributedCapital : "-"}</td>
																</tr>
															}) : <tr><td colSpan="3">暂无数据</td></tr>		
														}
				                                 </tbody>
	                                        </table>

	                                    </div>								          
						          </div>	
				        	 </div>
				        	<div className="detailMain" style={{display: this.state.currTabIndex==4 ? '' : 'none'}}>
	    						<div className="">
					               <div className="header-slider-item platdetail_property">
					                    <table className="platdetail_data-table">
					                          <thead>
			                                     <tr>
			                                        <th>申请日期</th>
			                                        <th>商标</th>
			                                        <th>商标名称</th>
			                                        <th>注册号</th>
			                                        <th>类别</th>
			                                        <th>状态</th>
			                                     </tr>
			                                 </thead>
			                                 <tbody>
			                                        {
			                                        	(this.state.ipr && this.state.ipr.length > 0) ?
														this.state.ipr.map((item, index) => {
															return <tr key={index} >
																<td>{item.applyDate ? item.applyDate : "-"}</td>
																<td>{item.logoName ? item.logoName : "-"}</td>
																<td>{item.type ? item.type : "-"}</td>
																<td>{item.registrationCode ? item.registrationCode : "-"}</td>
																<td>{item.status ? item.status : "-"}</td>
																<td>{item.status ? item.status : "-"}</td>
															</tr>
														}) :  <tr><td colSpan="6" style={{textAlign: 'left'}}>暂无数据</td></tr>			
													}
			                                 </tbody>
					                    </table>  
					               </div>
					          </div>
				        	</div>

				        	<div className="detailMain" style={{display: this.state.currTabIndex==5 ? '' : 'none'}}>
					          <div className="">
			                        <div className="header-slider-item patformcosts">
			                             <div id="platformFee" className="da-ptfy">
			                                <dl>
			                                    <dt>
			                                        <span>账户管理费：</span>
			                                        <em>
			                                          {
			                                          	this.state.platformFee ? 
			                                          	this.state.platformFee.accountManagementFee ? this.state.platformFee['accountManagementFee'] : 
			                                          	"-"
			                                          	: "-"
			                                          }
			                                        </em>
			                                    </dt>
			                                </dl>
			                                <dl>
			                                    <dt>
			                                        <span>提现费用：</span>
			                                        <em>
			                                          {
			                                          	this.state.platformFee ? 
			                                          	this.state.platformFee.withdrawalFee ? this.state.platformFee['withdrawalFee'] : 
			                                          	"-"
			                                          	: "-"
			                                          }
			                                        </em>
			                                    </dt>
			                                </dl>
			                                <dl>
			                                    <dt>
			                                        <span>充值费用：</span>
			                                        <em>
			                                          {
			                                          	this.state.platformFee ? 
			                                          	this.state.platformFee.rechargeFee ? this.state.platformFee['rechargeFee'] : 
			                                          	"-"
			                                          	: "-"
			                                          }
			                                        </em>
			                                    </dt>
			                                </dl>
			                                <dl>
			                                    <dt>
			                                        <span>转让费用：</span>
			                                        <em>
			                                          {
			                                          	this.state.platformFee ? 
			                                          	this.state.platformFee.assignmentFee ? this.state.platformFee['assignmentFee'] : 
			                                          	"-"
			                                          	: "-"
			                                          }
			                                        </em>
			                                    </dt>
			                                </dl>
			                                <dl>
			                                    <dt>
			                                        <span>VIP费用：</span>
			                                        <em>
			                                          {
			                                          	this.state.platformFee ? 
			                                          	this.state.platformFee.vipFee ? this.state.platformFee['vipFee'] : 
			                                          	"-"
			                                          	: "-"
			                                          }
			                                        </em>
			                                    </dt>
			                                </dl>
			                            </div>
			                        </div>							          
					          </div>
				        	</div>

				        	<div className="detailMain" style={{display: this.state.currTabIndex==6 ? '' : 'none'}}>
		        					<div className="">
							               <div className="header-slider-item platdetail_judicial">
							                   <table className="data-table">
							                        <thead>
							                            <tr><th>裁判文书</th><th>出资比例</th><th>案件类型</th><th>案件号</th></tr>
							                        </thead>
					                                 <tbody>
					                                        {
					                                           (this.state.judicial && this.state.judicial.length > 0) ?
																this.state.judicial.map((item, index) => {
																	return <tr key={index} >
																		<td>{item.caseDate ? item.caseDate : "-"}</td>
																		<td className="caseDate">{item.refereeDocument ? item.refereeDocument : "-"}</td>
																		<td>{item.caseType ? item.caseType : "-"}</td>
																		<td className="caseCode">{item.caseCode ? item.caseCode : "-"}</td>
																	</tr>
																}) : <tr><td colSpan="4">暂无数据</td></tr>	
															}
					                                 </tbody>
							                    </table>
							               </div>
							          </div>
				        	</div>

				        	<div className="detailMain" style={{display: this.state.currTabIndex==7 ? '' : 'none'}}>
						          <div className="">
					                       <div className="header-slider-item platdetail_executive">
					                             <ul className="manager">
									                     {
									                     	 (this.state.manager && this.state.manager.length > 0) ?
									                     	 this.state.manager.map((item, index) => {
									                     	 	return <li key={index}><span>{item.managerName}</span><p>{item.managerPost}</p></li>
									                     	 }) : "暂无数据"
									                     }	
					                             </ul>
					                       </div>								          
							          </div>    
				        	</div>
				        	<div className="detailMain" style={{display: this.state.currTabIndex==8 ? '' : 'none'}}>
				        	</div>
				        	<div className="detailMain" style={{display: this.state.currTabIndex==9 ? '' : 'none'}}>
				        	</div>
				        </div>
	            </div>
	            <Footer />   
			</div>
		)
	}
	componentDidMount() {
		var queryObj = this.props.location.query;
		this._getReport(queryObj.platformId)
		
	}
	setTab(i) {
		this.setState({
			currTabIndex: i
		})
	}
	_MutCharts(dimensionls) {
	    if (dimensionls.length > 0) {
		    var MutArr = []
		    MutArr[0] = dimensionls[0].score ? dimensionls[0].score : 0;
		    MutArr[1] = dimensionls[1].score ? dimensionls[1].score : 0;
		    MutArr[2] = dimensionls[2].score ? dimensionls[2].score : 0;
		    MutArr[3] = dimensionls[3].score ? dimensionls[3].score : 0;
		    MutArr[4] = dimensionls[4].score ? dimensionls[4].score : 0;
		  	var echartsData = echarts.init(document.getElementById('radar1'));
		    let option = {
		        title: {
		            text: '互金评价'
		        },
		        tooltip: {},
		        legend: {
		            data: ['xxx']
		        },
		        radar: {
		            indicator: [
		               { name: '透明度', max: 100 },
		               { name: '基础指标', max: 100},
		               { name: '运营指标', max: 100},
		               { name: '风控指标', max: 100},
		               { name: '合规指标', max: 100},
		            ]
		        },
		        calculable: true,
		        series: [{
		            name: '',
		            type: 'radar',
		            areaStyle: {normal: {}},
		             data: [
		                   {
		                        value: MutArr,
		                        name: '互金评价'
		                    }
		                ]
		        }]
		    };
		    echartsData.setOption(option);
		}
  	}
	setCharts(Platformdata) { 
		    if (Platformdata) {
		    	Platformdata.turnVolume = Platformdata.turnVolume ? Platformdata.turnVolume : 0;
		    	Platformdata.borrowersCount = Platformdata.borrowersCount ? Platformdata.borrowersCount : 0;
		    	Platformdata.investorCount = Platformdata.investorCount ? Platformdata.investorCount : 0;
		    	Platformdata.inflowFunds = Platformdata.inflowFunds ? Platformdata.inflowFunds : 0;
		    	Platformdata.payBalance = Platformdata.payBalance ? Platformdata.payBalance : 0;
		    	Platformdata.averageRate = Platformdata.averageRate ? Platformdata.averageRate : 0;
			    var emptyArr = [
					Platformdata.turnVolume, 
					Platformdata.borrowersCount, 
					Platformdata.investorCount,
					Platformdata.inflowFunds,
					Platformdata.payBalance,
					Platformdata.averageRate
				];
			    var echartsObj = echarts.init(document.getElementById('newChart'));
			    let option = {
			        title: {
			            text: '运营数据'
			        },
			        tooltip: {},
			        legend: {
			            data: ['xxx']
			        },
			        radar: {
			            indicator: [
			               { name: '成交量', max: Platformdata.payBalance + 100 },
			               { name: '借款人数', max: Platformdata.borrowersCount + 10},
			               { name: '投资人数', max: Platformdata.investorCount + 10},
			               { name: '资金净流入', max: Platformdata.inflowFunds + 100},
			               { name: '待还余额', max: Platformdata.payBalance + 100},
			               { name: '预期收益率', max: Platformdata.averageRate + 1},
			            ]
			        },
			        calculable: true,
			        series: [{
			            name: '',
			            type: 'radar',
			            areaStyle: {normal: {}},
			             data: [
			                   {
			                        value: emptyArr,
			                        name: '运营数据'
			                    }
			                ]
			        }]
			    };
	    		echartsObj.setOption(option);
    	}

	  }
	_getReport(platformId) {
	    let url = HOST + 'api/client/platform/v1.0/detail';
	    let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: this.obj2params({platformId: platformId})
    	}
    	fetch(url, myFecthOption).then((res) => {
    		return res.json()
    	}).then(json => {
    		if(json.body) {
	    		this.setState({
	            	report: json.body,
	            	baseInfo: json.body.baseInfo,
	            	Platformdata: json.body.operationData,
	            	dimensionls: json.body.dimensionls,
	            	shareholder: json.body.shareholder,
	            	ipr: json.body.ipr,
	            	platformFee: json.body.platformFee,
	            	judicial: json.body.judicial,
	            	manager: json.body.manager,
	            	questionTitle: json.body.questionTitle,
	            	questionType: json.body.questionType
	        	})
    		}

    		this.setCharts(this.state.Platformdata)
    		this._MutCharts(this.state.dimensionls)
    	})
  	}
  	obj2params(obj) {
		var result = '';
		var item;
		for(var item in obj) {
		  result += '&' + item + '=' + encodeURIComponent(obj[item]);
		};
	    if(result) {
	  	  result = result.slice(1);
	    };
	    return result;
  	}
}

export default Platform




















