module MartialShirt.Services.PromotionsClass {
    export class GetPromotionsActiveResponse {
		public promotions : Entity.Promotion[];
    }
	export interface GetBestPromotionResponse {
		promotion: Entity.Promotion;
    }
	export class GetPromotionRequest {
		public slug: number;
    }
	export class GetPromotionResponse {
		public promotion: Entity.Promotion;

    }
} 