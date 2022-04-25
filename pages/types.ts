export interface PokemonItem {
  name: string
  url: string
}

export interface PokemonsReponse {
  count: number
  next: string
  previous: string | null
  results: Array<PokemonItem>
}

export type CapturedReponse = Array<PokemonProperties>

export interface PokemonProperties {
  picture: string
  id: number
  height: number
  weight: number
  name: string
  types: Array<{ slot: number; type: { name: string; url: string } }>
}
