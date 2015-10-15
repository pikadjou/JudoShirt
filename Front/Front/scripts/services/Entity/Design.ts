module JudoShirt.Services.Entity {
	export class Design {
		public id: number;
		public name: string;
		public content: string;
		public thumbnail: string;
		public header: string;
		public idShop: number;
		public idCustomShop: number;

		public categories: Category[];
		public tags: Tag[];
	}
}