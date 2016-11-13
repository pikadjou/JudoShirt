module MartialShirt.Services.Entity {
	export class Type {
		public id: number;
		public name: string;
		public content: string;
		public type: number;

		public desings : Design[];
		public categories : Category[];
		public secondTypes: Type[];


		//specific for front
		public active: boolean = false;
		public disable: boolean = false;
	}
} 