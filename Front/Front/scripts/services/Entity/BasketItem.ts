module MartialShirt.Services.Entity {
	export class BasketItem {
		public id: string;
		public name: string;
		public articleId: number;

		public description: string;
		public quantity: number;

		public productId: number;

		public appearance: Services.Entity.Appearance;
		public size: Services.Entity.Size;

		public priceItem: number;
		public price: number;

		public pictureLink: string;
		public link: string;

		public extraElement: string;
	}
} 