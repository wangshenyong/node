(function (window, vx) {
    var ibsapp = vx.module("ui.libraries");
    ibsapp.directive("slice", function () {
        return {
            restrict: 'A',
            // templateUrl: "/lib/template/slide/slidetemplate.html",
            link: function (scope, element, attrs) {
                //div动画
                scope.anitionHide = function (ele, eleWidth) {
                    console.info("anitionHide");
                    var left = 0;
                    var spend = 0;
                    var clear = window.setInterval(function () {
                        spend = -Math.ceil(eleWidth / 5);
                        eleWidth = spend + eleWidth;
                        left += spend;
                        ele.style.left = parseInt(left) + "px";
                        console.info("ele style left: spend: eleWidth " + ele.style.left + " " + spend + " " + eleWidth);
                        if (eleWidth <= 0) {
                            window.clearInterval(clear);
                        }
                    }, 10);
                }
                scope.anitionShow = function (ele, eleWidth) {
                    console.info("anitionShow");
                    var spend = 0;
                    var left = -eleWidth;
                    var tempWidth = eleWidth;
                    console.info("eleLeft: " + left);
                    var clear = window.setInterval(function () {
                        spend = Math.ceil(tempWidth / 5);
                        tempWidth = tempWidth - spend;
                        left = parseInt(left) + spend;
                        ele.style.left = left + "px";
                        console.info("Intervalleft: " + left);
                        if (left === 0) {
                            window.clearInterval(clear);
                        }
                    }, 10);
                }
                //显示与隐藏
                scope.showOrHide = function () {
                    console.info("showOrHide");
                    var ele = document.getElementById("slidecehuai");
                    var eleWidth = ele.offsetWidth;
                    console.info("ele offsetLeft: "+ele.offsetLeft);
                    var eleLeft = parseInt(ele.offsetLeft);
                    console.info("elewidth: " + eleWidth);
                    console.info("eleLeft: " + eleLeft);
                    if (eleLeft === 0) {
                        scope.anitionHide(ele, eleWidth);
                    } else {
                        scope.anitionShow(ele, eleWidth);
                    }
                }
                scope.whatShow = function (e) {
                    scope.showOrHide();

                }
            }
        }
    })
})(window, window.vx)