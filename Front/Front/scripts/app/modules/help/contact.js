var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Contact = (function (_super) {
        __extends(C_Contact, _super);
        function C_Contact($scope, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.form = { name: "", nickname: "", mail: "", message: "" };
            this.code = 0;
            this.message = "";
            this.submit = function () {
                var request = new MartialShirt.Services.HelpClass.SendContactRequest();
                request.name = _this.form.name;
                request.nickname = _this.form.nickname;
                request.mail = _this.form.mail;
                request.message = _this.form.message;
                _this.RH.SendContact(request);
                return false;
            };
            this.init($scope);
            this.RH.SendContactReceived.add(this.onPacketRecieved, this);
        }
        C_Contact.prototype.onPacketRecieved = function (response) {
            this.code = response.code;
            this.message = response.message;
        };
        C_Contact.$inject = [
            '$scope',
            MartialShirt.Services.HelpRequestHandler.Name
        ];
        return C_Contact;
    })(MartialShirt.Init.AbstractModule);
    MartialShirt.C_Contact = C_Contact;
    var Contact = (function () {
        function Contact() {
            this.templateUrl = "/scripts/app/modules/help/contact.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Contact;
        }
        Contact.Name = "Contact".toLocaleLowerCase();
        Contact.$inject = [];
        return Contact;
    })();
    MartialShirt.Contact = Contact;
    MartialShirt.Init.Application.MartialShirtApp.directive(Contact.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Contact));
})(MartialShirt || (MartialShirt = {}));
