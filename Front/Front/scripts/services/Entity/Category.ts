module MartialShirt.Services.Entity {
	export class Category {
		public id: number;
		public name: string;
		
		public parent: Services.Entity.Category;
		public children: Services.Entity.Category[];
	}
} 