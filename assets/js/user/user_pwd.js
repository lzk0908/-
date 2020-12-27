$(function () {
    // 给form添加自定义的校验规则
    let form = layui.form;
    let layer=layui.layer;
    form.verify({
        //密码的校验
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //新旧密码不能相同
        oldPass: (value) => {
            console.log(value); //新密码输入框的值
            //获取原密码的值
            let oldPwd = $("[name=oldPwd]").val();

            if (value === oldPwd) {
                return "新密码不能和原密码相同";
            }
        },

        //两次输入的密码必须相同
        newPass: (value) => {
            //获取新密码的内容,和确认密码的value做比较
            let newPwd = $("[name=newPwd]").val();
            if (newPwd !== value) {
                return "两次输入的密码不相同"
            }
        }
    })

    //发送ajax请求实现密码重置
    $(".layui-form").submit(function (e) {
       e.preventDefault();
       let data=$(this).serialize();
    //    console.log(data);
     $.ajax({
         url:"/my/updatepwd",
         type:"POST",
         data,
         success:function(res){
             console.log(res)
             if(res.status!==0){
                 return layer.msg("更新密码失败!"+res.message)
             }
             layer.msg("更新密码成功!")

             //清空密码框
             $(".layui-form")[0].reset()
         }
     })
    })
})