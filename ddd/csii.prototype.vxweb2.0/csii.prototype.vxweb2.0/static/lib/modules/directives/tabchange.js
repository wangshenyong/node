(function (window, vx) {
    var mod = vx.module("ui.libraries");
    
    mod.directive("tabChange", function() {
        return {
          restrict: 'A',
          link: function (scope, ele, attrs) {
            // 重置选项卡状态
            scope.hide_item = function () {
                var ele_item_name = scope.tab["show_item"];
                var ele_target = scope.tab[ele_item_name];
                var ele = document.getElementsByName(ele_target);
                if(ele && ele[0] && ele.length) {
                    ele[0].style.display = "none";
                } else {
                    console.info("请检查选项卡的名称是否设置或者唯一");
                }
            }
            // 选项卡切换函数
              scope.clickchange = function(e) {
                  
                  var ele = e.target;
                  var name = ele.getAttribute("name");
                  if(scope.tab && scope.tab[name]) {
                    var ele_target = document.getElementsByName(scope.tab[name]);
                    if(ele_target && ele_target[0] && ele_target.length===1) {
                       
                        // debugger;
                        scope.hide_item();
                        ele_target[0].style.display = "block"; 
                        scope.tab["show_item"] = name;

                    } else {
                        console.info("选项卡的命名不唯一");
                    }
                  }
                  else {
                      
                  }

              }
            
          }
        }
    });
})(window, window.vx)