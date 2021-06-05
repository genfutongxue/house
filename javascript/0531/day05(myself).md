# day04

## 谈谈前端路由

​			定义：前端路由是用来实现SPA（single page web application）单页面应用

​			方法：有两种实现模式

​						1.history：兼容性比hash模式差点，更美观

​						2.hash：兼容性更好，但是因为地址栏带#，所以会影响瞄点功能，而且不好看

​			特点：1.整个应用只有一个完整的页面

​						2.点击a链接不会刷新页面，不会发生跳转

​						3.只会更新浏览器历史记录，并且更新局部页面，网址会进行相应的变化

​			原理：1.给a标签绑定click事件，并且禁止a标签的默认行为（也就是说不会发送请求和跳转页面）

​						2.通过history.push/replace等方法去更新历史记录

​						3.通过history.listen()事件来监听浏览器历史记录的变化，从而进行DOM操作更新页面变化

​			使用：引入react-router-dom库可以解构出{BrowserRouter , HashRouter , Route , Link , NavLink , Switch , Redirect }这些组件来使用，其中 BrowserRouter 或 HashRouter 必须包裹在最外层使用，路由可以嵌套着使用

​			路由对象有3个属性，分别是history对象，match对象，location对象  
