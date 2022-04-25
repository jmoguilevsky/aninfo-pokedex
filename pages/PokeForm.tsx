import React, { useState } from "react"
import styles from "../styles/HomePage.module.css"
import { CapturedReponse } from "./types"

export function PokeForm({ pokemons }: { pokemons: CapturedReponse }) {
  const [values, setValues] = useState({
    pokemon: "",
  })

  const [error, setError] = useState("")

  const handlePokemonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()
    setValues(() => ({
      pokemon: e.target.value,
    }))
  }

  const onAdd = async () => {
    if (pokemons.find((x) => x.name === values.pokemon)) {
      setError("The pokemon is already in your pokedex")
      return
    }

    await fetch("http://localhost:5001/captured", {
      method: "POST",
      body: JSON.stringify({ pokemon: values.pokemon }),
    })
  }
  const onRemove = async () => {
    if (!pokemons.some((x) => x.name === values.pokemon)) {
      setError("The pokemon should be on your pokedex")
      return
    }

    await fetch("http://localhost:5001/captured", {
      method: "DELETE",
      body: JSON.stringify({ pokemon: values.pokemon }),
    })
  }

  const clearError = () => {
    setError("")
  }

  return (
    <div>
      <input
        id="pokemon"
        className={styles.pokeInput}
        type="text"
        placeholder="Pokémon"
        name="pokemon"
        value={values.pokemon}
        onChange={handlePokemonNameChange}
      />

      <button onClick={onAdd}>Add Pokémon</button>
      <button onClick={onRemove}>Remove Pokémon</button>

      {error !== "" ? (
        <div>
          <p className={styles.error}>{error}</p>
          <button onClick={clearError}>X</button>
        </div>
      ) : null}
    </div>
  )
}
