$(function () {
    var form = layui.form;
    form.verify({
        regpwd: [/^[\S]{6,15}$/, '密码长度必须是6-15位的非空字符串'],
        newpwd: function (value, item) {
            if (value == $('form input[name=pwd]').val()) {
                return '新密码不能与原密码一致';
            }
        },
        samepwd: function (value, item) {
            if (value != $('form input[name=newpwd]').val()) {
                return '两次密码不一致';
            }
        }
    })
    $('.layui-form').submit(function(e){
      
        e.preventDefault();
        var data={
            old_pwd:$('form input[name=pwd]').val(),
            new_pwd:$('form input[name=newpwd]').val(),
            re_pwd:$('form input[name=repwd]').val()
        }
        $.ajax({
            type:'patch',
            url:'/my/updatepwd',
            data:data,
            success:function(res){
                if(res.code!=0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#reset').click();
            }
        })
    })
})