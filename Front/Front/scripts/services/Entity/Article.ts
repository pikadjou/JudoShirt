module MartialShirt.Services.Entity {
	export class Article {
		public id: number;
		public name: string;
		public url: string;

		public short: string;
		public content: string;

		public thumbnail: string;
		public sizeThumbnail: string;
		public extra: string;

		public shopId: number;
		public priority: number;
		public types: Services.Entity.Type[];

		public views: Services.Entity.View[];
		public appearances: Services.Entity.Appearance[];
		public sizes: Services.Entity.Size[];

	}
} 