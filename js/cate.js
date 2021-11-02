$(function(){
    var layer=layui.layer;
    var form=layui.form;
    getList();
    function getList(){
        $.get('/my/cate/list',function(res){
            if(res.code!=0){
                return layer.msg(res.message,{icon:2});
            }
            $('tbody').html(template('tbody',res));
        })
    }
    var index;
    $('.layui-card-header button').click(function(){
        index=layer.open({
            type:1,
            title: '添加文章分类',
            content: $('#add').html(),
            area: ['500px', '250px']
          });
    })
    $('body').on('submit','#addForm',(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/cate/add',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!=0){
                    return layer.msg(res.message,{icon:2});
                }
                layer.close(index);
                getList();
                layer.msg(res.message,{icon:1});

            }
        })
    }))
    var edit;
    $('tbody').on('click','#editBtn',(function(){
        if($(this).attr('data-id')==1||$(this).attr('data-id')==2){
            return layer.msg('不允许修改！',{icon:0});
        }
        $.ajax({
            type:'get',
            url:'/my/cate/info?id='+$(this).attr('data-id'),
            success:function(res){
                if(res.code!=0){
                    return layer.msg(res.message,{icon:2});
                }
                form.val('form-edit',res.data);
            }
        })
        edit=layer.open({
            type:1,
            title: '修改文章分类',
            content: $('#edit').html(),
            area: ['500px', '250px']
          });
    }))
    $('tbody').on('click','#delBtn',(function(){
        var id=$(this).prev().attr('data-id');
        if(id==1||id==2){
            return layer.msg('不允许删除！',{icon:0});
        }
        layer.confirm('确认删除吗？',{icon:3,title:'提示'},function(){
            $.ajax({
                method:'DELETE',
                url:'/my/cate/del?id='+id,
                success:function(res){
                    if(res.code!=0){
                        return layer.msg(res.message,{icon:2});
                    }
                    getList();
                    layer.msg(res.message,{icon:1});
                }
            })
        })
    }))
    $('body').on('submit','#editForm',(function(e){
        e.preventDefault();
        $.ajax({
            type:'put',
            url:'/my/cate/info',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!=0){
                    return layer.msg(res.message,{icon:2});
                }
                layer.close(edit);
                getList();
                layer.msg(res.message ,{icon:1});
            }
        })
    }))
})