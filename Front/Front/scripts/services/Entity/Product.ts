module MartialShirt.Services.Entity {
	export class Product {
		public id: number;
		public name: string;
		public url: string;

		public content: string;
		public thumbnail: string;
		public shopId: number;
		public priority: number;

		public types: Services.Entity.Type[];

	}
} 