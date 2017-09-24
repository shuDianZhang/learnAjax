/**
 * Created by Stream on 2017/2/3.
 */
window.onload = function(){
    var oUser = document.getElementById('user');
    var oReg = document.getElementById('reg');
    var oLogin = document.getElementById('login');
    var oUserinfo = document.getElementById('userinfo');

    var oUsername1 = document.getElementById('username1');
    var oVerifyUserNameMsg = document.getElementById('verifyUserNameMsg');
    //alert(document.cookie);


    updateUserStates();


    function updateUserStates(){
        var uid = getCookie('uid');
        var username = getCookie('username');
       if(uid){
           //如果是登录状态
           oUser.style.display = 'block';
           oUserinfo.innerHTML = username;
           oReg.style.display = 'none';
           oLogin.style.display ='none';
       }else{
           oUser.style.display = 'none';
           oUserinfo.innerHTML = '';
           oReg.style.display = 'block';
           oLogin.style.display ='block';
       }
    }



    /*
    验证用户名
    get
         guestbook/index.php
             m:  index
             a:  verifyUserName
             username: 要验证的用户名
    返回
          ｛
                code : 返回的信息代码  0 = 没有错误   1 = 有错误
                message: 返回的信息  具体的返回信息
           ｝
     */



   //alert(document.cookie);
    oUsername1.onblur = function(){     //当失去焦点的时候
        ajax('get','guestbook/index.php','m=index&a=verifyUserName&username='+this.value,function(data){
             var d = JSON.parse(data);
            oVerifyUserNameMsg.innerHTML = d.message;
            if(d.code){
                oVerifyUserNameMsg.style.color = 'red';
            }else{
                oVerifyUserNameMsg.style.color = 'green';
            }
        })
    }

    /*
     用户注册
     get
     guestbook/index.php
     m:  index
     a:  reg
     username: 要注册用户名
     password: 要注册的密码

     返回
     ｛
     code : 返回的信息代码  0 = 没有错误   1 = 有错误
     message: 返回的信息  具体的返回信息
     ｝
     */

     var oRegBtn = document.getElementById('btnReg');
    var oPassword1 = document.getElementById('password1');
     oRegBtn.onclick = function(){
         ajax('get','guestbook/index.php','m=index&a=reg&username='+encodeURI(oUsername1.value)+
             '&password='+oPassword1.value,function(data){
              var d = JSON.parse(data);
              alert(d.message);
         })
     }

    /*
     用户登录
     get
     guestbook/index.php
     m:  index
     a:  login
     username: 要登录的用户名
     password: 要登录的密码

     返回
     ｛
     code : 返回的信息代码  0 = 没有错误   1 = 有错误
     message: 返回的信息  具体的返回信息
     ｝
     */
    var oUsername2 = document.getElementById('username2');
    var oPassword2 = document.getElementById('password2');
    var oLogin = document.getElementById('btnLogin');
    oLogin.onclick = function(){
        ajax('get','guestbook/index.php','m=index&a=login&username='+encodeURI(oUsername2.value)+
            '&password='+oPassword2.value,function(data){
             var d = JSON.parse(data);
             alert(d.message);
             updateUserStates();
        });

    }

    function getCookie(key){
        var arr1 = document.cookie.split(';');
        for(var i=0 ; i<arr1.length;i++){
            var arr2 = arr1[i].split('=');
            if(arr2[0]==key){
                   return arr2[1];
            }
        }
    }

    /*
        用户退出
     */
    var oLogout = document.getElementById('logout');
    oLogout.onclick = function () {
        ajax('get','guestbook/index.php','m=index&a=logout',function(data){
            var d = JSON.parse(data);
            alert(d.message);
            updateUserStates();
        });
        return false;
    }



    /*
     用户登录
     post
     guestbook/index.php
     m:  index
     a:  send
     content ： 留言内容

     返回
     ｛
     code : 返回的信息代码  0 = 没有错误   1 = 有错误
     message: 返回的信息  具体的返回信息
     ｝
     */
    var oContent = document.getElementById('content');
    var oPostBtn = document.getElementById('btnPost');
    oPostBtn.onclick = function(){
        ajax('post','guestbook/index.php','m=index&a=send&content='+encodeURI(oContent.value),function(data){
            var d = JSON.parse(data);
            alert(d.message);

            if(!d.code){
                var oDl = document.createElement('dl');

                var oDt = document.createElement('dt');
                var oStrong = document.createElement('strong');
                oStrong.innerHTML= d.data.username;
               oDt.appendChild(oStrong);

                var oDd1 = document.createElement('dd');
                oDd1.innerHTML = d.data.content;

                var oDd2 = document.createElement('dd');
                var oA1 = document.createElement('a');
                oA1.href='';
                oA1.innerHTML = '顶(<span>'+d.data.support+'</span>)';
                var oA2 = document.createElement('a');
                oA2.href='';
                oA2.innerHTML = '踩(<span>'+d.data.oppose+'</span>)';
                oDd2.appendChild(oA1);
                oDd2.appendChild(oA2);

                oDl.appendChild(oDt);
                oDl.appendChild(oDd1);
                oDl.appendChild(oDd2);

            }
        });

    }



}