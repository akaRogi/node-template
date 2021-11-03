/**
 * @api {GET} /applets/saveUser 获取微信头像，名字等信息
 * @apiDescription 该接口可获取微信头像、微信名字等用户基本信息，同时包括openId
 * @apiName saveUser
 * @apiGroup applets 小程序
 * @apiParam {string} code 从wx.login获取
 * @apiParam {string} encryptedData 用户授权之后会返回
 * @apiParam {string} iv 用户授权之后会返回
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "data" : {}
 *  }
 * @apiVersion 1.0.0
 */
const { appletsConfig: { appId } } : configObject = require("../../utils/config");
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt');
const login : any = require('./login');

interface configObject {
    appletsConfig: {
        appId: string
    }
}

interface loginObject{
    openid: string
    session_key: string
}

interface reqObject {
    code: string   // 从wx.login获取的code值
    encryptedData: string  // 从getUserProfile或getuserinfo获取的encryptedData
    iv: string  // 从getUserProfile或getuserinfo获取的iv
}

export = async ({code, encryptedData , iv} : reqObject, res : any) => {
    const jscode2session : loginObject = await login({code, });
    const pc : any = new WXBizDataCrypt(appId, jscode2session.session_key);
    const data = pc.decryptData(encryptedData , iv);
    data.openid = jscode2session.openid;
    delete data.watermark;
    res.send({
        code: 200,
        data
    });
}