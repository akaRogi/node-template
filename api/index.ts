/**
  * @FileDescription: 自动化加载路由
  * @Author: Rogi
  * @Date: 2021-10-28 16:36
  * @LastEditors: Rogi
  * @LastEditTime: 2021-10-28 16:36
  */
const routerMap : Array<string> = [
    'users',
    'wx',
    'applets',
    'qiniu',
    'common'
];

interface ValueObject {
    headers?: object
    body?: object
    query?: object
    userInfo?: object
    get?: any
    files?: Array<object>
}

interface routerObject {
    middleware: Array<string> // 路由中间件
    type: string    // 路由GET或是POST
}

/**
  * @description: 将分散在各个api的路由表集合并且整理成类并且生成路由
  * @return {routerClass} 路由类
  * @return {router} 该类下面的所有路由
 */
export = routerMap.map((el : string) => {
    const express = require('express');
    const router = new express.Router();
    const routerMap = require(`./${el}/router/index`);

    for(let k in routerMap) {
        const item : routerObject = routerMap[k];
        // 中间件为空的话初始化默认一个空数组
        item.middleware = item.middleware || [];
        // 解析路由地址
        router[item.type](`/${k}`, ...item.middleware, function(req : ValueObject, res : any, next : any) {
            // 解析解析路由方法，GET的话将query进行改写否则传入body
            require(`./${el}/${k}`)(item.type.toLocaleUpperCase() === "GET" ? req.query : { ...req.body, files:[...req.files] }, res);
        });
    }
    return {
        routerClass: el,
        router: router
    }
})