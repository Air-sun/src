$(function () {
    getCase();
    var form = layui.form;
    function getCase() {
        $.get('/my/cate/list', function (res) {
            if (res.code != 0) {
                return layer.msg(res.message, { icon: 2 });
            }
            $('select[name=cate_id]').html(template('option', res));
            form.render('select');
        })
    }
    initEditor();
    $('#choose').click(function () {
        $('.choose').click();
    })
    var layer = layui.layer;
    var files;
    $('.choose').change(function () {
        files = $(this)[0].files;
        if (files.length == 0) {
            return layer.msg('请选择图片');
        }
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function (e) {
            $('.cover-img img').attr('src', e.target.result);
        }
    })
    var state='已发布';
    $('#save').click(function(){
        state='草稿'
    })
    $('#publish').submit(function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('cover_img', files[0]);
        fd.append('state', state);
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success:function () {
                location.href='list.html';
            }
        })
    })
})
