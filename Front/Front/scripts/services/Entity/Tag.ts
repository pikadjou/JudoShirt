module JudoShirt.Services.Entity {
	export class Tag {
		public id: number;
		public name: string;
		public content: string;
		public thumbnail: string;
		public header: string;
		public shopId: number;
		public idCustomShop: number;

		public categories: any[];
		public tags: any[];
	}
}  