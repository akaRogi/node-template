import {Json} from "sequelize/types/lib/utils";

const request = require("request");

function requestBody(url: string, data: object, method: string) {
    return new Promise((resolve : any): void => {
        if(method === "GET" && JSON.stringify(data) !== "{}") {
            url = splicingUrl(url, data);
        }
        request({
            url: url,
            method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({data})
        }, function(error : any, response : any, body : any) {
            resolve(JSON.parse(body))
        })
    })
}

const splicingUrl : any = (url : string, data : object) => {
    let newUrl : string = url += '?';
    for (let k in data) {
        newUrl += `&${k}=${data[k]}`;
    }
    return newUrl
};

module.exports = {
    Get: (url: string, data: object) => {
        return requestBody(url, data, 'GET')
    },
    Post: (url: string, data: object) => {
        return requestBody(url, data, 'POST')
    }
};