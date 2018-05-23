(() => {
    'use strict';

    describe('clearInput directive', () => {
        let globals = {};

        const templateStr = '<div><input type="text" ng-model="myModel" clear-input-change="onChangeFunc" clear-input></div>';

        beforeEach(inject(($compile, $rootScope) => {
            _.assign(globals, { $compile });
            globals.scope = $rootScope.$new();
            globals.scope.myModel = 'abc';
            globals.scope.onChangeFunc = () => 1;
        }));

        afterEach(() => {
            globals.scope.$destroy();
            globals = {};
        });

        it('should have "text" and "change" on scope', () => {
            let element = globals.$compile(templateStr)(globals.scope);
            globals.scope.$digest();

            let btnScope = element.find('span').scope();

            expect(btnScope.text).toEqual('abc');
            expect(btnScope.change()).toEqual(globals.scope.onChangeFunc);
        });
        it('should reset text to empty string', () => {
            let element = globals.$compile(templateStr)(globals.scope);
            globals.scope.$digest();

            let btnScope = element.find('span').scope();
            btnScope.reset();

            expect(btnScope.text).toEqual('');
        });
    });
})();