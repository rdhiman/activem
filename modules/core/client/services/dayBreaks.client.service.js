(() => {
    'use strict';

    class dayBreaksService {
        constructor(daysOfTheWeek, months) {
            _.assign(this, { daysOfTheWeek, months });
        }

        add(eventsArray) {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            let eventsWithBreaks = [];

            _.forEach(eventsArray,(event, index) => {
                let breakObj = { type:'break', data: '' };
                let eventObj = { type: 'event', data: event };

                let currentEventDate = new Date(event.eventStartDate);
                
                if (index === 0) {
                    if (today.getDate() === currentEventDate.getDate()) {
                        breakObj.data = 'Today';
                        eventsWithBreaks.push(breakObj);
                    } else {
                        if (tomorrow.getDate() === currentEventDate.getDate()) {
                            breakObj.data = 'Tomorrow';
                            eventsWithBreaks.push(breakObj);
                        } else {
                            breakObj.data = this.daysOfTheWeek[currentEventDate.getDay()] + ', ' +
                                        this.months[currentEventDate.getMonth()] + ' ' +
                                        currentEventDate.getDate();
                            eventsWithBreaks.push(breakObj);
                        }
                    }
                } else {
                    let previousEventDate = new Date(eventsArray[(index - 1)].eventStartDate);
                    
                    if (previousEventDate.getDate() < currentEventDate.getDate() ||
                        (previousEventDate.getDate() > currentEventDate.getDate() &&
                        previousEventDate.getMonth() < currentEventDate.getMonth())) {
                        
                        if (tomorrow.getDate() === currentEventDate.getDate()) {
                            breakObj.data = 'Tomorrow';
                            eventsWithBreaks.push(breakObj);
                        } else {
                            breakObj.data = this.daysOfTheWeek[currentEventDate.getDay()] + ', ' +
                                        this.months[currentEventDate.getMonth()] + ' ' +
                                        currentEventDate.getDate();
                            eventsWithBreaks.push(breakObj);
                        }
                    }
                }
                eventsWithBreaks.push(eventObj);
            });
            return eventsWithBreaks;
        }
    }

    angular
        .module('core')
        .service('dayBreaksService', dayBreaksService);

})();
