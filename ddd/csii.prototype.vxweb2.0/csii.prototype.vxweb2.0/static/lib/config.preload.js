/**
 *开发模式下，加载css和js的配置文件
 */
(function() {
	var cssFiles = [
	
		"css/swiper-3.4.0.min.css",
		"css/ui-slideBox.css",
		// "css/ui-pager2.css",
		// "css/tab_box.css",
		"css/bootstrap.css",
		"css/bootstrap-theme.css",
		"lib/plugins/dist/css/vendor/bootstrap/css/bootstrap.min.css",
		"lib/plugins/dist/css/flat-ui.css",
		"css/box_content.css",
		"css/my_login.css"
	];
	var jsFiles = [
		/*vx2插件*/
		"lib/min/vx2-ui.router.min.js",//ui-router
		"lib/min/vx2-storage.min.js",
		"lib/min/vx2-vpage.min.js",
		"lib/min/vx2-oclazyload.min.js",
		

		"lib/min/vx2-sanitize.min.js",//净化html 运用在v-bind-html
		"lib/plugins/jquery.extend.js",
		"lib/plugins/pinyin.js",
		"lib/plugins/swiper/swiper-3.4.2.jquery.min.js",
		/*vx2配置*/
		"lib/vx2-config.js",
		"lib/config.lazyload.js",
		"lib/vx2-config-router.js",//路由及rootscope
		"lib/vx2-locale_zh_cn.js",//国际化及翻译
		/*vx2指令*/

		// bootstrap指令 --start
		"lib/modules/bootstrap/accordion.js",
		"lib/modules/bootstrap/alert.js",
		"lib/modules/bootstrap/bindHtml.js",
		"lib/modules/bootstrap/buttons.js",
		"lib/modules/bootstrap/carousel.js",
		"lib/modules/bootstrap/collapse.js",
		"lib/modules/bootstrap/dateparser.js",
		"lib/modules/bootstrap/datepicker.js",
		"lib/modules/bootstrap/dropdown.js",
		"lib/modules/bootstrap/modal.js",
		"lib/modules/bootstrap/pagination.js",
		"lib/modules/bootstrap/popover.js",
		"lib/modules/bootstrap/position.js",
		"lib/modules/bootstrap/progressbar.js",
		"lib/modules/bootstrap/rating.js",
		"lib/modules/bootstrap/tabs.js",
		"lib/modules/bootstrap/timepicker.js",
		"lib/modules/bootstrap/tooltip.js",
		"lib/modules/bootstrap/transition.js",
		"lib/modules/bootstrap/typeahead.js",
		//bootstrap --end

		// "lib/modules/directives/ui-amount.js",
		// "lib/modules/directives/ui-bgimgscroller.js",
		// "lib/modules/directives/ui-calendar.js",
		// "lib/modules/directives/ui-include.js",
		// "lib/modules/directives/ui-menu2.js",
		// "lib/modules/directives/ui-Menupull.js",
		"lib/modules/directives/ui-pager.js",
		// "lib/modules/directives/ui-pager2.js",
		"lib/modules/directives/ui-slidebox.js",
		// "lib/modules/directives/ui-slidedown.js",
		// "lib/modules/directives/ui-timebtn.js",
		// "lib/modules/directives/ui-validate.js",
		//
		// "lib/modules/directives/vx-file-upload.js",
		// "lib/modules/directives/ui-imgpreview.js",
		"lib/modules/directives/vx-file-download.js",
		"lib/modules/directives/ui-jq.js",
		"lib/modules/directives/time.js",
		"lib/plugins/datepicker/WdatePicker.js",
		"lib/modules/directives/ceslide.js",
		// "lib/plugins/datepicker/god-datepicker-ker.js",
		// "lib/plugins/datepicker/god-datepicker-init.js",
		"lib/modules/directives/tabchange.js",
		//
		/*vx2过滤器*/
		"lib/modules/filters/amountFilter.js",
		"lib/modules/filters/dimAcNoFilter.js",
		"lib/modules/filters/filterPinyin.js",
		"lib/modules/filters/isNullFtr.js",
		"lib/modules/filters/dimPhoneNumFilter.js",
		"lib/modules/filters/accountNoFilter.js",
		/*vx2服务*/
		"lib/modules/services/cookieService.js",
		"lib/modules/services/$domainServer.js",
		"lib/modules/services/$modalServer.js",
		"lib/modules/services/$nativeCall.js",
		"lib/modules/services/$os.js",
		"lib/modules/services/$dateUtil.js",
		"lib/modules/services/printService.js",

		"lib/modules/module.extend.js",
		"lib/min/jquery.luara.0.0.1.min.js",
		"lib/plugins/dist/js/flat-ui.js",
		"lib/main.js"
	];

	if (typeof(exports) != "undefined") {
		exports.jsFiles = jsFiles;
		exports.cssFiles = cssFiles;
	} else {
		for (var i = 0; i < cssFiles.length; i++) {
			loadCss(cssFiles[i]);
		}
		for (var i = 0; i < jsFiles.length; i++) {
			loadJs(jsFiles[i]);
		}
	}

	function loadJs(path) {
		var scriptTag = document.createElement("script");
		scriptTag.type = "text/javascript";
		scriptTag.src = path;
		document.write(outerHTML(scriptTag));
	}

	function outerHTML(node) {
		// if IE, Chrome take the internal method otherwise build one
		return node.outerHTML || (function(n) {
				var div = document.createElement('div'),
					h;
				div.appendChild(n);
				h = div.innerHTML;
				div = null;
				return h;
			})(node);
	}

	function loadCss(path) {
		var cssLink = document.createElement("link");
		cssLink.rel = "stylesheet";
		cssLink.type = "text/css";
		cssLink.href = path;
		document.getElementsByTagName("head")[0].appendChild(cssLink);
	}
})();
