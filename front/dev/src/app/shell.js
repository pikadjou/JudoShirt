var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var MartialShirtApp = (function () {
        function MartialShirtApp() {
        }
        MartialShirtApp.init = function () {
            MartialShirtApp.Application.setRoutes(window.routesResponse.pages);
            MartialShirt.Init.Application.MartialShirtApp.config([
                '$routeProvider',
                '$locationProvider',
                function ($routeProvider, $locationProvider) {
                    var cmsPages = MartialShirtApp.Application.getRoutes();
                    for (var i = 0, l = cmsPages.length, page = null; i < l; i++) {
                        page = cmsPages[i];
                        $routeProvider
                            .when(page.url, {
                            templateUrl: '/scripts/app/pages/' + page.view,
                            controller: page.controller
                        });
                    }
                    $routeProvider.otherwise({ redirectTo: '/' });
                    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    }).hashPrefix('!');
                }
            ]);
            MartialShirt.Init.Application.MartialShirtApp.run([
                '$rootScope',
                function ($rootScope) {
                    $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
                        MartialShirt.Controller.GTM.getInstance().LocationChange(location.pathname);
                    });
                }
            ]);
        };
        MartialShirtApp.Application = MartialShirt.Init.Application.getInstance();
        return MartialShirtApp;
    }());
    MartialShirt.MartialShirtApp = MartialShirtApp;
    MartialShirtApp.init();
})(MartialShirt || (MartialShirt = {}));
