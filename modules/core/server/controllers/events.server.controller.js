'use strict';

import { getEvents, getProduction, getProductionDates, getPresenter, getVenue, getCategories } from '../services/events.server.service';
import { getWeekendEvents } from '../services/cincinnatiusa.server.service';
import { setCache, getCache } from '../services/cache.server.service';
const moment = require('moment');
const cacheTimeInMinutes = 15;

exports.getEvents = (req, res) => {
    let params = req.query;
    let cacheBust = req.query.cacheBust;
    delete req.query.cacheBust; 
    
    getCache(req.originalUrl).then(response => {
        if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))){
            res.json(response.json);
        }else{
            getEvents(params).then(response => {
                res.json(response);
                setCache(req.originalUrl, response);
            });
        }
    });
};

exports.getProduction = (req, res) => {
    let id = req.query.id;
    let cacheBust = req.query.cacheBust;
    delete req.query.cacheBust;

    if(id){
        getCache(req.originalUrl).then(response => {
            if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))){
                res.json(response.json);
            }else{
                getProduction(id, req.query).then(response => {
                    res.json(response);
                    setCache(req.originalUrl, response);
                });
            }
        });
    }else{
        res.json({ error: 'id required!' });
    }
};

exports.getProductionDates = (req, res) => {
    let id = req.query.id;
    let params = req.query;
    let cacheBust = req.query.cacheBust;
    delete req.query.cacheBust;
    delete params.id;

    if(id){
        getCache(req.originalUrl).then(response => {
            if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))){
                res.json(response.json);
            }else{
                getProductionDates(id, params).then(response => {
                    res.json(response);
                    setCache(req.originalUrl, response);
                });
            }
        });
    }else{
        res.json({ error: 'id required!' });
    }
};

exports.getPresenter = (req, res) => {
    let id = req.query.id;
    let params = req.query;
    let cacheBust = req.query.cacheBust;
    delete req.query.cacheBust;
    delete params.id;

    if(id){
        getCache(req.originalUrl).then(response => {
            if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))){
                res.json(response.json);
            }else{
                getPresenter(id, params).then(response => {
                    res.json(response);
                    setCache(req.originalUrl, response);
                });
            }
        });
    }else{
        res.json({ error: 'id required!' });
    }

};

exports.getVenue = (req, res) => {
    let id = req.query.id;
    let params = req.query;
    let cacheBust = req.query.cacheBust;
    delete req.query.cacheBust;
    delete params.id;

    if(id){
        getCache(req.originalUrl).then(response => {
            if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))){
                res.json(response.json);
            }else{
                getVenue(id, params).then(response => {
                    res.json(response);
                    setCache(req.originalUrl, response);
                });
            }
        });
    }else{
        res.json({ error: 'id required!' });
    }
};

exports.getWeekendEvents = (req, res) => {
    let cacheBust = req.query.cacheBust;

    getCache(req.originalUrl).then(response => {
        if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(1, 'days'))){
            res.json(response.json);
        }else{
            getWeekendEvents().then(response => {
                res.json(response);
                setCache(req.originalUrl, response);
            });
        }
    });    
};

exports.getCategories = (req, res) => {
    let cacheBust = req.query.cacheBust;

    getCache(req.originalUrl).then(response => {
        if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))){
            res.json(response.json);
        } else {
            getCategories().then(response => {
                res.json(response);
                setCache(req.originalUrl, response);
            });
        }
    });
};

