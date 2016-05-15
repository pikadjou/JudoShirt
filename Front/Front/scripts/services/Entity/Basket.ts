module MartialShirt.Services.Entity {
	export class Basket {
		public id: string;

		public checkoutLink: string;

		public priceItems: number;
		public priceShipping: number;
		public priceTotal: number;

		public basketItems: Entity.BasketItem[];
	}
} 