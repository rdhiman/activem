'use strict';

import { verify } from '../services/recaptcha.server.service';
import { send } from '../services/email.server.service';

exports.processForm = (req, res) => {
    let params = req.query;
    verify({ response: params.gRecaptchaResponse }).then(response => {
        if (response.success) {
            send(params).then(() => {
                res.json({ success: true });
            }).catch(() => {
                res.json({ success: false });
            });
        } else {
            res.json({ success: false });
        }
    });
};