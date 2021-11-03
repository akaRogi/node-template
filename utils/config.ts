module.exports = {
    // 鉴权中间件判断的token值
    authorityToken:'userId',
    // 去除token单个api校验
    removeAuthoritySingle: [
        // '/users/demo'
    ],
    // 去除token整个类路由校验
    removeAuthorityClass: ['/wx', '/applets'],
    // 公众号配置
    wxConfig: {
        appId: '',
        appsecret: ''
    },
    // 小程序配置
    appletsConfig: {
        appId: '',
        appsecret: ''
    },
    // 七牛配置
    qiniuConfig: {
        accessKey: '',
        secretKey: '',
        bucket: '',  // cdn库名
        expires: 10  // 该token可用时长（单位：秒）
    },
    // mysql配置
    mysql: {
        host: '',
        database: '',
        account: '',
        password: ''
    }
};