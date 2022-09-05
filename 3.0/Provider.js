async function scheduleHtmlProvider(dom = document) {
	//除函数名外都可编辑
	//作者：Jaker
	//更新时间：2022年9月4日23:29:04
	//联系方式(QQ)：2205909051
	//构思解决方案，如果正常登录那好办了，不能正常登录怎么办呢？上传之前改索引
	//1.弹出登录框
	//2.登录
	//3.跳转到课表页面
	//4.选择需要的课表年份学期
	//5.导入
	/*
		CryptoJS v3.1.2
		code.google.com/p/crypto-js
		(c) 2009-2013 by Jeff Mott. All rights reserved.
		code.google.com/p/crypto-js/wiki/License
		为了登录，冲
	*/
	var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
	n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
	32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
	2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
	k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
	a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
	f)).finalize(b)}}});var s=p.algo={};return p}(Math);
	(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
	k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})()
	// 请求页面
	function postData(url = '', data = {}) {
		const response = fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
				'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
				'Cache-Control': 'max-age=0',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Upgrade-Insecure-Requests': 1,
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: data
		})
		return response
	}
	let course_url = "http://jwxt.sqxy.edu.cn/eams/courseTableForStd.action"
	let login_url = "http://jwxt.sqxy.edu.cn/eams/loginExt.action"
	await loadTool('AIScheduleTools')
	// 如果现在是选择课表就直接解析,否则弹出登录
	await AIScheduleAlert({
		titleText: '温馨提示',
		contentText: '需要多次点击一键导入``异常可联系开发者QQ:2205909051谢谢。',
		confirmText: '确认', 
	})
	if(window.location.href === "http://jwxt.sqxy.edu.cn/eams/courseTableForStd!courseTable.action"){
		// 都正常后，尝试获取表格
		try {
			if (document.getElementsByClassName("gridtable")[0]) {
				var sqxy = dom.getElementsByClassName("gridtable")[0].innerHTML
				return sqxy
			} else {
				var sqxy = 'No'
				return 'do not continue'
			}
		} catch (e) {
			return 'do not continue'
		}
	}else if(window.location.href.indexOf("loginExt.action") != -1){
		// 弹出对话框输入账号、密码、验证码
		let userName = dom.getElementById("username")
		let userPassword = dom.getElementById("password")
		let usercaptcha = dom.getElementById("captcha_response")
		//输入账号
		userName = await AISchedulePrompt({
			titleText: '请输入账号后确认',
			tipText: '挡住点，别让别人看到了',
			defaultText: userName.value,
			validator: value => {
				if (value === '') return '好歹输入点'
				return false
			}
		})
		// 输入密码
		userPassword = await AISchedulePrompt({
			titleText: '请输入密码后确认',
			tipText: '挡住点，别让别人看到了',
			defaultText: userPassword.value,
			validator: value => {
				if (value === '') return '好歹输入点'
				return false
			}
		})
		//获取盐并得到加密mm
		let salt = dom.getElementsByTagName("script")[1].innerText
		let salt_index = salt.indexOf("CryptoJS.SHA1('")
		salt = salt.slice(salt_index+15, salt_index+52)
		let Password = CryptoJS.SHA1(salt + userPassword).toString()
		// 请求登录
		// 登录页面请求头   使系统正常登陆
		let formData = "username="+userName + "&password="+Password+"&session_locale=zh_CN"
		// 输入验证码
		if(usercaptcha != null){
			usercaptcha = await AISchedulePrompt({
				titleText: '请输入验证码后确认',
				tipText: '如果没有验证码不要输入',
				defaultText: usercaptcha.value,
				validator: value => {
					if (value === '6666') return '大吉大利'
					return false
				}
			})
			formData += "&captcha_response="+usercaptcha
		}
		await postData(login_url, formData).then(data => {
			if(data.url = "http://jwxt.sqxy.edu.cn/eams/homeExt.action"){
				document.write("<H1>选择您需要的课表，建议选择班级课表，识别比较好，选择好后再次点击一键导入</H1>")
			}else{
				document.write("<H1>1、可以输入账号、密码、验证码后、点击一键导入\n2、选择课表后再次点击一键导入</H1>")
			}
		})
	}
	let course_head = `
	<head>
  <meta http-equiv="content-type" content="text/html;charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta http-equiv="pragma" content="no-cache" />
  <meta http-equiv="cache-control" content="no-cache" />
  <meta http-equiv="expires" content="0" />
  <meta http-equiv="content-style-type" content="text/css" />
  <meta http-equiv="content-script-type" content="text/javascript" />
  <script type="text/javascript">window.$BG_LANG='zh';</script>
  <script type="text/javascript" src="/eams/static/scripts/jquery/jquery,jquery.ui.core.js?bg=3.4.3"></script>
  <script type="text/javascript" src="/eams/static/scripts/plugins/jquery-form,jquery-history,jquery-colorbox,jquery-chosen.js?bg=3.4.3"></script>
  <script type="text/javascript" src="/eams/static/js/plugins/jquery.subscribe,/js/struts2/jquery.struts2,jquery.ui.struts2.js?bg=3.4.3"></script>
  <script type="text/javascript" src="/eams/static/scripts/beangle/beangle,beangle-ui.js?bg=3.4.3"></script>
  <script type="text/javascript">var App = {contextPath:"/eams"};var funcInit = function () {jQuery.struts2_jquery.version="3.6.1";beangle.contextPath=App.contextPath;jQuery.scriptPath = App.contextPath+"/static/";jQuery.struts2_jquerySuffix = "";jQuery.ajaxSettings.traditional = true;jQuery.ajaxSetup ({cache: false});};</script>
  <script type="text/javascript" src="/eams/static/scripts/my97/WdatePicker-4.72.js?compress=no"></script>
  <link id="jquery_theme_link" rel="stylesheet" href="/eams/static/themes/smoothness/jquery-ui.css?s2j=3.6.1" type="text/css"/>
  <link id="beangle_theme_link" href="/eams/static/themes/default/beangle-ui,colorbox,chosen.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="/eams/static/css/foundation.css" type="text/css"/>
  <script type="text/javascript" src="/eams/static/scripts/highcharts.js"></script>
	<script src="/eams/static/scripts/require.config.js?v=3"></script>
	<script>require.baseUrl="/eams/static/scripts";</script>
	<script src="/eams/static/scripts/require.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/require.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/underscore.min.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/backbone.min.js"></script>
	<script type="text/javascript" src="/eams/static/scripts/underscore.string.min.js"></script>
	<script>
	require(['underscore.string'], function(_s) {
			_.str = _s;
			_.mixin(_.str.exports());
	});
	funcInit();
</script>
</head>`
	await postData(course_url).then(data => {
		let resdata = data.text()
		resdata.then((result)=>{
			document.write(course_head + result)
		})
	})
	return 'do not continue'
}
