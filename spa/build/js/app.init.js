/**
 * Created by Wong on 2014/11/13.
 */

(function (D, W, $) {

    function initInfo() {

        if (location.hash && location.hash !== '#'+APP_CONFIG.initPage) {
            var hash = location.hash.replace('#', '')
            APP_COMMON.loadModule(APP_COMMON.template[hash]);
        } else {
            location.hash = APP_CONFIG.initPage;
            APP_COMMON.loadModule(APP_COMMON.template[APP_CONFIG.initPage]);
        }
    }

    APP_COMMON.appInit(APP_CONFIG.viewResource,initInfo);

})(document, window, $);
