var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var Home = (function () {
        function Home($scope, todoStorage, filterFilter) {
            this.$scope = $scope;
            this.todoStorage = todoStorage;
            this.filterFilter = filterFilter;
            this.todos = $scope.todos = todoStorage.get();
            $scope.newTodo = '';
            $scope.editedTodo = null;
            $scope.vm = this;
        }
        Home.prototype.onPath = function (path) {
            this.$scope.statusFilter = (path === '/active') ?
                { completed: false } : (path === '/completed') ?
                { completed: true } : null;
        };
        Home.prototype.onTodos = function () {
            this.$scope.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
            this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
            this.$scope.allChecked = !this.$scope.remainingCount;
            this.todoStorage.put(this.todos);
        };
        Home.prototype.addTodo = function () {
            var newTodo = this.$scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }
            this.todos.push(new JudoShirt.TodoItem(newTodo, false));
            this.$scope.newTodo = '';
        };
        Home.prototype.editTodo = function (todoItem) {
            this.$scope.editedTodo = todoItem;
        };
        Home.prototype.doneEditing = function (todoItem) {
            this.$scope.editedTodo = null;
            todoItem.title = todoItem.title.trim();
            if (!todoItem.title) {
                this.removeTodo(todoItem);
            }
        };
        Home.prototype.removeTodo = function (todoItem) {
            this.todos.splice(this.todos.indexOf(todoItem), 1);
        };
        Home.prototype.clearDoneTodos = function () {
            this.$scope.todos = this.todos = this.todos.filter(function (todoItem) { return !todoItem.completed; });
        };
        Home.prototype.markAll = function (completed) {
            this.todos.forEach(function (todoItem) { todoItem.completed = completed; });
        };
        Home.$inject = [
            '$scope',
            '$location',
            'todoStorage',
            'filterFilter'
        ];
        return Home;
    })();
    JudoShirt.Home = Home;
})(JudoShirt || (JudoShirt = {}));
