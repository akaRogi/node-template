module.exports = (async (req: any, res: any, next: any) => {
    const urlSplit = req.url.split(/[?]|[/]/);
    urlSplit.shift();
    try {
        const verify = await require(`../api/${urlSplit[1]}/router`);
        if(!verify) {
            return next()
        }
        const data = {...req.body, ...req.query};
        const verifyValue = verify[urlSplit[2]];
        if(!verifyValue.verifyValue) {
            return next();
        }
        let off = true;
        for(let k in verifyValue.verifyValue) {
            const itemverifyValue = verifyValue.verifyValue[k];
            if(!data[k] && itemverifyValue.required && !itemverifyValue.default) {
                off = false;
                res.send({
                    code: 201,
                    msg:  itemverifyValue.name + '不能为空'
                });
                break
            }
            if(itemverifyValue.default) {
                // 如果默认有值则附上
                const method = req.method;
                switch(method) {
                    case "GET":
                        req.query = { [k]: itemverifyValue.default, ...req.query  };
                        break;
                    case "POST":
                        req.query = { [k]: itemverifyValue.default, ...req.body };
                        break;
                }
            }
        }
        if(off) {
            next();
        }
    }
    catch(err) {
        next()
    }
});
