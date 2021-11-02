$(function(){
    var data={
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }
    getList();
    function getList(){
        $.get('/my/article/list',data,function(res){
            if(res.code!=0){
                return layer.msg(res.message,{icon:2});
            }
            $('tbody').html(template('tbody',res));
            page(res.total);
            console.log(res);
        })
    }
    function page(total){
            var laypage = layui.laypage;
            
            //执行一个laypage实例
            laypage.render({
              elem: 'pageBox',//盒子的ID名
              count: total,//数据总数，从服务端得到
              limit:data.pagesize,//显示条数 
              limits:[2,5,10,15,20],
              layout:[ 'count','limit', 'prev', 'page', 'next','skip'],
              curr:data.pagenum,//选中页
              jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                data.pagenum=obj.curr;
                data.pagesize=obj.limit;
                //首次不执行
                if(!first){
                    getList();
                }
              }
            });
    }
    template.defaults.imports.date=function(date){
        var dt=new Date(date);
        var y=dt.getFullYear();
        var m=addZero(dt.getMonth()+1);
        var d=addZero(dt.getDate());
        var h=addZero(dt.getHours());
        var m=addZero(dt.getMinutes());
        var s=addZero(dt.getSeconds());
        return y+'-'+m+'-'+d+' '+h+':'+m+':'+s;

    }
    function addZero(n){
        return n<10?'0'+n:n;
    }
    $('tbody').on('click','a',function(){
        $.get('/my/article/info',{id: $(this).attr('data-id')},function(res){
            if(res.code!=0){
                return layer.msg(res.message,{icon:2})
            }
            layer.open({
                type:1,
                area:['85%','85%'],
                title:'预览文章',
                content:template('detail',res)
            })
        });
    })
    getCase();
    var form=layui.form;
    function getCase(){
        $.get('/my/cate/list',function(res){
            if(res.code!=0){
                return layer.msg(res.message,{icon:2});
            }
            $('select[name=cate_name]').html(template('option',res));
            form.render('select');
        })
    }
    $('#search').submit(function(e){
        e.preventDefault();
        data.cate_id=$('select[name=cate_name]').val();
        data.state=$('select[name=state]').val();
        getList();
    })
    $('#search').on('reset',function(){
        data.cate_id='';
        data.state='';
        getList();
    })
    $('tbody').on('click','.delBtn',(function(){
        var id=$(this).attr('data-id');
        var num=$('.delBtn').length;
        layer.confirm('确认删除吗？',{icon:3,title:'提示'},function(index){
            layer.close(index);
            $.ajax({
                method:'DELETE',
                url:'/my/article/info?id='+id,
                success:function(res){
                    if(res.code!=0){
                        return layer.msg(res.message,{icon:2});
                    }
                    if(num==1){
                        data.pagenum=data.pagenum==1?1:--data.pagenum;
                    }
                    getList();
                    layer.msg(res.message,{icon:1});
                }
            })
        })
    }))
})