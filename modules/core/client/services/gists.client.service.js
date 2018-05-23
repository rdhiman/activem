(() => {
    'use strict';

    class GistsService {
        constructor($http) {
            _.merge(this, { $http });

            this.url = 'api/bitly';
        }

        updateGist(noteObject) {
            console.log(noteObject);
            this.$http.post(
                'https://api.github.com/gists/',
                {
                    'description': 'POSTING FROM EXPRESS',
                    'public': true,
                    'files': {
                            'file1.txt': {
                            'content': 'EXPRESS'
                        }
                    }
                }
            )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) { 
                console.log(error);
            });
        }

        getGists() {
            return this.$http.get('https://api.github.com/gists/public').then((response) => response.data);
        }
    }

    angular
        .module('core')
        .service('GistsService', GistsService);

})();
