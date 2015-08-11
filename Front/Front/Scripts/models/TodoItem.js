/// <reference path='../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var TodoItem = (function () {
        function TodoItem(title, completed) {
            this.title = title;
            this.completed = completed;
        }
        return TodoItem;
    })();
    JudoShirt.TodoItem = TodoItem;
})(JudoShirt || (JudoShirt = {}));
