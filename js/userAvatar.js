$(function () {
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        success:function(res){
            if(res.code!=0){
                return layer.msg(res.message);
            }
            if(res.data.user_pic){
                $('#image').attr('src',res.data.user_pic);
                $('#image').cropper({
                    aspectRatio:1,
                    preview:'.show-img'
                });
            }
        },
    })
    $('.select').click(function(){
        $('input[type=file]').click();
    })
    var layer=layui.layer;
    $('input[type=file]').change(function(){
        var files=$(this)[0].files;
        if(files.length==0){
            return layer.msg('请选择图片');
        }
        console.log(files[0]);
        var url=URL.createObjectURL(files[0])
        $('#image').cropper('replace',url);
    })
    $('.upload').click(function(){
        var base64=$('#image').cropper('getCroppedCanvas',{
            width:100,
            height:100
        }).toDataURL('image/png');
        $.ajax({
            type:'patch',
            url:'/my/update/avatar',
            data:{
                avatar:base64
            },
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