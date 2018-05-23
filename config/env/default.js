'use strict';

module.exports = {
    app: {
        title: 'Cincinnati Calendar',
        description: 'No matter what you like – music, art, theater, gardening, beer, craft shows – we have it all listed for you.',
        domain: '',
        keywords: '',
        googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
    },
    db: process.env.MONGO_URI || 'mongodb://localhost:27017/cincy-cal-dev',
    port: process.env.PORT || 3000,
    staticMaxAge: 0,
    templateEngine: 'swig',
    // Session Cookie settings
    sessionCookie: {
        maxAge: 24 * (60 * 60 * 1000), // 24 hours
        httpOnly: true
    },
    // sessionSecret should be changed for security measures and concerns
    sessionSecret: process.env.SESSION_SECRET || 'cinCyc@1',
    // sessionKey is set to the generic sessionId key used by PHP applications
    // for obsecurity reasons
    sessionKey: 'sessionId',
    sessionCollection: 'sessions',
    feedback: {
        email: ''
    },
    facebook: {
        clientID: '157995810912644'
    }
};