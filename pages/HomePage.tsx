import { useEffect, useState } from "react"
import { CapturedReponse } from "./types"
import styles from "../styles/HomePage.module.css"
import { useInterval } from "./utils"
import { PokemonGrid } from "./PokemonGrid"
import { PokeForm } from "./PokeForm"

export function HomePage({}) {
  const [pokemons, setPokemons]: [CapturedReponse, any] = useState([])
  const [isLoading, setLoading] = useState(false)

  return (
    <div className={styles.crudContainer}>
      <PokeForm pokemons={pokemons} />
      <PokemonGrid setPokemons={setPokemons} pokemons={pokemons} />
    </div>
  )
}
