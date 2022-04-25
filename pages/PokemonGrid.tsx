import { useEffect, useState } from "react"
import { CapturedReponse } from "./types"
import styles from "../styles/HomePage.module.css"
import { useInterval } from "./utils"

export function PokemonGrid({
  setPokemons,
  pokemons,
}: {
  setPokemons: (pokemons: CapturedReponse) => void
  pokemons: CapturedReponse
}) {
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5001/captured")
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data)
        setLoading(false)
      })
  }, [])

  useInterval(() => {
    fetch("http://localhost:5001/captured")
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data)
        setLoading(false)
      })
  }, 2000)

  return (
    <div className={styles.pokemonGrid}>
      {(pokemons as CapturedReponse).map((pokemon) => (
        <div className={styles.pokemon} key={pokemon.id}>
          <div className={styles.pokemonColumn}>#{pokemon.id}</div>
          <div className={styles.separator} />
          <img className={styles.pokemonColumn} src={pokemon.picture} />
          <div className={styles.separator} />
          <div className={styles.pokemonColumn}>{pokemon.name}</div>
          <div className={styles.separator} />
          <div className={styles.pokemonColumn}>{pokemon.height}</div>
          <div className={styles.separator} />
          <div className={styles.pokemonColumn}>{pokemon.weight}</div>
          <div className={styles.separator} />
          <div className={`${styles.typesColumn} ${styles.pokemonColumn}`}>
            {pokemon.types
              .sort((a, b) => {
                if (a > b) return 1
                if (a < b) return -1
                return 0
              })
              .map((type) => (
                <span style={{ padding: "1rem" }} key={type.slot}>
                  {type.type.name}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
