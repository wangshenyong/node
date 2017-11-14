loginCtrl.$inject=["$scope","$remote"];
function loginCtrl($scope,$remote) {
	console.log("start loginCtrl");
	$scope.login = function() {
		var u_p = {
			user:$scope.user,
			password:$scope.password
		};
		console.log("login: "+$scope.user+"   "+$scope.password);
		// 发送数据到后台登录验证
		$remote.post("/store/login.do",u_p, function(data) {
			if(data.flag) {
				$scope.goto("myapp.index");
			}
			else {
				alert("密码或者用户名错误")
			}
			console.log("login: "+JSON.stringify(data));
		});
	}
}