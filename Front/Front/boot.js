var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var LauchApplication = (function () {
        function LauchApplication() {
        }
        LauchApplication.Launch = function () {
            var scripts = ["/lib/lib", "/scripts/tools/tools", "/scripts/services/Services", "/scripts/app/App"];
            var url = "";
            for (var i = 0, l = scripts.length; i < l; i++) {
                url = scripts[i];
                if (MartialShirt.Config.Minification === true) {
                    url += ".min";
                }
                var s = document.createElement("script");
                s.type = "text/JavaScript";
                s.src = url + ".js?v=" + MartialShirt.Config.versionning;
                s.async = false;
                var head = document.head || document.getElementsByTagName("head")[0];
                head.appendChild(s);
            }
            var libs = ["//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js",
            ];
            for (var i = 0, l = libs.length; i < l; i++) {
                var s = document.createElement("script");
                s.type = "text/JavaScript";
                s.src = libs[i];
                s.async = false;
                var head = document.head || document.getElementsByTagName("head")[0];
                head.appendChild(s);
            }
        };
        LauchApplication.addDynamicScript = function (url) {
            var s = document.createElement("script");
            s.type = "text/JavaScript";
            s.src = url;
            s.async = false;
            var head = document.head || document.getElementsByTagName("head")[0];
            head.appendChild(s);
        };
        return LauchApplication;
    }());
    MartialShirt.LauchApplication = LauchApplication;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var version = xhttp.responseText;
            var s = document.createElement("script");
            s.type = "text/JavaScript";
            s.src = "/config.min.js?v=" + version;
            s.async = false;
            s.onload = function () {
                MartialShirt.Config.versionning = version;
                var xhr = new XMLHttpRequest();
                xhr.open("GET", MartialShirt.Config.UrlApi + "cms/getRoutes.json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status == 200) {
                            window.routesResponse = JSON.parse(xhr.responseText).Content;
                            MartialShirt.Config.update(window.routesResponse.configs);
                            console.log(MartialShirt.Config.Maintenance);
                            if (MartialShirt.Config.Maintenance) {
                                var indexMaintenance = window.location.href.indexOf("/maintenance");
                                if (indexMaintenance === -1) {
                                    window.location.href = '/maintenance.html';
                                    return;
                                }
                            }
                            LauchApplication.Launch();
                        }
                        else {
                            return;
                        }
                    }
                };
                xhr.send();
            };
            var head = document.head || document.getElementsByTagName("head")[0];
            head.appendChild(s);
        }
    };
    xhttp.open("GET", "/commit.txt", true);
    xhttp.send();
})(MartialShirt || (MartialShirt = {}));
