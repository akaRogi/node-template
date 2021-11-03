const demo = require("../../../middleware/demo");
export = {
    // 获取授权地址
    redirect: { type: 'get', middleware: [demo]},
    // 获取用户信息
    getUserInfo: {type: 'get'},
    // 获取用户信息（企业，可获取unionID以及是否关注公众号）
    getUserInfoFirm: {type: 'get'}
}