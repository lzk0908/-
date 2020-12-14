//ajax的配置==>优化 根路径==>$.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    console.log(options)
})