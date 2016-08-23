module MartialShirt.Services.Entity {
	export class Country {
		public name: string;
		public iso: string;

		public regionCost : RegionCost[] = [];
	}
} 