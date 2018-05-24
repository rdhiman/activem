(() => {
    'use strict';

    class GistsController {
        constructor($stateParams, $state, GistsService, $window, locaNotesData) {
            _.assign(this, { $stateParams, $state, GistsService, $window, locaNotesData });
            this.notepadTitlePlaceHolder = locaNotesData.notepadTitle || 'My notepad title...';
            this.notepadTitle = locaNotesData.notepadTitle ? locaNotesData.notepadTitle : 'My notepad title...';
            this.notes = locaNotesData.notes || [];
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
            this.GistsService.deleteLocalNotes();
            this.$state.go('.', this.$state.params, { reload: true });
        }
    }

    angular
        .module('core')
        .controller('GistsController', GistsController);

})();
