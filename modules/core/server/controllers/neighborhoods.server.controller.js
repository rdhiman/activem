'use strict';

import { getNeighborhoods } from '../services/neighborhoods.server.service';
import { setCache, getCache } from '../services/cache.server.service';
const moment = require('moment');
const cacheTimeInMinutes = 60 * 24;

exports.getNeighborhoods = (req, res) => {
    let cacheBust = req.query.cacheBust;
    delete req.query.cacheBust; 
    
    getCache(req.originalUrl).then(response => {
        if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))){
            res.json(response.json);
        }else{
            getNeighborhoods().then(response => {
                res.json(response);
                setCache(req.originalUrl, response);
            });
        }
    });

};
