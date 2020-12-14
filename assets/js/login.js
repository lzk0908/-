$(function () {
    //去注册账号
    $(".zhuce").click(function () {
        //显示注册
        $(".register").show()
        //隐藏登录
        $(".login").hide()
    })

    $(".denglu").click(function () {
        //隐藏注册
        $(".register").hide()
        //显示登录
        $(".login").show()
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value, item) {
            // value 表单的值 item 表单的dom对象
            // console.log(value);
            if (value !== $(".passipt").val()) {
                return "两次输入的密码不一致"
            }
        }
    })

    //实现注册功能
    //1.当form表单提交的时候,触发表单的submit提交功能==>注册form的submit事件
    //2.阻止form表单的默认行为
    //3.收集表单中的数据(用户名丶密码)
    //4.发送ajax==>照着接口文档

    $("#regiForm").on("submit", function (e) {
        e.preventDefault();

        let data = $(this).serialize();
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    //注册失败
                    layer.msg('注册失败', {
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        //do something
                    });
                    return console.log(res.message)

                }
                //注册成功
                layer.msg('注册成功', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    //do something
                });
                console.log("注册成功")
                // 清空注册表单
                $("#regiForm")[0].reset()

                //去登录==>触发其点击功能
                $(".denglu").click()
            }
        })
    })

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    //登录失败
                    return layer.msg(res.message)
                }


                localStorage.setItem("token", res.token);
                //登录成功
                layer.msg('登录成功', {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    // layer.msg('请稍后,即将跳转到首页...', {
                    //     time: 2000,
                    // })
                    location.href = "/home/head.html"
                });


            }
        })
    })
})