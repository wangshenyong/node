/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
(function(window, vx, undefined) {'use strict';
	var ibsapp = vx.module("ibsapp");
	/**
	 * 路由配置
	 * App Module
	 */
	ibsapp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide",
	function($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

		ibsapp.controller = $controllerProvider.register;
		ibsapp.directive = $compileProvider.directive;
		ibsapp.filter = $filterProvider.register;
		ibsapp.factory = $provide.factory;
		ibsapp.service = $provide.service;
		ibsapp.constant = $provide.constant;
		ibsapp.value = $provide.value;

		//是否使用全局controller
		$controllerProvider.allowGlobals();
		// H5模式configure html5 to get links working on jsfiddle
		//$locationProvider.html5Mode(true);

		/******路由配置开始******/
		$stateProvider
		/***************登录页配置介绍，主页配置开始**********************/
		.state('myapp', {
			abstract : true,
			url : '/myapp',
			templateUrl : 'htmls/Welcome/Welcome.html'
		})
		.state('myapp.allhost', {
			url : '/allhost',
			templateUrl : 'htmls/host/host.html'
		})
		.state('myapp.successhost', {
			url : '/successhost',
			templateUrl : 'htmls/successhost/successhost.html'
		})
		.state('myapp.errorhost', {
			url : '/errorhost',
			templateUrl : 'htmls/errorhost/errorhost.html'
		})
		// 登录页
		.state("loginindex",{
			abstract : true,
			url:"/loginindex",			
			templateUrl: 'htmls/loginindex/AppView.html'
		})
		.state("loginindex.login",{
			url:"/login",
			templateUrl: 'htmls/login/login.html'
		})
		.state("myapp.index",{
			url:"/index",
			templateUrl: 'htmls/index/index.html'
		})
		/******路由配置结束******/

		//默认装置路由
		$urlRouterProvider.otherwise(function($injector) {
			var $state = $injector.get("$state");
			$state.go("loginindex.login");
		});
		// $routeProvider.otherwise({
		// redirectTo : "/#/loginindex/login"
		// });

	}]);

})(window, vx);

