(() => {
    'use strict';

    class GistsController {
        constructor($stateParams, $state, GistsService, $window) {
            _.assign(this, { $stateParams, $state, GistsService, $window });
            console.log('controller ran');
        }


        addGist() {

            console.log(this.notepadTitle);
            let noteObject = {};
            noteObject.notepadTitle = this.notepadTitle;
            noteObject.noteTitle = this.noteTitle;
            noteObject.noteText = this.noteText;
            this.GistsService.updateGist(noteObject);
        }
    }

    angular
        .module('core')
        .controller('GistsController', GistsController);

})();
