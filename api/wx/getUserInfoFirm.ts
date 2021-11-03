/**
 * @api {GET} /wx/getUserInfoFirm 根据code获取用户信息（企业）
 * @apiDescription 根据/wx/redirect获取code值，以该code值获取用户信息
 * @apiName getUserInfoFirm
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

   // 获取access_token
   interface getAccessTokenObject {
      access_token: string
   }
   const getAccessToken : getAccessTokenObject = await Get("https://api.weixin.qq.com/cgi-bin/token", {
      grant_type: 'client_credential',
      appid: appId,
      secret: appsecret
   });
   const accessToken = getAccessToken.access_token;
   if (!accessToken) {
      return res.send({
         code: 400,
         data: getAccessToken
      })
   }

   // 获取openid
   interface snsOauth2Object {
      openid: string
   }
   const snsOauth2 : snsOauth2Object = await Get("https://api.weixin.qq.com/sns/oauth2/access_token", {
      appid: appId,
      secret: appsecret,
      code,
      grant_type: 'authorization_code',
   });
   const openid = snsOauth2.openid;
   if (!openid) {
      return res.send({
         code: 400,
         data: snsOauth2
      })
   }

   // 将刚刚获取的access_token和openId拼接上去获取用户信息
   const getUserInfo : object = await Get("https://api.weixin.qq.com/cgi-bin/user/info", {
      access_token: accessToken,
      openid,
      lang: "zh_CN"
   });

   res.send({
      code: 200,
      data: getUserInfo
   })
}