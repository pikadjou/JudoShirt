module JudoShirt.Services.Entity {
	export class Product {
		public id: number;
		public name: string;
		public content: string;
		public thumbnail: string;
		public shopId: number;

		public types: Services.Entity.Type[];
	}
} 