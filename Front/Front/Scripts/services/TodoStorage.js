/// <reference path='../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var TodoStorage = (function () {
        function TodoStorage() {
            this.STORAGE_ID = 'todos-angularjs-typescript';
        }
        TodoStorage.prototype.get = function () {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        };
        TodoStorage.prototype.put = function (todos) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        };
        return TodoStorage;
    })();
    JudoShirt.TodoStorage = TodoStorage;
})(JudoShirt || (JudoShirt = {}));
