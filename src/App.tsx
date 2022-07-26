import { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, Image, Input, PokemonAttemptsLabel, PokemonContainer, PokemonNameLabel, PokemonsContainer, SubmitContainer } from "./appStyles";
import { Pokemon } from "./shared/types/Pokemon";
import { useAppDispatch, useAppSelector } from "./states/app/hooks";
import { findMatchRandomPokemon, findPokemon, setPokemonAttemptsIsOver, setPokemonIsCorrect, togglePokemonImage } from "./states/features/pokemonSlice";
import { FaArrowRight } from 'react-icons/fa';
import { capitalize, formatName } from "./shared/helpers/pokemonHelpers";

function App() {
  const dispatch = useAppDispatch();

  const {
    value: pokemons,
    isSuccess: isPokemonsSuccess,
    isLoading: isPokemonsLoading,
    isError: isPokemonsError,
    error: pokemonError
  } = useAppSelector((state) => state.pokemon);

  const pokemonInputsInitialState = ["", "", ""];
  const errorsInitialState = [0, 0, 0];

  const [pokemonInputs, setPokemonInputs] = useState<string[]>(pokemonInputsInitialState);
  const [attempts, setAttempts] = useState<number[]>(errorsInitialState);

  useEffect(() => {
    dispatch(findMatchRandomPokemon());
  }, []);

  const handleChangePokemonsInputChange = (event: ChangeEvent<HTMLInputElement>, pokemonIndex: number) => {
      const updatedInputs = [...pokemonInputs];
      updatedInputs[pokemonIndex] = event.target.value;
      setPokemonInputs(updatedInputs); 
  }

  const handleTogglePokemonImage = (pokemon: Pokemon) => {
    dispatch(togglePokemonImage(pokemon));
  }

  const handleCheckPokemonAnswer = (pokemon: Pokemon, pokemonIndex: number) => {
    if (handleCheckPokemonAttemptsIsOver(pokemon, pokemonIndex)) return;

    const isPokemonNameCorrect = pokemonInputs[pokemonIndex] === formatName(pokemon.name);

    if (!isPokemonNameCorrect) {
      const updatedAttempts = [...attempts];
      updatedAttempts[pokemonIndex] = attempts[pokemonIndex] + 1;

      setAttempts(updatedAttempts);

      return;
    }
         
    dispatch(setPokemonIsCorrect(pokemon));
  }

  const handleCheckPokemonAttemptsIsOver = (pokemon: Pokemon, pokemonIndex: number): boolean => {
    const maximumAttempts = 10;
    const isPokemonAttemptsIsOver = attempts[pokemonIndex] >= maximumAttempts;

    if (!isPokemonAttemptsIsOver) {
      return false;
    }

    dispatch(setPokemonAttemptsIsOver(pokemon));

    return true;
  }

  return (
    <Container>
      <h1>Descubra os Pokemóns!</h1>
      <PokemonsContainer>
        {isPokemonsLoading && <div>Procurando...</div>}
        {isPokemonsError && <div>Não foi possível carregar esta página, tente reinicia-la</div>}
        
        {isPokemonsSuccess &&
          pokemons.map((pokemon, index) => {
            return (
              <PokemonContainer key={pokemon.id} isPokemonCorrect={pokemon.isCorrect} isPokemonAttemptsOver={pokemon.isAttemptsOver}>
                <div onClick={() => handleTogglePokemonImage(pokemon)}>
                  {pokemon.isShowBackface
                    ? <Image src={pokemon.sprites.backFace} attempts={attempts[index]} isCorrect={pokemon.isCorrect} isAttemptsOver={pokemon.isAttemptsOver}/>
                    : <Image src={pokemon.sprites.frontFace} attempts={attempts[index]} isCorrect={pokemon.isCorrect} isAttemptsOver={pokemon.isAttemptsOver}/>
                  }
                </div>
                
                <SubmitContainer>
                  {(!pokemon.isCorrect && !pokemon.isAttemptsOver) &&
                    <>
                      <Input type="text" value={pokemonInputs[index]} onChange={(event) => handleChangePokemonsInputChange(event, index)}/>
                      <Button onClick={() => handleCheckPokemonAnswer(pokemon, index)}><FaArrowRight/></Button>
                    </>
                  }

                  {(pokemon.isCorrect || pokemon.isAttemptsOver) &&
                    <>
                      <PokemonNameLabel>{capitalize(pokemon.name)}</PokemonNameLabel>
                    </>
                  }
                </SubmitContainer>

                { !pokemon.isAttemptsOver &&
                  <PokemonAttemptsLabel isCorrect={pokemon.isCorrect}>Tentativas: {attempts[index]}</PokemonAttemptsLabel>
                }

                { pokemon.isAttemptsOver &&
                  <PokemonAttemptsLabel isAttemptsOver={pokemon.isAttemptsOver}>Não descobriu o Pokémon</PokemonAttemptsLabel>
                }
              </PokemonContainer>
              
            );
          })

        }   
      </PokemonsContainer>
    </Container>
  );
}

export default App;
