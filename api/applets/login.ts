/**
 * @api {GET} /applets/login 更具code获取用户信息
 * @apiDescription 如果有用户信息则返回，如果没有则需要调用/applets/saveUser保存用户信息
 * @apiName login
 * @apiGroup applets 小程序
 * @apiParam {string} code 从wx.login获取
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "data" : {}
 *  }
 * @apiVersion 1.0.0
 */

const { Get } : any = require("../../utils/request");
const { appletsConfig: { appId, appsecret } } : configObject = require("../../utils/config");
interface configObject {
    appletsConfig: {
        appId: string
        appsecret: string
    }
}
interface reqObject {
    code: string    // 从wx.login获取的code
}

export = (req : reqObject, res : any) => {
    return new Promise<any>( async(resolve) => {
        const code = req.code;
        const getOpenId = await Get("https://api.weixin.qq.com/sns/jscode2session", {
            appid: appId,
            secret: appsecret,
            js_code: code,
            grant_type: 'authorization_code'
        });
        // getOpenId为获取到的oepnid和session_key
        res && res.send({
            code: 200,
            data: getOpenId
        });
        resolve(getOpenId);
    });
};