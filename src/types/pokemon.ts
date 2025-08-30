export interface NamedAPIResource {
	name: string;
	url: string;
}

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: NamedAPIResource[];

}

export interface PokemonSprites {
	front_default: string | null;
	front_shiny: string | null;

}

export interface PokemonType {
	slot: number;
	type: NamedAPIResource;

}

export interface Pokemon {
	id: number;
	name: string;
	sprites: PokemonSprites;
	types: PokemonType[];
	height: number;
	weight: number;

}

export interface PageInfo {
	page: number;
	pageSize: number;
	total: number;
}
