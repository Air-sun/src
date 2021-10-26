$(function(){
    var layer=layui.layer;
    getInfo();
    function getInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            headers:{
                Authorization:localStorage.getItem('token')
            },
            success:function(res){
                if(res.code!=0){
                    return layer.msg(res.message);
                }
                renderAvatar(res.data)
            }
        })
    }
    //渲染用户头像
    function renderAvatar(data){
        var name=data.nickname||data.username;
        $('#welcome').html('欢迎 '+name);
        if(data.user_pic){
            $('.layui-nav-img').attr('src',data.user_pic).show();
            $('.text-avatar').hide();
        }else{
            $('.layui-nav-img').hide();
            $('.text-avatar').show();
            $('.text-avatar').text(name[0].toUpperCase());
        }
    }
})