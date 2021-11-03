/**
 * @api {GET} /wx/redirect 获取微信授权地址
 * @apiDescription 获取微信授权地址
 * @apiName redirect
 * @apiGroup wx 微信公众号
 * @apiParam {string} redirectUrl 回调地址
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "data" : "回调地址"
 *  }
 * @apiVersion 1.0.0
 */
const { wxConfig: { appId } } : configObject = require("../../utils/config");
interface configObject {
    wxConfig: {
        appId: string
    }
}
interface reqObject {
    redirectUrl: string  // 微信回调地址
}

export = (req : reqObject, res) => {
    // 从前端仔那里接收回调地址
    let redirectUrl = req.redirectUrl;
    // 拼接好授权地址
    let authorizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&scope=snsapi_userinfo&response_type=code&state=STATE#wechat_redirect`;
    // 将拼接好的地址返回出去
    res.send({
        code: 200,
        data: authorizeUrl
    })
}