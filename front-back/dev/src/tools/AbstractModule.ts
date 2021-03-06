﻿module MartialShirt.Init {
    'use strict';

	export class AbstractModule {

		public _guid = "";
		public _view: HTMLElement;
		public _jview: JQuery;
		public _sce = null;
		public _signal = MartialShirt.Init.Signals.getInstance();
		public _application = MartialShirt.Init.Application.getInstance();
		public _login = MartialShirt.Services.Login.getInstance();
		public CoreLib = CoreLib;

		public loader = false;

		public isAuthenticated = false;
		constructor() {

			if (this._login.isAuthenticated()) {
				this.Authenticated();
			}
			this._login.authenticatedSignal.add(this.Authenticated, this);
			this._login.unauthenticatedSignal.add(this.Unauthenticated, this);

			this._guid = MartialShirt.Init.Application.NewGuid();
		}

		public init($scope: ng.IScope) {

			for (var prop in $scope) {
				if (this.hasOwnProperty(prop) && $scope[prop] !== undefined && $scope[prop] !== null) {
					this[prop] = $scope[prop];
				}
			}

			if ((<any>this).$element) {
				this._view = (<any>this).$element;
				this._jview = $(this._view);
			}
			(<any>$scope).vm = this;

			$scope.$on('$destroy', this.destroy.bind(this));
		}

		public destroy() {
			(<any>signals.Signal.prototype).kill(this);
		}
		public Authenticated() {
			this.isAuthenticated = true;
		}
		public Unauthenticated() {
			this.isAuthenticated = false;
		}

		public renderHtml = function (html_code) {
			return this._sce.trustAsHtml(html_code);
		}
		public trustSrc = (url) => {
			return this._sce.trustAsResourceUrl(url);
		}

		public iframeresize() {

			setTimeout(function () {
				(<any>$('#iframe-container')).height(800);
				(<any>$('#iframe-container')).scrollTop(150);

				//$("#iframe-container").scroll(function () {
				//	console.log($('#iframe-container').offset());
				//	console.log($('#iframe').offset());

				//});
			}, 1000);
		}
	}

	export class AbstractDirective implements ng.IDirective {

		public templateUrl = "";
		public restrict = "E";
		public replace = false;
		public scope = {};

		public static Name = "";

		public static $inject = [];
		constructor() { }

		public controller = null;
		
	}
}