'use strict';

import { getBitlyUrl } from '../services/bitly.server.service.js';
import { getCache, setCache } from '../services/cache.server.service.js';   
const moment = require('moment');

exports.getBitlyUrl = (req, res) => {
    let cacheBust = req.query.cacheBust;
    delete req.query.cacheBust; 
    let url = req.query.shareUrl;

    if(!url){
        res.json({ error: 'A URL is required!' });
    }else if(process.env.NODE_ENV !== 'production'){
        res.json({ error: 'Bitly urls are not created on local or stage environments to save API calls.' });
    }else{
        getCache(req.originalUrl).then(response => {
            if(cacheBust !== 'true' && response && response.json.url){
                res.json(response.json);
            }else{
                getBitlyUrl(url).then(response => {
                    if(response.data && response.data.url){
                        let formattedResponse = { url: response.data.url };
                        res.json(formattedResponse);
                        setCache(req.originalUrl, formattedResponse);
                    } else {
                        res.json({ error: 'There was an error getting the bitly url' });
                    }
                });
            }
        });
    }
};
