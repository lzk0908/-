getUserInfo();
let layer = layui.layer;

function getUserInfo() {
    $.ajax({
        //注意:以下的写法前提条件是在页面中引入ajaxConfig.js文件
        url: "/my/userinfo",
        //请求头的配置
        // headers: {
        //     //tiken的值存储在本地存储中,需要从本地存储中来获取到
        //     // Authorrization 这个不是随便写的,是后端定义要求的
        //     Authorization: localStorage.getItem("token")
        // },
        success: function (res) {
            console.log(res)
            //渲染出来头像和昵称
            //注意点:
            //如果有头像的话展示头像,没有头像的话展示文字头像
            //如果有nickname,优先展示nickname,否则展示username

            //优先级(nickname和username)

            // 失败判断
            if (res.status !== 0) {
                // return console.log("获取用户信息失败")
                return layer.msg("获取用户信息失败")
            }
            let name = res.data.nickname || res.data.username;
            console.log(name);

            // 展示名字
            $("#welcome").text("欢迎" + name)

            // 处理 2选1,需要根据user_pic来做判断
            if (res.data.user_pic) {
                // if成立,说明有图片
                //图片显示,隐藏文字头像
                $(".layui-nav-img").attr("src", res.data.user_pic).show();
                $(".textAvatar").hide();

            } else {
                // 没有图片,展示文字头像;还需要修改文字头像的字(来源于name的第一个字)
                //隐藏图片头像

                let first = name[0].toUpperCase();
                $(".textAvatar").show().text(first);
                $(".layui-nav-img").hide()
            }
        },

        complete: function () {
            //请求完成,(不论成功还是失败,都会执行),判断
            //message=="身份认证失败"
            //status===1;
            //就知道用户没有权限进入到index页面,需要回到login页面重新登录

            // 通过res的responseJSON 可以获取到服务器响应回来的数据
            let data = res.responseJSON;
            if (data.status === 1 && data.message === "身份认证失败!") {
                location.href = "/home/login.html";
                localStorage.removeItem("token")
            }

        }
    })
}
//退出功能
$("#logoutBtn").click(function () {
    layer.confirm('确定退出登录?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //do something
        //点击确认执行的函数
        //思路:和登录做的事情是完全相反的
        //1.把本地存储的token移出掉
        //2.跳转到登录页面

        //1.
        localStorage.removeItem("token");
        //2.
        location.href = "/home/login.html";
        layer.close(index); //关闭当前询问框
    });
})