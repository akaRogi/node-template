/**
 * @api {GET} /common/upload 文件上传
 * @apiDescription 文件上传
 * @apiName upload
 * @apiGroup common 公用
 * @apiParam {file} file 文件file
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code" : 200,
 *      "data" : {}
 *  }
 * @apiVersion 1.0.0
 */

const fs = require('fs');
const pathLib = require('path');
export = (req, res) => {
    const filename = req.files[0].path + pathLib.parse(req.files[0].originalname).ext
    fs.rename(req.files[0].path, filename, function(err){
        if(!err){
            return res.send({
                code: 200,
                data: {},
                msg: '上传成功'
            })
        }
        res.send({
            code: 500,
            msg: '上传失败'
        })
    })
}