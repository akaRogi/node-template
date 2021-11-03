## 这是一个开箱即用node+expexpress+ts模板，内含以下功能
+ 利用node的`require`模块进行api的自动化生成
+ 微信公众号的授权
    + 企业公众号的用户信息
    + 非企业公众号的用户信息
+ 微信小程序授权
+ 文件上传功能
+ 七牛csdn`Token`上传
+ mysql快速配置
+ 采用sequelize快速操作sql语句
+ 全局的`token`拦截
+ 采用异步的方式封装了`request`模块
+ 采用`apidoc`自动化生成api文档

## 文件夹介绍
+ api
   + api文件存放位置
+ mysql
    + mysql相关配置
+ middleware
    + 中间件
+ db
    + `sequelize`模型定义
+ utils
    + 工具库

## 如何快速的添加一个api
1. `api/common`文件夹下新建一个ts文件，采用`export`导出一个`function`
2. `api/common/router/index.ts`内新增`xxx: { type: 'get' }`

以下是实例，我在common内需要新增一个名为demo的api

`api/common/demo.ts`内容
```
export = (req: any, res: any) => {
    res.send({
        code: 200
    })
};
```

`api/common/router/index.ts`内容
```
export = {
    demo: { type: 'get' }
}
```

这样子就能在浏览器里面输入`ip/common/demo`进行访问了，**如果请求为`POST`则讲`type`改成`POST`即可**

在api文件里面的`req`进行了封装过滤，如果是`GET`请求`req`返回为`req.query`，如果请求方式为`POST` `req`则会返回`req.body`，在运行项目的时候可以尝试输出`req`进行查看

如果想去掉这个返回可以去`api/index.ts`修改`query`与`body`的返回

## 如何生成一个不同指向的路由
1. 在`api`目录下新建一个文件夹，在该文件下面新建一个名为`router`的文件夹，在该`router`文件夹下，新建`index.ts`
2. 在`api/index.ts`下的`routerMap`变量，新增一个名为第一步文件夹名的字符串

下面是注册流程

在`api`下新建了一个名为`common`，最终他的文件目录是这样子的`api/common/router/index.ts`

在`api/index.ts`的`routerMap`数组内，新增了一个`common`字符串，这样子就已经注册完一个指向`common`的路由了，可进行添加aip的操作了

#### 微信公众号
微信公众号相关文件在`api/wx`目录下，可在`api/wx/router`查看各个文件的作用

#### 微信小程序
微信公众号相关文件在`api/applets`目录下，可在`api/applets/router`查看各个文件的作用

#### 七牛cdn上传
微信公众号相关文件在`api/qiniu`目录下，可在`api/qiniu/router`查看各个文件的作用

#### 文件上传
微信公众号相关文件在`api/common`目录下，可在`api/common/router`查看各个文件的作用

配置上述的敏感密钥以及相关配置可在`utils/config.ts`配置

## 运行项目
### 引入依赖
```
npm i
```
### 启动开发环境
```
npm run dev
```
### 打包
```
npm run build
```

## api文档生成采用的是apidoc，[官方文档](https://apidocjs.com/)
### 全局引用apidoc
```
npm i apidoc -g
```
### 生成api文档
```
npm run doc
```
