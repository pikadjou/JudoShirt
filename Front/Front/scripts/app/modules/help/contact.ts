module JudoShirt {
    'use strict';

	export class C_Contact extends JudoShirt.Init.AbstractModule {
		
		public form = { name: "", nickname: "", mail: "", message: "" };

		public code: number = 0;
		public message: string = "";

		public static $inject = [
			'$scope',
			Services.HelpRequestHandler.Name
		]
		constructor(
			private $scope: any,
			private RH: Services.HelpRequestHandler
			) {
			super();

			this.init($scope);
			
			this.RH.SendContactReceived.add(this.onPacketRecieved, this);
		}

		public onPacketRecieved(response: any) {
			this.code = response.code;
			this.message = response.message;
		}
		public submit = () => {

			var request = new Services.HelpClass.SendContactRequest();
			request.name = this.form.name;
			request.nickname = this.form.nickname;
			request.mail = this.form.mail;
			request.message = this.form.message;

			this.RH.SendContact(request);

			return false;
		}
	}

	export class Contact implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/help/contact.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "Contact".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Contact;
	}
	JudoShirt.Init.Application.JudoShirtApp.directive(Contact.Name, JudoShirtApp.Application.GetDirectiveFactory<Contact>(Contact));
}