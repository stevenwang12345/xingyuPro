import React from 'react';
import { Link } from 'dva/router';
import { Form, Input, Tooltip, Icon, Modal, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';
const FormItem = Form.Item;
import ThirdLogin from '../../components/ThirdLogin/ThirdLogin'
import $ from 'jquery';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '../../common/css/mobile.css';
class Reg extends React.Component {
  constructor(props, context){
	    super(props, context);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	    this.state = {
	    	check: true,
	    	djsStatus: false,
	    	current: '',
	    	currentCodePath: '',
	    	currentSecond: '',
	    	timer: null
	    }
  }

  render() {
  	const { getFieldDecorator } = this.props.form;
    return (
    		<div>
    			<Header />
	    		<h2 style={{padding: '20px 20px 10px 20px', color: '#666', borderBottom: '1px solid #eee'}}>用户注册</h2>
				<div className="reg" style={{paddingBottom: '30px'}}>
						<Form onSubmit={this.handleQuickSubmit.bind(this)}>
						        <FormItem>
						          {getFieldDecorator('phone', {
						            rules: [{ required: true, message: '请输入手机号' }],
						          })(
						            <Input className="reg-user-input" placeholder="手机号" />
						          )}
						        </FormItem>
						        <FormItem>
						            <div className="testcode">
							          {getFieldDecorator('q-testCode', {
							            rules: [{ required: true, message: '请输入验证码' }],
							          })(
							            <Input type="text" placeholder="验证码" />
							          )}
						          	</div>
						          	<div className="testcode01">
						          		<img src={this.state.currentCodePath} onClick={this.changeCode.bind(this)} style={{height: '32px',width: '80px',marginTop: '0px'}}/>
						          	</div>
						        </FormItem>
						        <FormItem>
						          	<div className="smscode">
							          {getFieldDecorator('smsCode', {
							            rules: [{ required: true, message: '请输入验证码' }],
							          })(
							            <Input type="text" placeholder="请输入验证码" />
							          )}
							         </div>
							         <div className="smscode01">
							         	{
							         		!this.state.djsStatus ? 
							         		<span className="layui-btn layui-btn-primary layui-btn-small" onClick={this.getMessage.bind(this)}>获取验证码</span> 
							         		: <span className="layui-btn layui-btn-primary layui-btn-small"><b>{this.state.currentSecond}</b>秒后重试</span> 
							         	}
						          	 </div>
						        </FormItem>
						        <FormItem>
						          {getFieldDecorator('password', {
						            rules: [{ required: true, message: '请输入密码' },{
						              validator: this.checkConfirm,
						            }],
						          })(
						            <Input placeholder="请输入密码" type="password" />
						          )}
						        </FormItem>
						        <FormItem>
						          {getFieldDecorator('rpassword', {
						            rules: [{ required: true, message: '请再次输入密码' },{
						              validator: this.checkPassword,
						            }],
						          })(
						            <Input placeholder="请再次输入密码" type="password" />
						          )}
						        </FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                                <div style={{clear: 'both'}}></div>
                                <div className="agree">点击注册即同意金评社 <a href="javascript:void(0)" style={{color: '#9c6c24'}} onClick={this.showAgreement.bind(this)}>《注册协议》</a></div>
					    </Form>
			    </div>

				    <div style={{display: 'none'}} id="agreebox">
				    	<h2>1. 服务确认和接纳</h2>
				    	<p>1.1上海互联网金融评价中心有限公司（以下简称“金评社”）在此特别提醒：用户（以下称“您”）欲访问和使用金评社，必须事先认真阅读本服务条款中各条款，包括免除或者限制金评社责任的免责条款及对您权利的限制。请您审阅并接受或不接受本服务条款（未成年人审阅时应得到法定监护人的陪同）。如您不同意本服务条款及/或随时对其的修改，您应不使用或主动取消“金评社”提供的服务。您的使用行为将被视为您对本服务条款完全接受，包括接受金评社对服务条款随时所做的任何修改。</p>
						<p>1.2 这些条款可由金评社随时更新，且毋须另行通知。金评社服务条款（以下简称“服务条款”)一旦发生变更, 本公司将在“金评社”网上公布修改内容。修改后的服务一旦在网页上公布即有效代替原来的服务条款。您可随时登录网页查阅最新版服务条款。</p>
						<h2>2.服务内容</h2>
						<p>2.1 “金评社”的具体内容由金评社根据实际情况提供，包括各种信息工具、个人化内容等。金评社保留随时变更、中断或终止“金评社”的部分或全部服务的权利。</p>
						<p>2.2 用户理解，金评社仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由用户自行负担。</p>
						<h2>3. 使用规则</h2>
						<p>3.1 您在申请使用“金评社”的服务时，必须向金评社提供准确的个人资料，如个人资料有任何变动，必须及时更新。</p>
						<p>3.2 您在注册时自行输入用户名和密码，该用户帐号和密码由用户负责保管；依本服务条款所取得的服务权利不可转让；您应当对该用户帐号进行的所有活动和事件负法律责任。</p>
						<p>3.3 请您自行记住注册时间及注册邮箱，以便将来忘记密码或密码被盗时查询。</p>
						<p>3.4 您在使用金评社的过程中，必须遵循以下原则：<br/>
						遵守中国有关的法律和法规；<br/>
						不得为任何非法目的而使用“金评社”；<br/>
						遵守所有与“金评社”有关的协议、规定和程序；<br/>
						不得利用“金评社”进行任何可能对互联网的正常运转造成不利影响的行为；<br/>
						不得利用“金评社”对未成年人进行任何方式诱导、危害；<br/>
						不得利用“金评社”进行任何不利于金评社的行为；<br/>
						如发现任何非法使用您的帐号或帐号出现安全漏洞的情况，应立即通告金评社。</p>
						<p>3.5 如您在使用“金评社”时违反任何上述规定，金评社或及其授权的人有权要求您改正或直接采取一切必要的措施（包括但不限于更改或删除您发布的内容等、暂停或终止您使用“金评社”的权利）以减轻您不当行为造成的影响。</p>
						<h2>4. 内容所有权</h2>
						<p>4.1 “金评社”提供的服务内容可能包括：文字、声音、图片、图表等。所有这些内容受版权、商标和其它财产所有权法律的保护。未经相关权利人同意，上述资料均不得在任何媒体直接或间接发布、播放、出于播放或发布目的而改写或再发行，或者被用于其他任何商业目的。所有这些资料或资料的任何部分仅可作为私人和非商业用途而保存在某台计算机内。“金评社”不就由上述资料产生或在传送或递交全部或部分上述资料过程中产生的延误、不准确、错误和遗漏或从中产生或由此产生的任何损害赔偿，以任何形式，向用户或任何第三方负责。</p>
				    	<p>4.2 您只有在获得金评社或其他相关权利人的授权之后才能使用这些内容，“金评社”为提供网络服务而使用的任何软件（包括但不限于软件中所含的任何图像、照片、动画、录像、录音、音乐、文字和附加程序、随附的帮助材料）的一切权利均属于该软件的著作权人，未经该软件的著作权人许可，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。</p>
				    	<h2>5. 隐私保护</h2>
				    	<p>5.1 关于您的“个人资料”以及其他特定资料均受到《金评社隐私权保护声明》之规范。</p>
				    	<p>5.2、金评社采用行业标准惯例以保护用户的资料。您提供给金评社的信息，金评社不会恶意出售或免费共享给任何第三方，以下情况除外：</p>
				    	<p>(1)事先获得用户的明确授权；<br/>
						(2)根据有关的法律法规要求；<br/>
						(3)按照相关政府主管部门的要求；<br/>
						(4)为维护社会公众的利益。
						</p>
						<p>5.3、金评社可以按照您在金评社上的行为自动追踪关于您的某些资料。在不违法透露您的隐私资料的前提下，金评社有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
				    	<h2>6. 免责声明</h2>
				    	
				    	<p>6.1 您同意使用“金评社”所存在的风险将完全由您承担；因您使用“金评社”而产生的一切后果也由您自己承担，金评社对您不承担任何责任。</p>
						<p>6.2 金评社不承诺“金评社”一定能满足您的要求，也不承诺“金评社”不会中断，对“金评社”的及时性、安全性、准确性也都不作承诺。</p>
						<p>6.3 对于因不可抗力或金评社不能控制的原因造成的“金评社”中断或其它缺陷，金评社不承担任何责任，但将尽力减少因此而给您造成的损失和影响。</p>
						<p>6.4“金评社”不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由“金评社”实际控制的任何网页上的内容，“金评社”不承担任何责任。</p>
						<p>6.5“金评社”上所发布的所有评论、分析报告及预测仅作为参考之用，不对您实际操作产生的盈亏承担任何责任。</p>
						<h2>7. 服务变更、中断或终止</h2>
						<p>7.1 如因系统维护或升级的需要而需暂停“金评社”服务，金评社将尽可能事先进行通告。</p>
						<p>7.2 如发生下列任何一种情形，金评社有权随时中断或终止向您提供本协议项下的“金评社”服务而无需通知您：您提供的个人资料不真实； 您违反本协议中规定的使用规则。</p>
						<p>7.3 除前款所述情形外，金评社同时保留在不事先通知您的情况下随时中断或终止部分或全部“金评社”服务的权利，对于所有服务的中断或终止而造成的任何损失，金评社无需对您或任何第三方承担任何责任。</p>
						<h2>8. 违约赔偿</h2>
						<p>8.1 您同意保障和维护金评社及其他用户的利益，如因您违反有关法律、法规或本协议项下的任何条款而给金评社或任何其他第三人造成损失，您同意承担由此造成的损害赔偿责任。</p>
				    	<h2>9. 协议修改</h2>
				    	<p>9.1金评社将有权随时修改本协议的有关条款，一旦本协议的内容发生变动，金评社将会通过适当方式向您提示修改内容。</p>
				    	<h2>10. 协议终止</h2>
				    	<p>10.1 如果不同意金评社对本协议相关条款所做的修改，您有权停止使用“金评社”。如果您继续使用“金评社”，则视为您接受金评社对相应协议条款的修改。</p>
				    	<h2>11. 会员帐号、密码及安全</h2>
				    	<p>11.1 维持密码及帐号的机密安全，是您的责任。利用该密码及帐号所进行的一切行动，您应负完全的责任。所衍生的任何损失或损害，金评社无法也不承担任何负责。您同意以下事项∶ 您的密码或帐号遭到未获授权的使用，或者其他任何安全问题发生时，您须立即通知金评社，要求金评社暂停相关服务，否则由此产生的一切责任由您本人承担。 每次连线完毕，请均结束您的帐号使用。若您未能依前述指示行事，则有可能得不到金评社在安全方面的保护，如因此受到损失则由用户自行承担。 用户不应将其帐号、密码转让或出借予他人使用。如用户发现其帐号遭他人非法使用，应立即通知金评社。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，金评社不承担任何责任。</p>
				    	<h2>12. 论坛管理</h2>
				    	<p>12.1金评社的交流论坛是一个互动式的社区，其宗旨是建立一个帮助互联网金融投资者互相学习，交流成长，识别并规避网贷投资风险的平台，大家可以交流理财经验，网贷投资心得，可以曝光平台的相关信息。</p>
						<p>12.2金评社给网友提供各种网络服务和制订公共规则，管理公共区域的秩序；对于网友在论坛发布的一切内容，网友授予金评社永久的，免费的，完整的许可使用权利(并且有权对该权利进行再授权)，使金评社有权在不涉及和泄露用户隐私情况下使用您的数据参与制作其派生产品，例如但不限于市场调研，消费分析等，以已知或日后开发的任何形式，媒体或技术，纳入其他作品里。</p>
						<h2>13. 论坛发帖管理</h2>
						<p>13.1金评社论坛中设有多个不同类型版块，建议网友根据所发主题内容选择相应的讨论区发表。如果发表的主题与所在论坛板块主题不符，金评社论坛管理员和版主有权对其进行转移或者直接删除，同时不必通知发帖人。如平台人员连续三次违反规定在指定区域以外发布平台信息,
						金评社的管理人员和版主将禁止其ID。</p>
				    	<p>13.2 为了保证网站的生存和发展，请勿谈论政治时事。任何发表的言论或图片都不得出现违背社会公德，损害论坛和网站利益的内容。对于违反规则的帖子，金评社有权随时进行删除，以下内容为严禁内容，一经发现本论坛有权进行封闭ID的处理。</p>
				    	<p>1）包含、传播淫秽内容，提供淫秽图片，淫秽影片下载；<br/>
						2）利用视频聊天组织淫秽表演，通过语音聊天、聊天室进行淫秽活动；<br/>
						3）提供淫秽网站地址链接服务；<br/>
						4）一些格调低下，对青少年健康成长有负面作用的网站产品宣传等；<br/>
						5）利用网络做传销、行骗等非法内容或链接非法网站；<br/>
						6）出售违禁物品（涉枪、涉黄、爆炸品、迷幻药、发票等）<br/>
						7）违反国家和平统一政策；<br/>
						8）其它含有国家法律、法规禁止的内容
						</p>
						<p>13.3 提倡网上道德，任何发表的言论或图片不能带有明显攻击、污蔑性文字，不能对任何人进行人身攻击。要尊重他人的作品，以善意的态度进行评论和讨论，同时应把讨论局限在作品本身。对于违反规则的贴子，金评社有权随时进行删除，对于屡次违反的，本论坛有权禁止该ID。</p>
						<p>13.4 金评社鼓励和尊重原创内容，并且给予相应的积分奖励。如果因为讨论需要转载，建议注明出处，此类贴子如果出现版权纠纷，金评社不承担任何责任。对于违反转载要求的贴子，金评社有权随时进行删除。</p>
						<p>13.5上传作品的著作权、肖像权由发贴者自行负责。由此而引起的法律纠纷完全由发贴人承担，金评社不承担任何责任。</p>
						<p>13.6论坛中发布的文章只代表发表人个人观点，不代表金评社的立场。发表人承担一切因个人的行为而直接或间接导致的民事或刑事法律责任。</p>
						<p>13.7发帖请根据帖子实际情况发到最符合的栏目，不得一帖多发，否则金评社管理员和版主有权随时进行关闭或删除，同时不必通知发帖人。</p>
						<p>13.8 在网站任何区域均绝对禁止发布任何与政治相关(丑化党和国家社会形象等)的言论和图片；绝对禁止张贴、散布、传播任何涉及反动和淫秽内容的文章和图片。请大家发帖以互联网金融投资为主题,金评社有权随时对不合乎规定的帖子进行删除，并禁止发帖人ID。</p>
						<p>13.9 对于版主的管理操作有疑问请直接联系管理员。</p>
						<h2>14. 法律管辖</h2>
						<p>14.1 本协议的订立、执行和解释及争议的解决均应适用中国法律。</p>
						<p>14.2 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向金评社所在地的人民法院提起诉讼。</p>
						<h2>15. 商标资讯</h2>
						<p>15.1 “金评社”商标及服务商标，以及其他“金评社”标志及产品、服务名称，均为金评社的商标。未经金评社事先的同意，您同意不将金评社商标以任何方式展示或使用。</p>
				    	<h2>16. 通知和送达</h2>
				    	<p>16.1 本协议项下所有的通知均可通过重要页面公告、电子邮件或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。</p>
						<p>16.2用户对于金评社的通知应当通过“金评社”对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</p>
						<h2>17. 其他规定</h2>
						<p>17.1 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</p>
						<p>17.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
						<p>17.3 本协议中的标题仅为方便而设，在解释本协议时应被忽略。</p>
						<h2>18. 修改权和解释权</h2>
						<p style={{paddingBottom: '50px'}}>18.1 本条款的修改权和解释权归金评社所有。</p>
				    </div>
		        <Footer />
			</div>
    )
  }
  	onChangeAgree(e) {
  		var checked = `${e.target.checked}`;
  		this.setState({
  			check: !this.state.check
  		})
  	}
  	showAgreement() {
  		layer.open({
		  type: 1,
		  title: '用户协议',
		  area: ['95%', '400px'],
		  scrollbar: false,
		  content: $('#agreebox'),
		  cancel: function(index, layero){
		  	$('#agreebox').hide()
		  }
		});
  	}
	//更改图片验证码
	changeCode() {
		var timestamp = Date.parse(new Date()); 
		var url = HOST + 'api/client/member/v1.0/code/'+ timestamp;
		this.setState({
			currentCodePath: url
		})
	}
	//获取短信验证码
	getMessage() {
		var url = HOST + 'api/client/member/v1.0/quick/send/sms'
		this.props.form.validateFields(['phone', 'q-testCode'],(err, values) => {
	      if (!err) {
	       		var phone = this.props.form.getFieldValue('phone')
				var verificationCode = this.props.form.getFieldValue('q-testCode')
				let params = 'phone=' + phone + '&verificationCode=' + verificationCode;
				// console.log(phone, verificationCode)
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
					if (json.footer.status == "600") {
			  			Modal.error({
						    title: '',
						    content: json.footer.message,
						  });
					} else {
						var remainTime = json.body.remainTime;
						this.setState({
							djsStatus: true,
							currentSecond: remainTime,
							timer: setInterval(() => {
									this.state.currentSecond = this.state.currentSecond - 1;
									this.setState({
										currentSecond: this.state.currentSecond
									})
									if (this.state.currentSecond == 0) {
										clearInterval(this.state.timer);
										this.setState({
											timer: null,
											djsStatus: false,
											currentSecond: remainTime
										})
									}
								},1000)
						})
					}
				})
	      }
	    })
	}
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleQuickSubmit(e) {
  	e.preventDefault();
  	this.props.form.validateFields((err, values) => {
  		if (!err) {
  			// console.log(values)
  			var phone = values.phone;
  			var smsCode = values.smsCode;
  			var password = values.password;
  			// console.log(phone, smsCode, password)
  			var url = HOST + 'api/client/member/v1.0/register'
  			let params = 'phone=' + phone + '&smsCode=' + smsCode + '&password=' + password;
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
		  		// console.log(json)
		  		if (json.footer.status == "600") {
		  			Modal.error({
					    title: '',
					    content: json.footer.message,
					  });
		  		}else {
		  			window.location.href='#/login'
		  		}
		  	})
  			
  		}
  	})
  }
  componentDidMount() {
		var timestamp = Date.parse(new Date()); 
		var url = HOST + 'api/client/member/v1.0/code/'+ timestamp;
		this.setState({
			currentCodePath: url
		})
	}
  componentWillUnmount() {
	clearInterval(this.state.timer);
  }
}


export default Form.create()(Reg);