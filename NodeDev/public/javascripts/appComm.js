//解析上一个页面URL地址传递的参数
function getRequestParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r == null)
        return r;
    return decodeURI(unescape(r[2]));
}
//编码需要通过URL地址传递的参数
function setRequestParam(name){
    return encodeURI(encodeURI(name));
}

function getTime(){
    var year = new Date().getFullYear();//年
    var month = new Date().getMonth()+1;//月
    var day = new Date().getDate();//日
    var hour = new Date().getHours();//时
    var minitue = new Date().getMinutes();//分
    var time = year +"-" + month + "-" + day + " " + hour + ":" +minitue;
    return time;
}

function savePosition(lng,lat){
    $.get('/getUserName',{},function(data){
//          alert("tag:"+data.tag);
          if(data.tag=="y"){
              $.get('/savePosition',{time:getTime(),lng:lng,lat:lat});
          }
    },'json');
}