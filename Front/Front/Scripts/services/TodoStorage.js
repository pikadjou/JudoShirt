/// <reference path='../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var CategoriesRequestHandler = (function () {
        function CategoriesRequestHandler() {
        }
        CategoriesRequestHandler.Name = "CategoriesRequestHandler";
        return CategoriesRequestHandler;
    })();
    JudoShirt.CategoriesRequestHandler = CategoriesRequestHandler;
    JudoShirt.JudoShirtApp.JudoShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
})(JudoShirt || (JudoShirt = {}));
