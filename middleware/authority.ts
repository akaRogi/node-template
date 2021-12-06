const { removeAuthoritySingle, removeAuthorityClass, authorityToken } : configObject = require('../utils/config');
const jwt = require('jsonwebtoken');
const secret = 'AKA_ROGI';

interface configObject {
    removeAuthoritySingle?: Array<string>
    removeAuthorityClass?: Array<string>
    authorityToken: string
}
interface reqObject {
    body?: object
    userInfo?: object
    url?: string
    get?: any
}

module.exports = (async (req: reqObject, res: any, next: any) => {
    // 请求api
    const { url } = req;
    // 判断判断该请求url是否存在免权验证
    if (removeAuthorityClass.find(el => url.indexOf(el) !== -1)) {
        next();
        return false;
    } else if(removeAuthoritySingle.includes(url)) {
        next();
        return false;
    }
    const token : string = req.get(authorityToken);
    if(!token) {
        return res.send({ code: 401 });
    }
    // 通过userId查找数据库
    // const user : any = await userDB.findOne({ where: { id: userId } });
    // if(user) {
    //     req.userInfo = user.dataValues;
    //     next();
    //     return false
    // }
    jwt.verify(token, secret, (err, decoded) => {
        if (!err) {
            req.userInfo = decoded;
            next();
            return false;
        }
        res.send({ code: 401, msg: "" })
    })
});
