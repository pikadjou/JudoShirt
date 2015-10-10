﻿///#source 1 1 /scripts/app/container/header.js
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

///#source 1 1 /scripts/app/container/footer.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Footer = (function () {
            function C_Footer($scope) {
                this.$scope = $scope;
                $scope.vm = $scope;
            }
            C_Footer.$inject = [
                '$scope'
            ];
            return C_Footer;
        })();
        Container.C_Footer = C_Footer;
        var Footer = (function () {
            function Footer() {
                this.templateUrl = "scripts/app/container/footer.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_Footer;
            }
            Footer.Name = "FooterContainer".toLocaleLowerCase();
            Footer.$inject = [];
            return Footer;
        })();
        Container.Footer = Footer;
        JudoShirt.JudoShirtApp.JudoShirtApp.directive(Footer.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Footer));
    })(Container = JudoShirt.Container || (JudoShirt.Container = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/MenuMain.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_MenuMain = (function () {
        function C_MenuMain($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetCategories("");
            this.RH.GetCategoriesReceived.add(this.onPacketRecieved, this);
        }
        C_MenuMain.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.list = response.categories;
            this.$scope.vm.cssClass = "small-block-grid-" + response.categories.length;
        };
        C_MenuMain.$inject = [
            '$scope',
            JudoShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_MenuMain;
    })();
    JudoShirt.C_MenuMain = C_MenuMain;
    var MenuMain = (function () {
        function MenuMain() {
            this.templateUrl = "scripts/app/modules/menuMain.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_MenuMain;
        }
        MenuMain.Name = "MenuMain".toLocaleLowerCase();
        MenuMain.$inject = [];
        return MenuMain;
    })();
    JudoShirt.MenuMain = MenuMain;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(MenuMain.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(MenuMain));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/featuredDesigns.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_FeaturedDesigns = (function () {
        function C_FeaturedDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetFeaturedDesigns([]);
        }
        C_FeaturedDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_FeaturedDesigns.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_FeaturedDesigns;
    })();
    JudoShirt.C_FeaturedDesigns = C_FeaturedDesigns;
    var FeaturedDesigns = (function () {
        function FeaturedDesigns() {
            this.templateUrl = "scripts/app/modules/featuredDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_FeaturedDesigns;
        }
        FeaturedDesigns.Name = "FeaturedDesigns".toLocaleLowerCase();
        FeaturedDesigns.$inject = [];
        return FeaturedDesigns;
    })();
    JudoShirt.FeaturedDesigns = FeaturedDesigns;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(FeaturedDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(FeaturedDesigns));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/langSelector.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_LangSelector = (function () {
        function C_LangSelector($scope) {
            this.$scope = $scope;
            $scope.vm = $scope;
        }
        C_LangSelector.$inject = [
            '$scope',
            JudoShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_LangSelector;
    })();
    JudoShirt.C_LangSelector = C_LangSelector;
    var LangSelector = (function () {
        function LangSelector() {
            this.templateUrl = "scripts/app/modules/langSelector.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_LangSelector;
        }
        LangSelector.Name = "LangSelector".toLocaleLowerCase();
        LangSelector.$inject = [];
        return LangSelector;
    })();
    JudoShirt.LangSelector = LangSelector;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(LangSelector.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(LangSelector));
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
            this.RH.GetTopDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetTopDesigns([2]);
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

///#source 1 1 /scripts/app/widgets/new.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetNew = (function () {
        function C_WidgetNew($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetNewDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetNewDesigns([5]);
        }
        C_WidgetNew.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetNew.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetNew;
    })();
    JudoShirt.C_WidgetNew = C_WidgetNew;
    var WidgetNew = (function () {
        function WidgetNew() {
            this.templateUrl = "scripts/app/widgets/new.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetNew;
        }
        WidgetNew.Name = "WidgetNew".toLocaleLowerCase();
        WidgetNew.$inject = [];
        return WidgetNew;
    })();
    JudoShirt.WidgetNew = WidgetNew;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetNew.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetNew));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/widgets/promotionDesigns.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetPromotionDesigns = (function () {
        function C_WidgetPromotionDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetPromoDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetPromoDesigns([5]);
        }
        C_WidgetPromotionDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetPromotionDesigns.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetPromotionDesigns;
    })();
    JudoShirt.C_WidgetPromotionDesigns = C_WidgetPromotionDesigns;
    var WidgetPromotionDesigns = (function () {
        function WidgetPromotionDesigns() {
            this.templateUrl = "scripts/app/widgets/promotionDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetPromotionDesigns;
        }
        WidgetPromotionDesigns.Name = "WidgetPromotionDesigns".toLocaleLowerCase();
        WidgetPromotionDesigns.$inject = [];
        return WidgetPromotionDesigns;
    })();
    JudoShirt.WidgetPromotionDesigns = WidgetPromotionDesigns;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetPromotionDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetPromotionDesigns));
})(JudoShirt || (JudoShirt = {}));

