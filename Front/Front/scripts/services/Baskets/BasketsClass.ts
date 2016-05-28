module MartialShirt.Services.BasketsClass {
	export class GetBasketRequest {
		public id: string;
		public token: string;

    }
	export class UpdateQuantityRequest {
		public basketId: string;
		public id: string;
		public quantity: number;
		public element: string;

    }
    export class GetBasketResponse {
		public basket : Entity.Basket;
		
    }

	export class UpdateQuantityResponse {
		public updateBasket: Entity.Basket;

    }
	
} 