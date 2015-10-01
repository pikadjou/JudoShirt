///#source 1 1 /scripts/app/container/header.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Header = (function () {
            function C_Header($scope) {
                this.$scope = $scope;
                $scope.vm = $scope;
            }
            C_Header.$inject = [
                '$scope'
            ];
            return C_Header;
        })();
        Container.C_Header = C_Header;
        var Header = (function () {
            function Header() {
                this.templateUrl = "scripts/app/container/header.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_Header;
            }
            Header.Name = "headercontainer".toLocaleLowerCase();
            Header.$inject = [];
            return Header;
        })();
        Container.Header = Header;
        JudoShirt.JudoShirtApp.JudoShirtApp.directive(Header.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Header));
    })(Container = JudoShirt.Container || (JudoShirt.Container = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/CategoriesList.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_CategoriesList = (function () {
        function C_CategoriesList($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetCategories("");
            this.RH.GetCategoriesReceived.add(this.onPacketRecieved, this);
        }
        C_CategoriesList.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.list = response.categories;
        };
        C_CategoriesList.$inject = [
            '$scope',
            JudoShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_CategoriesList;
    })();
    JudoShirt.C_CategoriesList = C_CategoriesList;
    var CategoriesList = (function () {
        function CategoriesList() {
            this.templateUrl = "scripts/app/modules/CategoriesList.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_CategoriesList;
        }
        CategoriesList.Name = "CategoriesList".toLocaleLowerCase();
        CategoriesList.$inject = [];
        return CategoriesList;
    })();
    JudoShirt.CategoriesList = CategoriesList;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(CategoriesList.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(CategoriesList));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/home.js
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

///#source 1 1 /scripts/app/widgets/topTen.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetTopTen = (function () {
        function C_WidgetTopTen($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetDesigns("");
            this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);
        }
        C_WidgetTopTen.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetTopTen.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetTopTen;
    })();
    JudoShirt.C_WidgetTopTen = C_WidgetTopTen;
    var WidgetTopTen = (function () {
        function WidgetTopTen() {
            this.templateUrl = "scripts/app/widgets/topTen.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetTopTen;
        }
        WidgetTopTen.Name = "WidgetTopTen".toLocaleLowerCase();
        WidgetTopTen.$inject = [];
        return WidgetTopTen;
    })();
    JudoShirt.WidgetTopTen = WidgetTopTen;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetTopTen.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetTopTen));
})(JudoShirt || (JudoShirt = {}));

