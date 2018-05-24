(() => {
    'use strict';

    class GistsController {
        constructor($stateParams, $state, GistsService, $window, locaNotesData) {
            _.assign(this, { $stateParams, $state, GistsService, $window });
            this.notepadTitle = locaNotesData.notepadTitle;
            this.notes = locaNotesData.notes;
        }


        addGist() {
            this.notes.push(
                {
                    noteTitle: this.noteTitle,
                    noteText: this.noteText
                }
            );
            this.noteTitle = '';
            this.noteText = '';
        }

        viewStats() {
            this.$state.go('statsView');
        }

        saveGist() {
            let noteObject = {};
            noteObject.notepadTitle = this.notepadTitle;
            noteObject.noteTitle = this.noteTitle;
            noteObject.noteText = this.noteText;
            this.GistsService.saveNoteLocally(this.notepadTitle, this.notes);
        }

        deleteNotes() {
            this.$state.go('.', this.$state.params, { reload: true });
        }
    }

    angular
        .module('core')
        .controller('GistsController', GistsController);

})();
