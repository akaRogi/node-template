export = (verifyList: Array<any>, data: any, res: any) => {
    return new Promise((resolve: any, reject: any) => {
        const oneData = verifyList.find(el => !data[el.name]);
        if(oneData) {
            res.send({
                code: 400,
                msg: oneData.label + "不能为空"
            });
            reject();
            return false
        }
        resolve();
    })
}
