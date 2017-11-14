说明：这个文件主要是对工程相关的结构，和相关工具的使用进行说明：

======================================================
本原型工程适用于移动金融部MIDP平台及信息流平台，混合模式下VX客户端页面开发。
VX产品 api网址
http://vx.csii.com.cn:8080 ，用户名、密码是同vp报工

工程文件说明
csii.prototype.vxclient2.0
	┗━build/ -->部署目录，项目测试或部署时唯一需要部署的目录。由压缩grunt命令产生
	┗━docs/ -->项目文档
	┗━nginx/ -->转发服务器，由nginx.zip解压生成
	┗━node_modules/ -->grunt依赖包目录，可以由npm install命令生成或者直接解压node_modules.zip
	┗━static/(或者simple、wap) -->开发目录，开发过程中唯一需要关心的目录
    	┗━css/ -->样式目录
		┗━data/ -->模拟数据目录，与nginx配合使用
    	┗━htmls/ -->页面template目录
		┗━lib/ -->VX框架目录
			┗━min/  -->VX库
			┗━modules/  -->VX UI扩展
			┗━plugins /  -->第三方插件
        	┣━load-dev.js  -->js、css依赖配置文件
			┣━vx2-config.js  -->VX2.0配置文件
			┣━vx2-config-route.js  -->路由配置主文件
			┣━vx2-config-route-other.js  -->路由配置辅助文件，用于多人协同开发时，不同程序员使用不同路由配置文件，避免svn冲突。
			┣━vx2-locale_zh_cn.js  -->国际化、前端翻译配置文件
    	┣━index.browser.html  -->仅仅用于辅助开发。混合开发中，浏览器辅助开发时的访问入口
		┣━index.html  -->VX单页程序访问入口
	┗━tasks/ -->grunt任务目录，开发者不需要关心。
	┣━ Gruntfile.js -->grunt配置文件
	┣━nginx.zip -->nginx压缩文件
	┣━node_modules.zip -->node_modules压缩文件
	┣━ package.json -->grunt配置文件
	┣━README.md
	┣━WebVXDemoA2.apk -->手机apk测试用，可直接配置HTML路径，测试HTML在手机App中的效果。
	┣━ZipEncryption.jar -->统一的打包压缩文件，用于前端工程打包成zip包。

一、开发环境搭建
1、解压文件，安装node
2、执行命令安装grunt-cli
>npm install -g grunt-cli
3、执行命令安装依赖
>npm install
或者直接解压node_modules.zip
4、执行js、css构建命令
>grunt
或者grunt package
5、开发环境与生产环境的切换
build/product目录下即为发布的目录
build/banklist目录即为分包后的目录

二、开发-页面传值
1、跨交易页面传值，setNextScope的使用
/**
* 第一步：必须打开vx-config中的设置$contextConfigProvider.setSessionStorageEnable(10);
* 设置参数表示只对最后n个路由进行本地会话保存，设置为0表示禁用本地会话保存。
* 第二步：setNextScope第一个参数为平铺到下一个Scope的对象。
* 如对象{name:"zhangsan",list:{name1:"123"}},平铺到下一个$scope后，可以直接在下一个$scope中使用$scope.name值为"zhangsan"
*
*/
$scope.$context.setNextScope(row);
$scope.goto("AccountDetail");

2、v-page的使用，由于公用一个controller，数据本来就是共享的。一般运用在跳转逻辑非常紧密的交易中，
如三步提交交易（交易严格按录入页-确认页-结果的跳转，不存在直接跳转至确认页的情况）。
v-page之间的跳转使用$scope.goto("#2");  也可以使用$targets服务，如 $targets("content","#2");
也可以给controller指定viewId<div v-controller="BankInnerTransferCtrl" view-id=“myContent”>，跳转使用$targets("myContent","#2")；
<div v-lazy-load="htmls/BankInnerTransfer/BankInnerTransfer.js" title="行内转账">
		<div v-controller="BankInnerTransferCtrl" v-init="init();">
			<div v-page href="htmls/BankInnerTransfer/BankInnerTransferPre.html" title="录入页"  ></div>
			<div v-page href="htmls/BankInnerTransfer/BankInnerTransferConf.html" title="确认页" onload="ConfLoad();"></div>
			<div v-page href="htmls/BankInnerTransfer/BankInnerTransferRes.html" title="结果页"></div>
			<div v-page href="htmls/BankInnerTransfer/BankInnerTransferPayee.html" title="收款人名册页"></div>
		</div>
</div>
v-page既可以使用href引用页面，也可以使用html嵌入，如：<div v-page ><div>...此处嵌入html代码</div></div>

3、路由参数传值
第一步：配置路由文件vx2-config-router.js的url添加路由参数名'/:FlowNo',如：
//手机充值订单查询
.state('app.MobileRechargeOrdQry', {
	url : '/MobileRechargeOrdQry/:FlowNo',
	templateUrl : 'htmls/MobileRechargeOrdQry/MobileRechargeOrdQry.html',
})
第二步：路由跳转,配置路由参数{'参数名':'参数值'}
/*带参数，跳转路由*/
$scope.goto('app.MobileRechargeOrdQry',{FlowNo:$scope.result.FlowNo});
第三步：获取路由参数值
/*获取路由参数*/
$scope.FlowNo=$scope.getRouteParams("FlowNo");

三、路由配置
基本配置$stateProvider.state('路由状态','状态的配置对象{}');
$stateProvider
.state('app', {
     url: "/app",
     templateUrl: 'htmls/AppView/AppView.html'
})
当我们访问index.html/app时， 'app'状态将被激活，同时index.html中的ui-view将被'AppView.html'填充。

URL参数
url动态部分被称为参数，有几个选项用于指定参数。基本参数如下：
.state('app.MobileRechargeOrdQry', {
	// 设置了url参数:FlowNo
	url : '/MobileRechargeOrdQry/:FlowNo',
	templateUrl : 'htmls/MobileRechargeOrdQry/MobileRechargeOrdQry.html',
})

templateUrl参数
templateUrl页面碎片URL地址。

四、$remote公共错误处理机制：
1、通过setErrorTag配置字符串（如setErrorTag（‘jsonError’））或者函数（无论相应正确错误，均为执行此函数），
返回true，表示相应Json为服务端错误返回
2、如果$remote.post请求发送时配置了自定义的错误回调函数，则执行自定义错误回调，如：
$remote.post("UserLogin.do", param, function(data) {
	//正确返回执行逻辑
}, function(data) {
	//错误返回执行逻辑
});
3、如果$remote.post请求发送时没有配置自定义的错误回调函数，则执行公共错误回调：
$remoteProvider.setErrorCallback(function(data, status, headers, config) {
	//公共错误回调
});

vpage:V0.0.1更新
1. 现在可以刷新scope(使用goto('#0'))
2. 不记录碎片历史使用goto('#1',true)
3. 为刷新scope,v-controller请放置在v-viewport里面
4. 如必须要v-controller(如$modal打开一个对话框)的情况，请的v-viewport所在元素上添加scope="false"属性控制不产生scope，这时做不到#0刷新scope
5. 补充了碎片页历史,默认采用闭合式记录碎片历史!
> 闭合式记录:例如 0->1->2->3->5->1(5回到1的过程是一个回路)!
> 历史记录如下:

    * ->0;pageinit
    * ->0->1;goto('#2')
    * ->0->1->2;goto('#3')
    * ->0->1->2->3;goto('#4')
    * ->0->1->2->3->5;goto('#6')
    * ->0->1;goto('#2');

> 模拟原生回退方法参考左上角的回退!
与回退有关的js:v-viewport.js/vx-cconfig.js/nativeCall.js

测试apk:WebVXDemoA2.apk
1.启动该原型作为远程http
2.安装apk,输入192.168.1.xxx:80xx
3.预览效果
:不能出现页面，请关闭防火墙

五、演示功能
1、登录、注册
2、账号绑定--》使用v-page
3、交易明细查询--》使用setNextScope
4、账户余额查询
5、手机充值

## 更新说明
	1、采用ui-route嵌套路由


## VX2.0目前支持的基本API
1.	全局方法 使用方式vx.toJson({});
	{'bootstrap': bootstrap,
    'copy': copy,
    'extend': extend,
    'merge': merge,
    'equals': equals,
    'element': jqLite,
    'forEach': forEach,
    'injector': createInjector,
    'noop': noop,
    'bind': bind,
    'toJson': toJson,
    'toKeyValue': toKeyValue,//push by yoyo.liu
    'fromJson': fromJson,
    'identity': identity,
    'isUndefined': isUndefined,
    'isDefined': isDefined,
    'isString': isString,
    'isFunction': isFunction,
    'isObject': isObject,
    'isNumber': isNumber,
    'isElement': isElement,
    'isArray': isArray,
    'version': version,
    'isDate': isDate,
    'lowercase': lowercase,
    'uppercase': uppercase,
    'callbacks': {counter: 0},
    'getTestability': getTestability,
    '$$minErr': minErr,
    '$$csp': csp,
    'reloadWithDebugInfo': reloadWithDebugInfo}
2.	基本指令 使用方式v-class
  htmlAnchorDirective,
  inputDirective,
  inputDirective,
  formDirective,
  scriptDirective,
  selectDirective,
  styleDirective,
  optionDirective,
  vBindDirective,
  vBindHtmlDirective,
  vBindTemplateDirective,
  vClassDirective,
  vClassEvenDirective,
  vClassOddDirective,
  vCloakDirective,
  vControllerDirective,
  vFormDirective,
  vHideDirective,
  vIfDirective,
  vIncludeDirective,
  vIncludeFillContentDirective,
  vInitDirective,
  vNonBindableDirective,
  vPluralizeDirective,
  vRepeatDirective,
  vShowDirective,
  vStyleDirective,
  vSwitchDirective,
  vSwitchWhenDirective,
  vSwitchDefaultDirective,
  vOptionsDirective,
  vTranscludeDirective,
  vModelDirective,
  vListDirective,
  vChangeDirective,
  patternDirective,
  patternDirective,
  requiredDirective,
  requiredDirective,
  minlengthDirective,
  minlengthDirective,
  maxlengthDirective,
  maxlengthDirective,
  vValueDirective,
  vModelOptionsDirective,
  vAttributeAliasDirectives,
  vEventDirectives,

  js事件
  click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste

3.	服务  使用方式$AnchorScroll没有Provider
  $AnchorScrollProvider,
  $AnimateProvider,
  $CoreAnimateCssProvider,
  $$CoreAnimateQueueProvider,
  $$CoreAnimateRunnerProvider,
  $BrowserProvider,
  $CacheFactoryProvider,
  $ControllerProvider,
  $DocumentProvider,
  $ExceptionHandlerProvider,
  $FilterProvider,
  $$ForceReflowProvider,
  $InterpolateProvider,
  $IntervalProvider,
  $$HashMapProvider,
  $HttpProvider,
  $HttpParamSerializerProvider,
  $HttpParamSerializerJQLikeProvider,
  $HttpBackendProvider,
  $xhrFactoryProvider,
  $LocationProvider,
  $LogProvider,
  $ParseProvider,
  $RootScopeProvider,
  $QProvider,
  $$QProvider,
  $$SanitizeUriProvider,
  $SceProvider,
  $SceDelegateProvider,
  $SnifferProvider,
  $TemplateCacheProvider,
  $TemplateRequestProvider,
  $$TestabilityProvider,
  $TimeoutProvider,
  $$RAFProvider,
  $WindowProvider,
  $$jqLiteProvider,
  $$CookieReaderProvider
4.	过滤器 使用方式 {{xxx|currency}}
 currencyFilter: true,
 dateFilter: true,
 filterFilter: true,
 jsonFilter: true,
 limitToFilter: true,
 lowercaseFilter: true,
 numberFilter: true,
 orderByFilter: true,
 uppercaseFilter: true,



// 文件上传FILTERS上传过滤
	// uploader.filters.push({
	// name : 'customFilter',
	// fn : function(item/*{File|FileLikeObject}*/, options) {
	// return this.queue.length < 10;
	// }
	// });
	// uploader.filters.push({
	// name : 'isImage',
	// fn : function(item, options) {
	// var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
	// return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
	// }
	// });
	 // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };


*****

##### **nodejs version: 0.10.13**
##### **grunt verson:~0.4.1**


## 操作步骤：
1.	确认你的grunt版本是v0.4.x  grunt -V
	如果不是＞0.4的版本，你先卸载grunt  : `npm  uninstall -g grunt`。
	安装grunt操作接口 : `npm install -g grunt-cli`
2.  使用 DOS命令窗口 或者 Termial操作窗口 进去到 vx-ui-test工程下面
3.  输入 `npm install` （如果有报 缺少 vc++ 的编译环境先不去管它）
4.  构建一下项目  , `grunt`
5.  运行测试 , `grunt test`

*******


