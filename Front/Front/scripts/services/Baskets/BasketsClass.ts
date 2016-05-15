module MartialShirt.Services.BasketsClass {
	export class GetBasketRequest {
		public id: string;
		public token: string;

    }
    export class GetBasketResponse {
		public basket : Entity.Basket;
		
    }
} 