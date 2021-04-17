function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //除函数名外都可编辑  函数名函数名不是变量名 我丢
    //作者：Jaker
    //更新时间：2021-3-12 16:58:40
    //联系方式(QQ)：2205909051
    //获取子iframe并在内容里找到类名为gridtable的第一个元素 
	// 适配数维不容易啊~~~！！

/*
本次测试方案 
	给loginExt.action写入head  成功登陆
	给courseTableForStd.action或courseTableForStd!courseTable.action写入head 测试中
*/

// 登录页面请求头   使系统正常登陆
let login_head = `<head>
  <title>商丘学院教学管理系统</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <meta http-equiv="content-style-type" content="text/css">
  <meta http-equiv="content-script-type" content="text/javascript">
  <script type="text/javascript">
      window.$BG_LANG='zh';
  </script>
  <script type="text/javascript" src="/eams/static/scripts/jquery/jquery,/scripts/beangle/beangle.js"></script>
  <link id="beangle_theme_link" rel="stylesheet" href="/eams/static/themes/default/beangle-ui.css" type="text/css">

    <link href="/eams/static/deps/bootstrap-3.3.5-dist/css/bootstrap.css" rel="stylesheet" type="text/css"> 
    <link href="/eams/static/deps/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"> 
    <link href="/eams/static/deps/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"> 
    <link href="/eams/static/images/education.css" rel="stylesheet" type="text/css">
    
	<script type="text/javascript" src="/eams/static/scripts/css_browser_selector.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/sha1.js"></script>

</head>`;
// 课表请求头   使课表页面正常显示
let course_head = `<head>
  <title></title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="pragma" content="no-cache">
  <meta http-equiv="cache-control" content="no-cache">
  <meta http-equiv="expires" content="0">
  <meta http-equiv="content-style-type" content="text/css">
  <meta http-equiv="content-script-type" content="text/javascript">
  <script type="text/javascript">
      window.$BG_LANG='zh';
  </script>
  <script type="text/javascript" src="/eams/static/scripts/jquery/jquery,jquery.ui.core.js?bg=3.4.3"></script>
  <script type="text/javascript" src="/eams/static/scripts/plugins/jquery-form,jquery-history,jquery-colorbox,jquery-chosen.js?bg=3.4.3"></script>
  <script type="text/javascript" src="/eams/static/js/plugins/jquery.subscribe,/js/struts2/jquery.struts2,jquery.ui.struts2.js?bg=3.4.3"></script>
  <script type="text/javascript" src="/eams/static/scripts/beangle/beangle,beangle-ui.js?bg=3.4.3"></script>
  <script type="text/javascript">var App = {contextPath:"/eams"};var funcInit = function () {jQuery.struts2_jquery.version="3.6.1";beangle.contextPath=App.contextPath;jQuery.scriptPath = App.contextPath+"/static/";jQuery.struts2_jquerySuffix = "";jQuery.ajaxSettings.traditional = true;jQuery.ajaxSetup ({cache: false});};</script>
  <script type="text/javascript" src="/eams/static/scripts/my97/WdatePicker-4.72.js?compress=no"></script><link href="/eams/static/themes/default/WdatePicker.css" rel="stylesheet" type="text/css">
  <link id="jquery_theme_link" rel="stylesheet" href="/eams/static/themes/smoothness/jquery-ui.css?s2j=3.6.1" type="text/css">
  <link id="beangle_theme_link" href="/eams/static/themes/default/beangle-ui,colorbox,chosen.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="/eams/static/css/foundation.css" type="text/css">
  <script type="text/javascript" src="/eams/static/scripts/highcharts.js"></script>

	<script src="/eams/static/scripts/require.config.js?v=3"></script>
	<script>
	require.baseUrl="/eams/static/scripts";
	</script>
	<script src="/eams/static/scripts/require.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/require.js"></script>
	
	<!-- backbone & underscore -- fontend MVC framework -->
	<script type="text/javascript" src="/eams/static/scripts/underscore.min.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/backbone.min.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/underscore.string.min.js"></script>
	<script>
	require(['underscore.string'], function(_s) {
	        _.str = _s;
	        _.mixin(_.str.exports());
	});
	funcInit();
	//beangle.ajaxhistory = false;
	</script>
	

<link rel="stylesheet" type="text/css" href="/eams/static/themes/default/css/semesterCalendar.css"></head>`;

// 因为教务系统和小爱同学存在冲突，特尝试使用js重新写入请求头
let course_url = "http://jwxt.squ.net.cn/eams/courseTableForStd.action";
let home_url = "http://jwxt.squ.net.cn/eams/home.action";
let now_url = window.location.href;
now_url = now_url.split('/');
now_url = now_url[now_url.length-1];

try{
	if(dom.getElementsByClassName("gridtable")[0]){
		var sqxy = dom.getElementsByClassName("gridtable")[0];
	}else{
		var sqxy = 'No'
	}
}catch(e){
	
}
// 如果页面正常就把页面返回不然呢  不然就弹出提示信息
if (sqxy != "No") {
	alert("此信息为提示信息!!\n如有页面不全请先点击一键导入\n课表页面请选择班级课表\n如有异常可联系作者Q：2205909051");
    return sqxy.outerHTML;
}else{
  	alert("此信息为提示信息!!\n如有页面不全请先点击一键导入\n课表页面请选择班级课表\n如有异常可联系作者Q：2205909051");


	// 未写入前的body
	let bodys = document.body.outerHTML;

	if(now_url == "loginExt.action" || now_url == "loginExt.action#"){
		document.write(login_head)
		document.write(bodys)
	}else if(now_url =="homeExt.action" || now_url == "homeExt.action#" ||  now_url == "home.action"){
	// 	如果是主页就跳转到课表页面
		let courseOK = confirm("点击“确定”跳到课程表页面\n如不知道怎么使用,可以联系作者Q：2205909051")
		if(courseOK == true){
			window.location.href=course_url
		}else{
			document.write("<a style='font-size:40px' href="+home_url+">去旧版主页</a>");
			document.write("<a style='font-size:40px' href="+course_url+">去课程表页面</a>");
			document.write("<div style='font-size:40px'>树维系统适配不易，漂亮，帅气的同学点个赞吧！</div>");
			document.write("<div style='font-size:40px'>如不知道怎么使用,可以联系作者Q：2205909051</div>");
			document.write("<div style='font-size:40px'>如不知道怎么使用,可以联系作者Q：2205909051</div>");
		}
	}else if(now_url == "courseTableForStd.action" || now_url == "courseTableForStd!courseTable.action"){
	// 	无论课表页面是否正常显示都进行重写
		document.write(course_head)
		document.write(bodys)
	}else{
		alert("你现在在未知页面\n如不知道怎么使用,可以联系作者Q：2205909051");
	}
}
}
