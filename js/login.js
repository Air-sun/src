$(function () {
    var layer = layui.layer;
    $('.sign-in a').click(function () {
        $('.sign-in').hide();
        $('.sign-up').show();
    })
    $('.sign-up a').click(function () {
        $('.sign-in').show();
        $('.sign-up').hide();
    })
    var form = layui.form;
    form.verify({
        regpwd: [/^[\S]{6,15}$/, '密码长度必须是6-15位的非空字符串'],
        samepwd: function (value, item) {
            if (value != $('form input[name=repwd]').val()) {
                return '两次密码不一致';
            }
        }
    })
    $('.sign-up form').submit(function (e) {
        e.preventDefault();
        var data = {
            username: $('.sign-up form input[name=username]').val(),
            repassword: $('.sign-up form input[name=repwd]').val(),
            password: $('.sign-up form input[name=pwd]').val()
        }
        $.post('/api/reg', data, function (res) {
            if (res.code != 0) {
                return layer.msg('注册失败，'+res.message);
            }
            layer.msg('注册成功，请登录');
            $('.sign-up a').click();
        })
    })
    $('.sign-in form').submit(function (e) {
        e.preventDefault();
        var data = {
            username: $('.sign-in form input[name=username]').val(),
            password: $('.sign-in form input[name=pwd]').val()
        }
        $.post('/api/login', data, function (res) {
            if (res.code != 0) {
                return layer.msg(res.message);
            }
            localStorage.setItem('token',res.token);
            layer.msg('登录成功!');
            location.href='index.html'
        })
    })
})