'use strict';

describe('Setting up ProtractorJS', () => {
    it('should have a title', () => {
        browser.get('/');
        expect(browser.getTitle()).toEqual('Cincinnati Calendar - Test Environment');
    });
});