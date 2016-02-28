module JudoShirt.Services.UsersClass {

	export class User {
		public name: string;
		public memberSince: string;
	}
    export class GetLoginMetohesRecieved {
		public mothodeList : any[];
		
    }

	export class LoginRequest {
		public username: string;
		public password: string;
    }
} 