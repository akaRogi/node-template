const { removeAuthoritySingle, removeAuthorityClass, authorityToken } : configObject = require('../utils/config');
const userDB : any = require('../db/user');
interface configObject {
    removeAuthoritySingle?: Array<string>
    removeAuthorityClass?: Array<string>
    authorityToken: string
}
interface reqObject {
    headers: object
    body?: object
    userInfo?: object
    url?: string
    get?: any
}

module.exports = (async (req: reqObject, res: any, next: any) => {
    // 请求api
    const { url } = req;
    // 判断判断该请求url是否存在免权验证
    if (removeAuthorityClass.find(el => url.indexOf(el) === 0)) {
        next();
        return false;
    } else if(removeAuthoritySingle.includes(url)) {
        next();
        return false;
    }
    const userId : string = req.get(authorityToken);
    if(!userId) {
        res.send({ code: 400 })
    }
    // 通过userId查找数据库
    const user : any = await userDB.findOne({ where: { id: userId } });
    if(user) {
        req.userInfo = user.dataValues;
        next();
        return false
    }
    res.send({ code: 401 })
});