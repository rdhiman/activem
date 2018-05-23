(() => {
    'use strict';

    describe('dayBreaks Service', () => {
        let globals = {};

        beforeEach(inject((dayBreaksService) => {
            _.assign(globals, {});
            globals.service = dayBreaksService;
            globals.toAPIDateString = (d) => {
                // 2016-08-23T09:40-04:00
                let mo = d.getMonth() + 1;
                let da = d.getDate();
                let ye = d.getFullYear();
                let ho = d.getHours();
                let mi = d.getMinutes();
                return ye+'-'+mo+'-'+da+'T'+ho+':'+mi+'-04:00';
            };
            globals.today = new Date();
            globals.todayString = globals.toAPIDateString(globals.today);
            globals.tomorrow = new Date();
            globals.tomorrow.setDate(globals.tomorrow.getDate() + 1);
            globals.tomorrowString = globals.toAPIDateString(globals.tomorrow);
            globals.future = new Date();
            globals.future.setDate(globals.future.getDate() + 2);
            globals.futureString = globals.toAPIDateString(globals.future);
            globals.futureFutureString = new Date();
            globals.futureFutureString.setDate(globals.futureFutureString.getDate() + 3);
            globals.futureFutureString = globals.toAPIDateString(globals.futureFutureString);
            globals.sampleDataOne = [
                {
                    eventStartDate: globals.todayString
                },
                {
                    eventStartDate: globals.tomorrowString
                },
                {
                    eventStartDate: globals.futureString
                },
                {
                    eventStartDate: globals.futureFutureString
                }
            ];
            globals.sampleDataTwo = [
                {
                    eventStartDate: globals.tomorrowString
                },
                {
                    eventStartDate: globals.futureString
                }
            ];
            globals.sampleDataThree = [
                {
                    eventStartDate: globals.futureString
                }
            ];
        }));
        afterEach(() => {
            globals = {};
        });

        describe('add', () => {
            it('Today should be the first element injected into events array', () => {
                let eventsWithBreaks = globals.service.add(globals.sampleDataOne);
                expect(eventsWithBreaks[0].data).toEqual('Today');
            });
            it('Tomorrow should be the third element injected into events array', () => {
                let eventsWithBreaks = globals.service.add(globals.sampleDataOne);
                expect(eventsWithBreaks[2].data).toEqual('Tomorrow');
            });
            it('Future date should be the fifth element injected into events array', () => {
                let eventsWithBreaks = globals.service.add(globals.sampleDataOne);
                expect(eventsWithBreaks[4].data).not.toContain('Today');
                expect(eventsWithBreaks[4].data).not.toContain('Tomorrow');
            });
            it('Events array should have three breaks injected', () => {
                let eventsWithBreaks = globals.service.add(globals.sampleDataOne);
                expect(eventsWithBreaks.length).toEqual(8);
            });
            it('Tomorrow should be the first element injected into events array', () => {
                let eventsWithBreaks = globals.service.add(globals.sampleDataTwo);
                expect(eventsWithBreaks[0].data).toEqual('Tomorrow');
            });
            it('Future date should be the first element injected into events array', () => {
                let eventsWithBreaks = globals.service.add(globals.sampleDataThree);
                expect(eventsWithBreaks[0].data).not.toContain('Today');
                expect(eventsWithBreaks[0].data).not.toContain('Tomorrow');
            });
        });

    });
})();
