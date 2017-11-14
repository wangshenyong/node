hostCtrl.$inject = ['$scope', "$remote","$window"];

function hostCtrl($scope, $remote,$window) {
    console.info("start hostCtrl");
    //后台获取数据
    $scope.fromJson = [];
    $scope.init = function() {
        $remote.post("/store/vip/store.do",$scope.fenye,function(data) {
            // $scope.fenye = data.fenye;
            $scope.fromJson = data.data;
            $scope.fenye =data.fenye;
            console.log(JSON.stringify(data));
        })

    }
    $scope.JsontoArray = function(data) {
        let temp = [];
        for (key in data) {
            temp.push(data[key]);
        }
        return temp;
    }
    // 保存于修改
    $scope.change = function(event) {

        $scope.paramchange = {};
        var flag = $(event.target).text();
        var $parent = $(event.target).parent().parent();
        var childs = $parent.children();
        if (flag === "修改") {
            console.log(childs);
            var i = childs.length - 2;
            while (i > 1) {

                $(childs[--i]).css({ "background": "#E6E6FA" })
                    .attr("contenteditable", "true");
            }
            $(event.target).text("保存");
        }
        if (flag === "保存") {
            $parent.children().css({ "background": "#FFFFFF" })
                .attr("contenteditable", "false");
            $scope.paramchange = {
                "id": $(childs[0]).attr("ser_id"),
                "host": $(childs[1]).text(),
                "ip": $(childs[2]).text(),
                "insertdate": $(childs[3]).text(),
                "scancode": $(childs[4]).text(),
                "scanflag": $(childs[5]).text()
            }
            $(event.target).text("修改");
            console.log("paramchange: " + JSON.stringify($scope.paramchange));
            $remote.post("/store/vip/gethost.do", $scope.paramchange, function(data) {
               if(data.flag)
                $scope.fromJson = data;
                console.log(data);
            });
        }

    }

    $scope.tuankuan = function() {

    }
    // 删除一行
    $scope.deleted = function(event) {
        var $parent = $(event.target).parents().parents();
        var id = $parent.children("td[name='index_id']").attr("ser_id");

        $remote.post("/store/vip/deleted.do", { "id": id }, function(data) {
            $scope.fromJson = data;
            console.log(data);
        });
    }
    // 添加一行
    $scope.addtr = function() {
        console.log("appendto");
        console.log($("#host").val());
        let data = [
            $("#host").val(),
            $("#ip").val(),
            $("#insertdate").val(),
            $("#scancode").val(),
            $("#scanflag").val()
        ];
        let addhost_param = {
            "host": $("#host").val(),
            "ip": $("#ip").val(),
            "insertdate": $("#insertdate").val(),
            "scancode": $("#scancode").val(),
            "scanflag": $("#scanflag").val()
        };
        console.log(addhost_param);
        $remote.post("/store/vip/insert_host.do", addhost_param, function(data) {
            $scope.fromJson = data;
            console.log(data);
            $("#exampleModal").modal("hide");

        });


    };
    $scope.showmodal = function() {
        $("#exampleModal").modal("show");
    }
    // 分页
    $scope.fenye = {
        allpage: 0,
        dpage : 0,
        rows: 20,
        dpagenumber:1,
        dpagecols:10
    }
    // 数据获取
    $scope.uipages = function ($event) {
        $scope.uipageclick($event);
        $remote.post("/store/vip/store.do",$scope.fenye,function(data) {
            // $scope.fenye = data.fenye;
            $scope.fromJson = data.data;
            $scope.fenye =data.fenye;
            console.log(JSON.stringify(data));
            $scope.uipagepar();
        })
    }
    // 分页组件渲染
    $scope.uipagepar = function() {
        var $activeli =$("#uipage>li .active");
        var $lia = $("#uipage>li>a[name='fakelink']");
        let dpagenumber = $scope.fenye.dpagenumber;
        var $li = $("#uipage li:nth-child("+dpagenumber+")");
        $activeli.removeClass("active");
        $li.addClass("active");
        for(let i = 1; i<$scope.fenye.dpagecols+1; i++) {
            $($lia[i-1]).html(i);
        }

    }
    //组件事件处理
    $scope.uipageclick = function($event)
    {
        if($event.target.id="pre") {
            if($scope.fenye.dpage != 0 ) {
                $scope.fenye.dpage --;
                 $scope.fenye.dpagenumber = $scope.fenye.dpage*$scope.fenye.dpagecols+1;
            } 
        } else  if($event.target.id="next") {
            if($scope.fenye.dpage < $scope.fenye.allpage) {
                $scope.fenye.dpage++;
                $scope.fenye.dpagenumber = $scope.fenye.dpage*$scope.fenye.dpagecols+1;
            } 
        } else {
            $scope.fenye.dpage = $event.target.html();
        }
    }
}