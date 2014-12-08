/**
 * Created by wong on 14-11-14.
 */

(function (D, W, CONFIG) {

    var timestamp = '';//'?_t='+201411271527 时间戳


    //模板配置
    CONFIG.viewResource = [
        {
            view: 'view1',
            temp: 'template/view1.html' + timestamp
        },
        {
            view: 'view2',
            temp: 'template/view2.html' + timestamp
        }
    ]

    //模块参数定义
    CONFIG.module = {
        moduleLoadAnimateTime: 0.1 //模块过度动画时间设置
    }

    //初始化时默认启动页
    CONFIG.initPage = 'view1';

})(document, window, window.APP_CONFIG || (window.APP_CONFIG = {}));
