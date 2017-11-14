WelcomeCtrl.$inject = ['$scope', '$log', '$window'];

function WelcomeCtrl($scope, $log, $window) {
    console.log("start welcomectrl");
    $scope.init = function () {
         // $scope.goto("myapp.index");
         // location.href=location.href
    }

     $scope.goallindex = function(event) {
        $("li.myactive").removeClass("myactive");
        $(event.target).parent().addClass("myactive");  
        $scope.goto("myapp.index");
    };

    $scope.goallhost = function(event) {
        $("li.myactive").removeClass("myactive");
        $(event.target).parent().addClass("myactive");
        $scope.goto("myapp.allhost");
    };

    $scope.gosuccesshost = function(event) {
        $("li.myactive").removeClass("myactive");
        $(event.target).parent().addClass("myactive");
        $scope.goto("myapp.successhost");
    };

    $scope.goerrorhost = function(event) {
        console.log($(event.target).parent())
        $("li.myactive").removeClass("myactive");
        $(event.target).parent().addClass("myactive");
        $scope.goto("myapp.errorhost");
    };
}