/**
 * Created by hxsd on 2017/3/1.
 */
/**这里handle。就是下面的function(data){}函数，这种方式称为回调函数，
 * 因为我们考虑到不是只有这个home页面请求数据，其他地方也要请求，所以不能用每次都请求的方法，会降低性能，
 * 当我们用return的方式，并不可行，return返回的是success的函数值，并不是请求返回出去的，所以用回调的方式**/

var homeCtrl={
    offset:0,
    getPlayList:function (offset,limit,handle){
                    $.ajax({
                        type:"get",
                        url:"http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset="+offset+"&limit="+limit,
                        dataType:"json",
                        success:function(data){
                                handle(data.playlists)
                        }
                    })
                },

    loadPage:function (){
        this.getPlayList(this.offset,6,function(data){ //这个的data是上面的data.playlists
        //console.log(data);
        /*找到home中歌单列表的id=playlist，通过变量名来绑定*/
            var icon="";
            for(var i=0;i<data.length;i++){
                icon+='<li>' +
                    '<a href="#detail?id='+data[i].id+'">' +    //#detail?id=固定写法
                    '<p><span>'+data[i].playCount+'</span></p>' +
                    '<img src="'+data[i].coverImgUrl+'">' +
                    '<i>'+data[i].name+'</i>' +
                    '</a>' +
                    '</li>';
            }
            /*委派点击事件*/
            $("#playlist").on("click","a",function(){
                /*就是获取id*/
                var href=$(this).attr("href");
                var id=href.replace("#detail?id=","");
                playlistId=id;
                route("detail");




               // route("detail");
            })

            /*找到ul甩进去*/
            $("#playlist").append(icon);
        });
        this.offset+=6;
    }



};
//自运行
(function(){
    homeCtrl.loadPage();
    $('.banner .pic').kxbdSuperMarquee({
        distance:viewW,//一次滚动的距离
        duration:20,//缓动效果，单次移动时间，越小速度越快，为0时无缓动效果
        time:1,//停顿时间，单位为秒
        direction: 'left'//滚动方向，'left','right','up','down'
    });
})();




