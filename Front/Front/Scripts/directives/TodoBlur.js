/// <reference path='../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var ModuleTest = (function () {
        function ModuleTest() {
            var directive = {};
            directive.priority = 0;
            directive.restrict = "E";
            directive.scope = {
                comment: "="
            };
            directive.transclude = true;
            directive.templateUrl = "otherTemplate.html";
            directive.replace = true;
            directive.controller = C_ModuleTest;
            directive.replace = true;
            return directive;
        }
        ModuleTest.$inject = [];
        return ModuleTest;
    })();
    JudoShirt.ModuleTest = ModuleTest;
    var C_ModuleTest = (function () {
        function C_ModuleTest($scope, todoStorage, filterFilter) {
            this.$scope = $scope;
            this.todoStorage = todoStorage;
            this.filterFilter = filterFilter;
            this.todos = $scope.todos = todoStorage.get();
            $scope.newTodo = '';
            $scope.editedTodo = null;
            $scope.vm = this;
        }
        C_ModuleTest.prototype.onPath = function (path) {
            this.$scope.statusFilter = (path === '/active') ?
                { completed: false } : (path === '/completed') ?
                { completed: true } : null;
        };
        C_ModuleTest.prototype.onTodos = function () {
            this.$scope.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
            this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
            this.$scope.allChecked = !this.$scope.remainingCount;
            this.todoStorage.put(this.todos);
        };
        C_ModuleTest.prototype.addTodo = function () {
            var newTodo = this.$scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }
            this.todos.push(new JudoShirt.TodoItem(newTodo, false));
            this.$scope.newTodo = '';
        };
        C_ModuleTest.prototype.editTodo = function (todoItem) {
            this.$scope.editedTodo = todoItem;
        };
        C_ModuleTest.prototype.doneEditing = function (todoItem) {
            this.$scope.editedTodo = null;
            todoItem.title = todoItem.title.trim();
            if (!todoItem.title) {
                this.removeTodo(todoItem);
            }
        };
        C_ModuleTest.prototype.removeTodo = function (todoItem) {
            this.todos.splice(this.todos.indexOf(todoItem), 1);
        };
        C_ModuleTest.prototype.clearDoneTodos = function () {
            this.$scope.todos = this.todos = this.todos.filter(function (todoItem) { return !todoItem.completed; });
        };
        C_ModuleTest.prototype.markAll = function (completed) {
            this.todos.forEach(function (todoItem) { todoItem.completed = completed; });
        };
        C_ModuleTest.$inject = [
            '$scope',
            '$location',
            'todoStorage',
            'filterFilter'
        ];
        return C_ModuleTest;
    })();
    JudoShirt.C_ModuleTest = C_ModuleTest;
})(JudoShirt || (JudoShirt = {}));
