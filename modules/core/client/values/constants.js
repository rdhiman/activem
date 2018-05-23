(() => {
    'use strict';

    angular
        .module('core')
        .constant('eventCategories', [
            { SuperCatID: 16, SuperCat: 'Attractions', Categories: [] },
            { SuperCatID: 10, SuperCat: 'Business', Categories: [] },
            { SuperCatID: 13, SuperCat: 'Dining', Categories: [] },
            { SuperCatID: 9, SuperCat: 'Education', Categories: [] },
            { SuperCatID: 3, SuperCat: 'Entertainment', Categories: [] },
            { SuperCatID: 'family', SuperCat: 'Family Friendly', Categories: [] },
            { SuperCatID: 'free', SuperCat: 'Free', Categories: [] },
            { SuperCatID: 6, SuperCat: 'Government & Community', Categories: [] },
            { SuperCatID: 8, SuperCat: 'Holiday', Categories: [] },
            { SuperCatID: 5, SuperCat: 'Home & Garden', Categories: [] },
            { SuperCatID: 11, SuperCat: 'Literary', Categories: [] },
            { SuperCatID: 18, SuperCat: 'Music', Categories: [] },
            { SuperCatID: 12, SuperCat: 'Out of Town', Categories: [] },
            { SuperCatID: 7, SuperCat: 'Religious', Categories: [] },
            { SuperCatID: 1, SuperCat: 'Schools', Categories: [] },
            { SuperCatID: 4, SuperCat: 'Sports & Recreation', Categories: [] },
            { SuperCatID: 14, SuperCat: 'Summer Camps', Categories: [] },
            { SuperCatID: 15, SuperCat: 'Tourism', Categories: [] },
            { SuperCatID: 2, SuperCat: 'Visual Arts', Categories: [] }
        ])
        .constant('daysOfTheWeek',['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'])
        .constant('months',['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
        .constant('googleMapsAPIKey','AIzaSyDKJ0zEBIUr8vSG0gcr8U_G5OMnPfcuxdQ');
})();