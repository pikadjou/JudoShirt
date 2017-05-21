module MartialShirt.Services.Entity {
	export class Design {
		public id: number;
		public name: string;
		public url: string;

		public content: string;
		public thumbnail: string;
		public header: string;
		public shopId: number;
		public idCustomShop: number;

		public categories: Category[];
		public tags: Tag[];
	}
}