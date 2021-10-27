$(function(){
    var form=layui.form;
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6之间！'
            }
        }
    })
    var layer=layui.layer;
    getInfo();
    function getInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            // headers:{
            //     Authorization:localStorage.getItem('token')
            // },
            success:function(res){
                if(res.code!=0){
                    return layer.msg(res.message);
                }
                form.val('getInfo',res.data);
                $('input[tpye=hidden]').val(res.data.id);
            }
        })
    }
    $('#reset').click(function(e){
        e.preventDefault();
        getInfo();
    })
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'put',
            url:'/my/userinfo',
            // headers:{
            //     Authorization:localStorage.getItem('token')
            // },
            data:$(this).serialize(),
            success:function(res){
                if(res.code!=0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                window.parent.getInfo();
            }
        })
    })
})