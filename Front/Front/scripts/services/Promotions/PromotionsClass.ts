module MartialShirt.Services.PromotionsClass {
    export class GetPromotionsActiveResponse {
		public promotions : Entity.Promotion[];
		
    }

	export class GetPromotionRequest {
		public slug: number;
    }
	export class GetPromotionResponse {
		public promotion: Entity.Promotion;

    }
} 