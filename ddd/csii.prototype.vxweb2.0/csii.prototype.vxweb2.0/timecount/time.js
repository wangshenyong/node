(function(window,vx){
  var ibsapp = vx.module("ibsapp");
  ibsapp.directive("myTime",["$timeout",function($timeout){
    return {
      restrict:'ECMA',
      replace:true,
      scope : {
            count : '=',
            starttext : '=',
            endtext : '=',
            timeover : '&'
        },
      templateUrl:"lib/timecount/time.html",
      link:function($scope,ele,attrs){
        var count=0;
        var clear;
        var starttext="发送%s秒";
        var endtext="重新发送";
        var xuntime=function(){
            ele.text(starttext.replace(/%s/,count));
            console.info($scope.timeover);

            if(count<=0)
            {
              $scope.timeover();
              window.clearInterval(clear);
              ele.text(endtext);
              ele.bind("click",$scope.clicktime);
            }
            count--;
        }
        $scope.clicktime=function(){
          count=$scope.count;
          console.info("startText: "+$scope.starttext);
          console.info("count: "+$scope.count);
          if($scope.starttext)
          {
            starttext=$scope.starttext;
          }
          if($scope.endtext){
            endtext = $scope.endtext;
          }
          if(isNaN(count)||count<1)
          {
            console.info("参数设置错误")
          }
          else{
            ele.unbind("click");
            clear=window.setInterval(xuntime,1000);
          }

        }
      }
    }
  }])
})(window,vx)
