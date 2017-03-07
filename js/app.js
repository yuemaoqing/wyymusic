/**
 * Created by yuemaoqing on 2017/2/24.
 */
var viewW=document.documentElement.clientWidth;
var oHtml=document.documentElement;
oHtml.style.fontSize=viewW/16+"px";
var playlistId;/*全局变量*/

/*轮播图面向对象*/
function route(mode,box){
    //$("#content").load("view/"+mode+".html");

    if(box===undefined){
        box=$("#content");
        /*不用上面那个的原因就是要先引入页面,再引入js文件,这里不能异步请求*/
        $.ajax({
            url:"view/"+mode+".html",
            success:function(data){
                /*加载页面*/
                box.html(data);
                /*加载页面对应的js*/
                loadModeJS(mode)
            }
        })
    }
}
/*加载对应的JS文件函数*/
function loadModeJS(mode){
    $.ajax({
        url:"js/"+mode+".js",
        dataType:"script"
    })
}
/*默认加载首页*/
$(function(){
    route('home');
});
