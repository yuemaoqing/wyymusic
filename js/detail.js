/**
 * Created by hxsd on 2017/3/2.
 */
var detailCtrl={
    /*detail接受数据的函数*/
    loadDetail:function(id,handle){    //必须用回调函数才能return出来
        $.ajax({
            type:"get",
            url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
            success:function(data){
                console.log(data);
                handle(data.playlist)
            }
        })
    },

    showDetail:function(id){
        //var self=this;
        /*字符串拼接传入上面的数据函数*/
        this.loadDetail(id,function(data){  //data代表data.playlist
            //console.log(id);

            /*显示title信息*/


            //显示歌曲信息
            var songs="";
            for(var i=0;i<data.tracks.length;i++){
                songs+='<li>'+
                        '<a class="clearfix">'+
                            '<div class="num floatL">'+(i+1)+'</div>'+
                            '<div class="songicon floatL">'+
                                '<div class="name">'+data.tracks[i].name+'</div>'+
                                '<div class="artist">'+data.tracks[i].ar[0].name+'</div>'+
                            '</div>'+
                        '</a>'+
                        '</li>'
            }
            $("#songs").append(songs);

        });
    }

};
(function(){
    detailCtrl.showDetail(playlistId); //playlistId就是上面的参数id
})();

