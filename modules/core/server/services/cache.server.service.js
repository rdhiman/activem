'use strict';

const mongoose = require('mongoose');
const statusService = require('./status.server.service');
mongoose.Promise = require('bluebird');
const ResponseSchema = mongoose.Schema({
    url: String,
    json: { type: Object },
    date: { type: Date, default: Date.now }
});
const ResponseModel = mongoose.model('ResponseModel', ResponseSchema);

export function setCache(url, json) {
    let mongoStatus = statusService.getMongoStatus();
    let promise = ResponseModel.find({ url: url }).exec();

    if(mongoStatus === 'ok'){
        return promise.then((urlExists) => {
            if(urlExists.length === 0) {
                const Response = new ResponseModel({ url: url, json: json });
                return Response.save();
            } else {
                urlExists[0].json = json;
                urlExists[0].date = Date.now();
                return urlExists[0].save();
            }
        })
        .catch((err) => {
            console.log('error:', err);
        });
    } else {
        return new Promise(resolve => {
            resolve(false);
        });
    }
}

export function getCache(url) {
    let mongoStatus = statusService.getMongoStatus();
    let promise = ResponseModel.find({ url: url }).exec();

    if(mongoStatus === 'ok'){
        return promise.then((urlExists) => {
            if(urlExists.length > 0) {
                return urlExists[0];
            } else {
                return false;
            }
        })
        .catch((err) => {
            console.log('error:', err);
        });
    } else {
        console.log('mongo isn\'t avalible, skipping caching');
        return new Promise((resolve, reject) => {
            resolve(false);
        });
    }
}
