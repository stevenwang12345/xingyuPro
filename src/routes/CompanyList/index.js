import React from 'react';
import { Row, Col, Tabs } from 'antd';
import { Menu, Form, Icon, Button, Input, Checkbox, Cascader, Table, BackTop } from 'antd';
import { HOST } from '../../config/config';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import $ from 'jquery'
import './company_list.css'
class CompanyList extends React.Component {
	constructor(props, context){
	    super(props, context);

  }
	componentWillMount() {}
	render() {
		return (
			<div>
					<BackTop />
					<Header />
					<div className="finance w1170">
				        <div className="searchFilter">
				            <ul className="choose" style={{display: 'none'}}>
				                <li></li>
				            </ul>
				            <div className="mod-tab-ct">
				                <div className="plat-condition">
				                    <div className="condition-item condition-date clearfix">
				                        <div className="condition-label" style={{float: 'left'}}>区 域:</div>
				                        <ul id="dataTime" className="companylist_xlist condition-sel moreList" style={{float: 'left'}}>
				                            <li className="activeClass active" data-type="00">全部</li>
				                            <li className="currClass" data-type="102778">上海</li>
				                            <li data-type="102777" className="currClass">北京</li>
				                            <li data-type="100291" className="currClass">广东</li>
				                            <li data-type="102779" className="currClass">天津</li>
				                            <li data-type="100155" className="currClass">江苏</li>
				                            <li data-type="100169" className="currClass">浙江</li>
				                            <li data-type="102780" className="currClass">重庆</li>
				                            <li data-type="100056" className="currClass">河北</li>
				                            <li data-type="100068" className="currClass">山西</li>
				                            <li data-type="100445" className="currClass">陕西</li>
				                            <li data-type="100080" className="currClass">内蒙古</li>
				                            <li data-type="100095" className="currClass">辽宁</li>
				                            <li data-type="100110" className="currClass">吉林</li>
				                            <li data-type="100121" className="currClass">黑龙江</li>
				                            <li data-type="100181" className="currClass">安徽</li>
				                            <li data-type="100199" className="currClass">福建</li>
				                            <li data-type="100209" className="currClass">江西</li>
				                            <li data-type="100221" className="currClass">山东</li>
				                            <li data-type="100239" className="currClass">河南</li>
				                            <li data-type="100258" className="currClass">湖北</li>
				                            <li data-type="100276" className="currClass">湖南</li>
				                            <li data-type="100313" className="currClass">广西</li>
				                            <li data-type="100328" className="currClass">海南</li>
				                            <li data-type="100389" className="currClass">四川</li>
				                            <li data-type="100411" className="currClass">贵州</li>
				                            <li data-type="100420" className="currClass">云南</li>
				                            <li data-type="100437" className="currClass">西藏</li>
				                            <li data-type="100457" className="currClass">甘肃</li>
				                            <li data-type="100472" className="currClass">青海</li>
				                            <li data-type="100478" className="currClass">宁夏</li>
				                            <li data-type="100487" className="currClass">新疆</li>
				                            <li data-type="100506" className="currClass">香港</li>
				                            <li data-type="100525" className="currClass">澳门</li>
				                            <li data-type="100527" className="currClass">台湾</li>
				                        </ul>
				                        <span className="more">+ 展开</span>
				                    </div>
				                    <div className="condition-item condition-date clearfix">
				                        <div className="condition-label" style={{float: 'left', marginTop: '8px'}}>平台背景:</div>
				                        <ul id="backGround" className="condition-lsit companylist_xlist" style={{float: 'left'}}>
				                            <li className="activeClass active" data-type="00">全部</li>
				                            <li className="currClass" data-type="01">民营系</li>
				                            <li className="currClass" data-type="02">银行系</li>
				                            <li className="currClass" data-type="03">上市公司系</li>
				                            <li className="currClass" data-type="04">国资系</li>
				                            <li className="currClass" data-type="05">风投系</li>
				                        </ul>
				                        <div className="reset-condition"><span>重置清空</span></div>
				                    </div>
				                    <div className="condition-item condition-date clearfix" style={{borderBottom: '0px'}}>
				                        <div className="condition-label" style={{float: 'left', marginTop: '8px'}}>平台收益:</div>
				                        <ul id="averageRate" className="companylist_xlist condition-lsit" style={{float: 'left'}}>
				                            <li className="activeClass active" data-type="00">全部</li>
				                            <li className="currClass" data-type="01">小于8%</li>
				                            <li className="currClass" data-type="02">8%~16%</li>
				                            <li className="currClass" data-type="03">16%~20%</li>
				                            <li className="currClass" data-type="04">20%以上</li>
				                        </ul>
				                    </div>
				                    <div className="condition-item condition-date clearfix" style={{display: 'none'}}>
				                        <div className="condition-label" style={{float: 'left', marginTop: '8px'}}>业务类型:</div>
				                        <ul id="businessType" className="companylist_xlist condition-lsit" style={{float: 'left'}}>
				                            <li className="activeClass active" data-type="00">全部</li>
				                            <li className="currClass" data-type="01">个人信贷</li>
				                            <li className="currClass" data-type="02">企业信贷</li>
				                            <li className="currClass" data-type="03">车贷</li>
				                            <li className="currClass" data-type="04">房贷</li>
				                            <li className="currClass" data-type="05">供应链金融</li>
				                            <li className="currClass" data-type="06">融资租赁</li>
				                            <li className="currClass" data-type="07">票据</li>
				                            <li className="currClass" data-type="08">艺术品质押</li>
				                            <li className="currClass" data-type="09">农村金融</li>
				                            <li className="currClass" data-type="10">消费金融</li>
				                        </ul>
				                    </div>
				                </div>
				            </div>
				            <div className="openmore" style={{display: 'none'}}>
				                <span className="open">展开全部选项<i className="arrow"><s></s></i></span>
				            </div>
				        </div>
				        <div className="sorting">
				            <div className="sideLeft">
				                <div className="hd">
				                    <span className="tit" style={{paddingLeft: '10px', marginTop: '10px'}}>我们为您找到<strong id="platCount" style={{fontSize: '25px'}}> 0 </strong>个网贷平台</span>
				                    <div className="selected">
				                        <span style={{marginTop: '10px'}}>排序：</span>
				                        <select name="selected" id="selected">
				                            <option className="option" name="selected01" value="default">默认排序</option>
				                            <option className="option" name="selected02" value="follow">关注度</option>
				                            <option className="option" name="selected03" value="hits">浏览次数</option>
				                        </select>
				                    </div>
				                </div>
				                <ul id="item" className="terraceList"></ul>
				                <div id="veryMore" className="veryMore"><a className="next icon-moreDown icon-moreDown" href="javascript:void(0)">加载更多</a></div>
				            </div>
				            <div className="sideRight">
				                <div className="tabBox" style={{display: 'none'}}>
				                    <ul className="tabTitle">
				                        <li className="on"><a href="javascript:void(0)">最新点评</a></li>
				                    </ul>
				                    <div className="bdBox">
				                        <div className="otherCom">
				                            <dl>
				                                <dt>
				                                    <a href="javascript:void(0)">用户666</a>点评
				                                    <a href="javascript:void(0)">壹宝贷</a>
				                                    <span className="tags"><i className="icon icon3"></i> 不推荐</span>
				                                </dt>
				                                <dd className="otherComping">
				                                    <a href="javascript:void(0)">投网贷行业一年多了，现在80%在的壹宝贷，哈哈，因为我就在广州。总的来说，这个平台的产品种类比较清晰，主要是房贷、车贷和大学生消费信贷，后来有所下降，不过还在我的接受范围之内。我主要投半年以内的产品，本金和利息都按时到账，没出现过逾期的情况，这点我还是比较放心的。目前来说我对这个平台还是挺满意的。</a>
				                                </dd>
				                                <dd className="btn">
				                                    <a href="javascript:void(0)">有用(<label>670</label>)</a>
				                                    <a href="javascript:void(0)">没用(<label>670</label>)</a>
				                                </dd>
				                            </dl>
				                            <dl>
				                                <dt>
				                                    <a href="javascript:void(0)">用户666</a>点评
				                                    <a href="javascript:void(0)">壹宝贷</a>
				                                    <span className="tags"><i className="icon icon3"></i> 不推荐</span>
				                                </dt>
				                                <dd className="otherComping">
				                                    <a href="javascript:void(0)">投网贷行业一年多了，现在80%在的壹宝贷，哈哈，因为我就在广州。总的来说，这个平台的产品种类比较清晰，主要是房贷、车贷和大学生消费信贷，后来有所下降，不过还在我的接受范围之内。我主要投半年以内的产品，本金和利息都按时到账，没出现过逾期的情况，这点我还是比较放心的。目前来说我对这个平台还是挺满意的。</a>
				                                </dd>
				                                <dd className="btn">
				                                    <a href="javascript:void(0)">有用(<label>670</label>)</a>
				                                    <a href="javascript:void(0)">没用(<label>670</label>)</a>
				                                </dd>
				                            </dl>
				                            <dl>
				                                <dt>
				                                    <a href="javascript:void(0)">用户666</a>点评
				                                    <a href="javascript:void(0)">壹宝贷</a>
				                                    <span className="tags"><i className="icon icon3"></i> 不推荐</span>
				                                </dt>
				                                <dd className="otherComping">
				                                    <a href="javascript:void(0)">投网贷行业一年多了，现在80%在的壹宝贷，哈哈，因为我就在广州。总的来说，这个平台的产品种类比较清晰，主要是房贷、车贷和大学生消费信贷，后来有所下降，不过还在我的接受范围之内。我主要投半年以内的产品，本金和利息都按时到账，没出现过逾期的情况，这点我还是比较放心的。目前来说我对这个平台还是挺满意的。</a>
				                                </dd>
				                                <dd className="btn">
				                                    <a href="javascript:void(0)">有用(<label>670</label>)</a>
				                                    <a href="javascript:void(0)">没用(<label>670</label>)</a>
				                                </dd>
				                            </dl>
				                        </div>
				                    </div>
				                </div>
				                <div className="box">
				                    <div className="hd" style={{border: '0px'}}>
				                        <h2 className="tit">综合指数排行榜</h2>
				                    </div>
				                    <div className="bd">
				                        <ul id="topList" className="topList">
				                        </ul>
				                    </div>
				                </div>
				            </div>
				        </div>

					</div>
					<Footer />
			</div>
		)
	}


  componentDidMount() {
  		window._hmt && window._hmt.push(['_trackEvent', '网贷页', '点击','访问次数']);
  	 	var dataCity = "00";
	    var backGround = "00";
	    var averageTerm = "00";
	    var averageRate = "00";
	    var businessType = "00";
	    var title = '';
	    var isMore = 'false';
	    var pagendex = 1;
	    var questionType = "";
	    var platformId = 6;

        ajaxBefored(1, 10, 'default', 1);
        $("#selected").change(function() {
            SelectChange();
        });
        $(".condition-sel li").bind("click", function() {
            $(this).addClass("active").siblings().removeClass("active");
            dataCity = $(this).attr('data-type');
            ajaxBefored(1, 10, 'default', 1);
        });
	//平台背景  平台收益 业务类型
    $("ul.condition-lsit").each(function() {
        var numClass = 0;
        $(this).find("li.activeClass").click(function() {
            $(this).addClass("active")
            $(this).parent().find("li.currClass").removeClass("curr");
            numClass = 0;
            // 平台背景
            backGround = addBackGround();
            // 平台收益
            averageRate = addAverageRate();
            // 业务类型
            businessType = addBusinessType();
            ajaxBefored(1, 10, 'default', 1);

        });
        $(this).find("li.currClass").each(function() {

            $(this).click(function() {
                if ($(this).hasClass("curr")) {
                    $(this).removeClass("curr")
                    numClass--;
                    console.log(numClass)
                    if (numClass == 0) {
                        $(this).parent().find("li.activeClass").addClass("active");
                    }
                } else {
                    $(this).addClass("curr");
                    $(this).parent().find("li.activeClass").removeClass("active");
                    numClass++;
                    // console.log(numClass)
                }
                // 平台背景
                backGround = addBackGround();
                // 平台收益
                averageRate = addAverageRate();
                // 业务类型
                businessType = addBusinessType();
                // alert(businessType);
                ajaxBefored(1, 10, 'default', 1);

            });
        });
    });

    // 平台背景
    function addBackGround() {
        var backg = "";
        var aLi = document.getElementById("backGround").getElementsByTagName("li");
        var i = 0;
        for (i = 0; i < aLi.length; i++) {
            if ($(aLi[i]).attr('class') == "activeClass active") {
                backg = backg + $(aLi[i]).attr('data-type') + ',';
            }
            if ($(aLi[i]).attr('class') == "currClass curr") {
                backg = backg + $(aLi[i]).attr('data-type') + ',';
            }
        }
        return backg;
    }

    // 平台收益
    function addAverageRate() {
        var result = "";
        var aLi = document.getElementById("averageRate").getElementsByTagName("li");
        var i = 0;
        for (i = 0; i < aLi.length; i++) {
            if ($(aLi[i]).attr('class') == "activeClass active") {
                result = result + $(aLi[i]).attr('data-type') + ',';
            }
            if ($(aLi[i]).attr('class') == "currClass curr") {
                result = result + $(aLi[i]).attr('data-type') + ',';
            }
        }
        return result;
    }

    // 业务类型
    function addBusinessType() {
        var result = "";
        var aLi = document.getElementById("businessType").getElementsByTagName("li");
        var i = 0;
        for (i = 0; i < aLi.length; i++) {
            if ($(aLi[i]).attr('class') == "activeClass active") {
                result = result + $(aLi[i]).attr('data-type') + ',';
            }
            if ($(aLi[i]).attr('class') == "currClass curr") {
                result = result + $(aLi[i]).attr('data-type') + ',';
            }
        }
        return result;
    }


    //重置清空
    $(".reset-condition").click(function() {
        $("li.currClass").removeClass("curr");
        $("li.activeClass").addClass("active");
        $("li.currClass").removeClass("active");
        dataCity = "00";
        backGround = addBackGround();
        // 平台收益
        averageRate = addAverageRate();
        // 业务类型
        businessType = addBusinessType();
        ajaxBefored(1, 10, 'default', 1);
    });

    //展开收起
    $(".more").click(function() {
        $("#dataTime").toggleClass("moreList");
    });
    $(".more").click(function() {
        var a = $(this);
        if (a.text() == "+ 展开")
            a.addClass("shouqi").text("- 收起");
        else
            a.removeClass("shouqi").text("+ 展开");
    });


    //select 排序
    function SelectChange() {
        var backGround = '';
        var bizType = '';
        var city = '';
        var sort = $("#selected").val();
        $("input[name^='cheoose']").each(function() {
            if (this.checked) {
                backGround += $(this).val() + ",";
            }
        });

        $("input[name^='biz']").each(function() {
            if (this.checked) {
                bizType += $(this).val() + ",";
            }
        });

        $("input[name^='city']").each(function() {
            if (this.checked) {
                city += $(this).val() + ",";
            }
        });

       ajaxBefored(1, 10, sort, 1);

    };

    //加载更多
    $("#veryMore").on("click", function() {

        if (isMore == 'false') {
            $("#veryMore").hide();
        } else {
            $("#veryMore").show();
            pagendex = pagendex + 1;

        }
        var sortForMore = $("#selected").val();
        ajaxBefored(pagendex, 10, sortForMore, 0);
        //bellEvent();
    });

    //搜索
    var name = "";
    $(function() {
        $("#autoulsj").hide();
    });

    $("#txt").keyup(function() {
        if ($("#txt").val().length == 0) {
            $("#autoulsj").hide();
            return false;
        }
    });

    $("#txt").keyup(function() {
        var key = $("#txt").val();
        $.ajax({
            type: "post",
            url: HOST + "api/client/platform/v1.0/like/name",
            dataType: "json",
            data: {
                name: key
            },
            success: function(data) {
                var dataKey = data.body;
                $("#autoulsj").empty();
                $("#autoulsj").show();
                if (dataKey == null || dataKey.length == 0) {
                    var str = '';
                    str += '<li><a href="javascript:void(0)" style="text-align:center;">无查询结果</a></li>';
                    $("#autoulsj").append(str);
                }
                for (var i = 0; i < dataKey.length; i++) {
                    var str = '';
                    if (key == 0) {
                        $("#autoulsj").hide();
                    }
                    str += '<li><a href="company_xiang.html?platformId=' + dataKey[i].platformId + '">' + dataKey[i].platformName + '</a></li>';
                    $("#autoulsj").append(str);
                }
            }
        });
    })


    //综合指数排行榜
    $.ajax({
        type: "get",
        url: HOST + "api/client/platform/v1.0/top10",
        dataType: "json",
        data: {},
        success: function(data) {
            var dataTop = data.body;
            for (var i = 0; i < dataTop.length; i++) {
                var str = '';
                str += '<li>';
                str += '<i class="het">' + dataTop[i].rowNum + '</i>';
                str += '<a class="name" target="_blank" href="#/platDetail?platformId=' + dataTop[i].platformId + '">' + dataTop[i].platformName + '</a>';
                str += '<span class="gray">指数：<em>' + dataTop[i].totalScore + '</em></span>';
                str += '</li>';
                $("#topList").append(str);
                if (i > 2) {
                    $("#topList .het").addClass("grays")
                } else {
                    $("#topList .het").addClass("t1");
                }

            }
        }

    })

    function ajaxBefored(num_page, num_size, num_sort, type_a) {
        $.ajax({
            type: "post",
            url: HOST + "api/client/platform/v1.0/page",
            dataType: "json",
            data: {
                page: num_page,
                size: num_size,
                backGround: backGround,
                bizType: businessType,
                city: dataCity,
                sort: num_sort,
                title: '',
                averageRate: averageRate
            },
            success: function(data) {
                //console.log(1111, data)
                var dataSecond = data.body;
                // console.log(dataSecond);
                isMore = dataSecond.isMore;
                if (isMore == 'false' || isMore == '') {
                    $("#veryMore").hide();
                } else {
                    $("#veryMore").show();
                }
                pagendex = dataSecond.page;
                var dataList = dataSecond.records;
                $("#platCount").text(dataSecond.totalElements);
                if (type_a == 1) {
                    $("#item").empty();
                }
                if (dataList == null || dataList.length == 0) {
                    var str = '';
                    str += '<li class="itemNone"><p>暂无数据</p></li>';
                    $("#item").append(str);
                }
                for (var i = 0; i < dataList.length; i++) {
                    questionType = dataList[i].questionType;
                    var companyLogo = dataList[i].companyLogo ? dataList[i].companyLogo : require('../../common/img/default.gif');

                    
                    var str = '';
                    var averageRate = dataList[i].averageRate ? dataList[i].averageRate + '%' : '';
                    var backGround = dataList[i].backGround ? dataList[i].backGround : '';
                    if(backGround) {
                    	var p2pstr = "<sup class='p2p'>"+backGround+"</sup>"
                    } else {
                    	var p2pstr = ""
                    }
                    str = '<li class="item"><div class="sorting-img"><a href="#/platDetail?platformId=' + dataList[i].platformId + '"><img src="' + companyLogo + '" /></a></div>';
                    str += '<div class="title"><h2 class="nameBox"><span class="name"><a target="_blank" href="#/platDetail?platformId=' + dataList[i].platformId + '">' + dataList[i].platformName + '</a>' + p2pstr;

                    if (questionType == '01' || questionType == '02' || questionType == '03' || questionType == '04' || questionType == '05' || questionType == '06') {
                        str += '<span class="bell-ling"><i class="bell"></i><b class="b2">' + dataList[i].questionTitle + '</b><span class="icon_san"></span></span>';
                    }

                    str += '</span></h2><div class="indexNum"><span>综合指数: <i>' + dataList[i].totalScore + '</i></span></div>';
                    str += '<div class="netF"><span class="list">浏览次数：<i>' + dataList[i].platformHits + '</i></span><span class="list">关注度：<i>' + dataList[i].followCount + '</i></span></div></div>';
                    str += '<div class="con"><p><span>平均参考收益：' + averageRate + '</span><span class="dateT">所属公司：' + dataList[i].companyName + '</span></p><p><span>上线时间：' + dataList[i].establishmentDate + '</span><span class="ziben">注册资本：' + dataList[i].registeredCapital + '万元</span><span>注册地：' + dataList[i].city + '-' + dataList[i].county + '</span></p><p class="more focus p-o-btn"><a href="javascript:void(0)><i></i></a></p></div></li>';
                    $("#item").append(str);
                }
            }

        })

    }


  }
 
}
export default CompanyList