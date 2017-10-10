import React from 'react';
import { connect } from 'dva';
import { HOST } from '../../config/config';
import fetch from 'dva/fetch';
import { Link, hashHistory } from 'dva/router';
import { Menu, Button, Icon, Avatar  } from 'antd';
import BScroll from 'better-scroll';
import './Header.css';
// import $ from 'jquery';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: null
		}
	}
	render() {

		const uinfo = this.props.common.userInfo
		return (
			<div id="headerbox"></div>
		)
	}
	componentDidMount() {
	    var reg=new RegExp(/(<img src=")/g);
	    var This = this;
		$.ajax({
            type: "get",
            url: "http://10.10.20.201/public_resources/public_header/index.shtml",
            data: {},
            dataType: "html",
            async: false,
            cache: false,
            success: function(dataJson){
			   //var newstr=dataJson.replace(reg,"$1/resource"); 
               $('#headerbox').html(dataJson);
               // $('#more_nav').hide()
               This.customJs()
            },
            error: function(jqXHR, textStatus, errorThrown) {
                
            }
        });
	}
	isLogined() {
		var memberId = this.getCookie('memberId');
		var uuid = this.getCookie('uuid');
		if (memberId && uuid) {
			$('.loginSuccess').show()
			$('.register, .login').hide()
			this.getMemberInfo(memberId, uuid)
		} else {
			$('.loginSuccess').hide()
			$('.register, .login').show()
		}
	}
	setNavSelected() {
		var url = window.location.href;
		var faceIndex = url.indexOf('face');
		var evaluationIndex = url.indexOf('evaluation');
		var dataIndex = url.indexOf('data');
		var bbsIndex = url.indexOf('bbs');
		var publicSubjectIndex = url.indexOf('publicSubject')
		if (faceIndex > 0) {
			$('.nav_column li').eq(5).addClass('cur')
		}
		if (evaluationIndex > 0) {
			$('.nav_column li').eq(7).addClass('cur')
		}
		if (dataIndex > 0) {
			$('.nav_column li').eq(8).addClass('cur')
		}
		if (bbsIndex > 0 || publicSubjectIndex > 0) {
			$('.nav_column li').eq(9).addClass('cur')
		}
	}
	setMoreNavScroll() {
		$('#more_nav').css({height: $(window).height()})
		$('#more_nav').wrapInner("<div class='inner'></div>")
		if (!this.menuScroll) {
			this.menuScroll = new BScroll(document.getElementById('more_nav'), {
	          bounce: true,
	          click: true
	        });
		} else {
			this.menuScroll.refresh()
		}
	}
	customJs() {
		this.setNavSelected();
		this.isLogined();
		this.recommendScroll()
		this.setTopLoginReg()
		//this.app_wxDownload();
		var This = this
		//$('.topcox ul li').eq(0).hide()

		$('.addColumn').click(function(){
			$('#more_nav').show()
			This.setMoreNavScroll()
		})
		$('#js_close').click(function(){
			$('#more_nav').hide()
		})
		$('.app_ser.visible-xs').addClass('top_searchbox')
		$('.searOpen').click(function() {
			if ($('.app_ser').css('display') == 'block') {
				$('.app_ser').hide()
			} else {
				$('.app_ser').show()
			}			
		})
		$('.js_searchBtn').click(function(){
			if($('.js_placeholder').val() == '') {
				alert('搜索关键字不能为空')
				return;
			}
			//var testurl = "http://www.1-1.com/finance/#/login?_k=v7pyxw"
			var url = window.location.href;
			var index = url.indexOf('1-1.com');
			if (index>=1) {
				window.location.href="http://www.1-1.com/search/?searchword=" + $('.js_placeholder').val()
			} else {
				window.location.href="http://www.finassess.com/search/?searchword=" + $('.js_placeholder').val()
			}
		})
	}

	app_wxDownload() {
		var gzh = "<div class='gzh-box'><span class='uparrow'></span> </div>"
		var app = "<div class='app-box'><span class='uparrow'></span> <span>ios</span><span <span>android</span></div>"
		$('.header_mainbody .detail').prepend(gzh)
		$('.header_mainbody .detail').prepend(app)
		$('.topcox ul li').eq(1).find('a').click(() => {
			return false;
		})
		$('.topcox ul li').eq(1).find('a').mouseenter(() => {
			$('.app-box').show()
		}).mouseleave(() => {
			$('.app-box').hide()
		})
		$('.topcox ul li').eq(2).find('a').click(() => {
			return false;
		})
		$('.topcox ul li').eq(2).find('a').mouseenter(() => {
			$('.gzh-box').show()
		}).mouseleave(() => {
			$('.gzh-box').hide()
		})
	}
	setTopLoginReg() {
		var hashStr = window.location.hash;
		$('.topcox .login').html("<a href='#/login/"+encodeURIComponent(hashStr)+"'>登录</a>")
		$('.topcox .register').html('<a href="#/reg">注册</a>')
	}
	recommendScroll() {
		var lis = $('#div3 ul').html()
		$('#div3 ul').append(lis)
		let w = 0;
		$('#div3 ul li').each(function(item, index) {
			w+=parseInt($(this).width())+40
		})
		$('#div3 ul').css({width: w})
		var halfw = parseInt(w/2);
		var num = 0;
		function goLeft() {
	        if (num == -halfw) {
	            num = 0;
	        }
			num -= 1;
	        $('#div3 ul').css({
	            left: num
	        })
		}
		this.state.timer = setInterval(goLeft, 20)
		$("#div3").hover(() => {
	        clearInterval(this.state.timer);
	    },
	   	() => {
	        this.state.timer = setInterval(goLeft, 20);
	    })
	}
  //获取用户信息
	getMemberInfo(memberId, uuid) {
		var url = HOST + '/api/client/member/v1.0/info.security';
    	var memberId = this.getCookie('memberId');
    	var uuid = this.getCookie('uuid');
	    let myFecthOption = {
	        method: 'post',
	        credentials: 'include',
	        headers: {
	          'Accept': 'application/json, text/plain, */*',
	          'Content-Type': 'application/x-www-form-urlencoded'
	        },
	        body: "memberId=" + memberId + "&uuid=" + uuid
	    }
	    fetch(url, myFecthOption).then(res => {
	    	return res.json()
	    }).then(json => {
	    	$('.loginSuccess a').eq(0).find('img').attr('src', json.body.profile)
	    	$('.loginSuccess a').eq(1).html("<a href='#/memberCenter/mynews' target='_blank'>"+json.body.nickName+"</a>" + "<span class='logOut'>退出登录</span>")
	    	$('.loginSuccess a').eq(0).click(() => {
	    		window.location.href="#/memberCenter/mynews"
	    	// 	hashHistory.push({
		  		// 	pathname: 'memberCenter/mynews',
		  		// 	state: {memberId: memberId, profile: json.body.profile, memberName: json.body.nickName}
		  		// })
	    	})
	    	$('.logOut').click(() => {
	    		this.logOut()
	    	})
	    })
	}
	getCookie(name) {
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}
	delCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=this.getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
	logOut() {
		var url = HOST + 'api/client/member/v1.0/loginout.security'
	   	let params = 'memberId=' + this.getCookie('memberId') + '&uuid=' + this.getCookie('uuid');
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
	  		if (json.footer.status == '200') {
	  			// this.delCookie('memberId');
	  			// this.delCookie('uuid');
	  			$.cookie('memberId', '', { expires: -1, path: '/' }); // 删除 cookie
	    		$.cookie('uuid', '', { expires: -1, path: '/' }); // 删除 cookie


			  	this.props.dispatch({
		  	  		type:'common/logout',
		      		payload:{userInfo: {}}
		  	  	})
		  	  	hashHistory.push('login')
	  		}
	  	})

		
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}
	

}

function mapStateToProps({ common }) {
  return {common};
}
export default connect(mapStateToProps)(Header);

// export default Header;