(() => {
    'use strict';

    class GistsService {
        constructor($http, $window) {
            _.merge(this, { $http, $window });
            this.localStorageClientId = 'activemLocalStorage';
        }

        updateGist(noteObject) {
            var req = {
                method: 'POST',
                url: 'https://api.github.com/gists',
                headers: {
                    'Content-Type': undefined
                },
                data: {
                    'description': 'POSTING FROM EXPRESS',
                    'public': true,
                    'files': {
                        'file1.txt': {
                            'content': 'EXPRESS'
                        }
                    }
                }
            };

            this.$http(req).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }

        getGists() {
            return this.$http.get('https://api.github.com/gists/public').then((response) => response.data);
        }

        saveNoteLocally(notepadTitle, notesObject) {
            let localNoteObject = {};
            localNoteObject.notepadTitle = notepadTitle;
            localNoteObject.notes = notesObject;
            this.$window.localStorage.setItem(this.localStorageClientId, JSON.stringify(localNoteObject));
        }

        getLocalNotes() {
            let localStorageData = this.$window.localStorage.getItem(this.localStorageClientId);
            if (localStorageData !== null) {
                return JSON.parse(this.$window.localStorage.getItem(this.localStorageClientId));
            } else {
                return {};
            }
        }

        deleteLocalNotes() {
            this.$window.localStorage.removeItem(this.localStorageClientId);
        }
    }

    angular
        .module('core')
        .service('GistsService', GistsService);

})();
