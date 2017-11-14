(function(window,vx) {
	var mod = vx.module("ui.libraries");
	mod.directive("godDate",function(){
		  return {
            restrict: 'E',
            templateUrl: "lib/plugins/datepicker/god-datepicker-view.html",
            link: function (scope, element, attrs) {
            	// 初始化当页的显示数据
            	var showDate = function (){
            		var initDate = attrs.initDate;
            		if(initDate) {
            			dateAll = window.datePicker("div", null, null, null);
            		} else {
            			dateAll = window.datePicker("div", initDate.getFullYear(), 
            				initDate.geteMonth(), initDate.getDate());
            		}

            		将每7个数据转换成对象保存
            		scope.data = {"date":[]};
            		for(var i=0; i<42; i+=7){
            			scope.data.date.push(initDate.slice(i,i+7));
            		}
            		scope.data.year = initDate.year;
            		scope.data.month = initDate.month;
            	};
            	showDate();
            }
        }
	})
})(window,window.vx)