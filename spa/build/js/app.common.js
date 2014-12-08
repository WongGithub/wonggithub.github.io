/**
 * Created by Wong on 2014/11/13.
 */

(function (D, W, $, COMMON) {
    var ConfigModule = APP_CONFIG.module;
    COMMON.template = {};
    COMMON.errorLog = [];
    //初始化模块
    COMMON.appInit = function (rec, success) {
        var container = $('[spa-container]');

        //为容器添加动画属性
        TOOLKIT.setTransition(container[0], 'all', ConfigModule.moduleLoadAnimateTime);
        container.css({ opacity: 1 });

        //加载初始资源
        var _rec = (rec.constructor === Array ?
                       rec.length > 0 ? rec : false
                           : false);
        if (!_rec) {
            alert('资源文件未配置');
        }
        else {

            var i = 0,
                len = _rec.length,
                loadSucc = 0,
                loadErr = 0,
                getTemplate = function (resource) {
                    var url = resource.temp;
                    $.ajax({
                        url: url,
                        datatype: 'html',
                        success: function (data) {
                            COMMON.template[resource.view] = data;
                            loadSucc++;
                            if (loadSucc === len) {
                                //绑定hash事件
                                $(W).on('hashchange', function () {
                                    var hash = location.hash.replace('#', '');
                                    COMMON.loadModule(COMMON.template[hash]);
                                });
                                //执行成功回调
                                if (success) success();
                            }
                        },
                        error: function (err) {
                            if (loadErr < 5) {
                                var date = new Date(),
                                    year = date.getFullYear(),
                                    month = date.getMonth() + 1,
                                    day = date.getDate(),
                                    hour = date.getHours(),
                                    min = date.getMinutes(),
                                    sec = date.getSeconds();
                                getTemplate(resource);
                                loadErr++;
                                COMMON.errorLog.push({
                                    name: 'ajax',
                                    err: err,
                                    time: year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
                                })
                            }
                            else {
                                alert('您的网络似乎有问题，资源加载失败');
                            }
                        }
                    });
                };
            for (; i < len; i++) {
                getTemplate(_rec[i]);
            }
        }

    };

    //模版加载
    COMMON.loadModule = function (view, controlFun, param) {
        var container = $('[spa-container]');
        container.css({ opacity: 0 });
        setTimeout(function () {
            container.html(view);
            container.css({ opacity: 1 });
            if (controlFun) controlFun(param);
        }, ConfigModule.moduleLoadAnimateTime * 1000);

    };

})(document, window, $, window.APP_COMMON || (window.APP_COMMON = {}));
