(function(winodw, vx) {
    var mod = vx.module("ui.libraries");
    mod.directive("myMenu", ["$compile", function($compile) {
        return {
            restrict: 'E',
            templateUrl: "/lib/template/mymenu/mymenu.html",
            link: function(scope, element, attrs) {
               
                // 设置第二菜单ul位置
                scope.setulleft = function($index) {
                	// 重置所有二级菜单长度
                    element.find("ul>li>ul").css("margin-left", -50);
                    // 二级菜单长度
                   
                    var child_length = scope.data[$index].childmenu?scope.data[$index].childmenu.length * 90:0,
                    // 二级菜单开始位置到一级菜单尾部长度
                        p_length = (scope.data.length - $index) * 60;
                    if (child_length > p_length) {
                        element.find("ul>li>ul").css("margin-left", p_length - child_length);
                    }

                    if(!scope.data[$index].childmenu)
                    {
                    	$("#"+$index).css("background","none");
                    }
                }

                // setInterval 循环检查指令是否绘制完成
                scope.count = 0;//超时计时器
                scope.timer = window.setInterval(function() {
                	scope.setmenu();
                }, 10);

                scope.setmenu = function(){

                	scope.count=parseInt(scope.count)+1;
                	var menu_length = scope.data[scope.data.length-1].menu_length;
                    var temp = element.find("a");

                    // 如何所有的菜单节点已经被捕获，清除循环器，初始化菜单
                    if (temp.length == menu_length) {
                    	window.clearInterval(scope.timer);
                        scope.i = 0;
                        while (scope.i < temp.length) {
                            $(temp[scope.i]).bind("click", scope.callback["menu" + scope.i]);
                            scope.i++;
                        }
                    }
                    // 如果捕获菜单节点超时，停止初始化
                    if(scope.count>10)
                    {
                    	 scope.count=0;
                    	 window.clearInterval(scope.timer);
                    	 console.error("初始化菜单失败，请检查参数是否配置正确");
                    }
                }
            }
        }
    }])
})(window, window.vx)