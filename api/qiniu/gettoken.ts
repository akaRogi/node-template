/**
 * @api {GET} /qiniu/gettoken 获取七牛上传token
 * @apiDescription 获取七牛上传token
 * @apiName gettoken
 * @apiGroup qiniu 七牛
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "data" : "token"
 *  }
 * @apiVersion 1.0.0
 */
const qiniu : any = require('qiniu');
const { qiniuConfig: { accessKey, secretKey, scope, expires } } : qiniuObject = require('../../utils/config');
interface qiniuObject {
    qiniuConfig: {
        accessKey: string
        secretKey: string
        scope: string,
        expires: number
    }
}

export = (req, res: any) => {
    const mac: any = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let putPolicy: any = new qiniu.rs.PutPolicy({ scope, expires });
    let uploadToken: string = putPolicy.uploadToken(mac);
    res.send({
        code: 200,
        data: uploadToken
    });
}