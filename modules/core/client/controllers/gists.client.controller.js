(() => {
    'use strict';

    class GistsController {
        constructor($stateParams, $state, GistsService, $window) {
            _.assign(this, { $stateParams, $state, GistsService, $window });
            this.notePadTitle = 'Rohits notepad';
            this.notes = [
                {
                    noteTitle: '1',
                    noteText: 'textarea 1'
                }
            ];
        }


        addGist() {
            this.notes.push(
                {
                    noteTitle: this.noteTitle,
                    noteText: this.noteText
                }
            );
            
        }

        viewStats() {
            console.log('view stats called');
            this.$state.go('statsView');
        }

        saveGist() {
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
