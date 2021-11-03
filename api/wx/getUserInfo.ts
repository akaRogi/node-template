/**
 * @api {GET} /wx/getUserInfo 根据code获取用户信息
 * @apiDescription 根据/wx/redirect获取code值，以该code值获取用户信息
 * @apiName getUserInfo
 * @apiGroup wx 微信公众号
 * @apiParam {string} code redirect回调的code
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "data" : {}
 *  }
 * @apiVersion 1.0.0
 */
const { Get } : any = require("../../utils/request");
const { wxConfig: { appId, appsecret } } : configObject = require("../../utils/config");
interface configObject {
    wxConfig: {
        appId: string
        appsecret: string
    }
}
interface reqObject {
    code: string  // 接口redirect回调回来的code
}

export = async (req: reqObject, res) => {
    const code = req.code;

    // 根据code获取access_token与openid
    interface snsOauth2Object {
        openid: string
        access_token: string
    }
    const snsOauth2 : snsOauth2Object = await Get("https://api.weixin.qq.com/sns/oauth2/access_token", {
        appid: appId,
        secret: appsecret,
        code,
        grant_type: 'authorization_code',
    });
    const access_token = snsOauth2.access_token;
    const openid = snsOauth2.openid;
    if (!openid) {
        return res.send({
            code: 400,
            data: snsOauth2
        })
    }

    // 获取用户详情
    const userinfo : snsOauth2Object = await Get("https://api.weixin.qq.com/sns/userinfo", {
        access_token,
        openid,
        lang: 'zh_CN',
    });
    if (userinfo.openid) {
        return res.send({
            code: 400,
            data: userinfo
        })
    }
    res.send({
        code: 200,
        data: userinfo
    })
}