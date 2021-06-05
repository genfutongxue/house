//设置get请求
const xhr=new XMLHpptRequest();
xhr.open("get","http://127.0.0.1:5000/get?you=me&me=you");
xhr.send();
xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
        console.log("完成");
        if(xhr.status===200){
            console.log("成功");
        }
    }
}
xhr.open("post","http://127.0.0.1:5000/post");
xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
xhr.send();