import { ChangeEvent, useEffect, useState } from "react";
import { Pokemon } from "./shared/types/Pokemon";
import { useAppDispatch, useAppSelector } from "./states/app/hooks";
import { findPokemon, findRandomPokemons, togglePokemonImage } from "./states/features/pokemonSlice";

function App() {
  const dispatch = useAppDispatch();

  const {
    value: pokemons,
    isSuccess: isPokemonsSuccess,
    isLoading: isPokemonsLoading,
    isError: isPokemonsError,
    error: pokemonError
  } = useAppSelector((state) => state.pokemon);

  const [findPokemonInput, setFindPokemonInput] = useState<string>("");

  useEffect(() => {
    dispatch(findRandomPokemons());
  }, []);

  const handleFindPokemonByNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFindPokemonInput(event.target.value);
  }

  const handleTogglePokemonImage = (pokemon: Pokemon) => {
    dispatch(togglePokemonImage(pokemon));
  }

  const handleFindPokemonByName = () => {
    dispatch(findPokemon(findPokemonInput));
  }

  return (
    <div className="App">
      <>
        <input type="text" value={findPokemonInput} onChange={handleFindPokemonByNameInputChange}/>

        <button onClick={handleFindPokemonByName}>Encontrar Pokemon</button>

        {isPokemonsLoading && <div>Procurando...</div>}
        {isPokemonsError && <div>Não foi possível encontrar este pokemon</div>}
        
        {isPokemonsSuccess && 
          pokemons.map((pokemon) => {
            return (
              <article key={pokemon.id} id={String(pokemon.id)}>
                <div>{pokemon.name}</div>
                <div onClick={() => handleTogglePokemonImage(pokemon)}>

                  {pokemon.isShowBackface 
                    ? <img src={pokemon.sprites.backFace}/>
                    : <img src={pokemon.sprites.frontFace}/>
                  }
                </div>

              </article>
            );
          })
        }
        
      </>
    </div>
  );
}

export default App;
