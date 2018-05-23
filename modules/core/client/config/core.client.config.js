(() => {
    'use strict';

    function config(DoubleClickProvider, $qProvider) {
        if(window.innerWidth > 979) {
            DoubleClickProvider.defineSlot('/7103/oh-cincinnati-C1019/poster_front_btf/entertainment/events', [300, 250], 'div-gpt-ad-1473030273967-0')
                .defineSlot('/7103/oh-cincinnati-C1019/poster_front/entertainment/events', [300, 250], 'div-gpt-ad-1473030181891-0');
        } else {
            DoubleClickProvider.defineSlot('/7103/oh-cincinnati-mobile-C1019/mobileweb-section_front_top/entertainment/events', [300, 250], 'div-gpt-ad-1473030352176-0');
        }
        
        $qProvider.errorOnUnhandledRejections(false);
    }

    angular
        .module('core')
        .config(config);
})();
