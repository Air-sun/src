$.ajaxPrefilter(function (option) {
    option.url = 'http://www.liulongbin.top:3008' + option.url;
    if (option.url.indexOf('/my/') != -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    option.complete = function (res) {
        if (res.responseJSON.code == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem('token');
            location.replace('login.html');
        }
    }

})