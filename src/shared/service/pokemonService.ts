import axios from "axios";
import { createPokemonData, getPokemons, getRandomPokemonsNames } from "../helpers/pokemonHelpers";
import { Pokemon } from "../types/Pokemon";

const BASE_FIND_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";

export const findByName = async (pokemonName: string): Promise<Pokemon> => {
  const endpoint = `/${pokemonName}`;

  const { data } = await axios.get(`${BASE_FIND_POKEMON_URL + endpoint}`);
  const pokemon = createPokemonData(data);

  return pokemon;
}

export const findManyByName = async (pokemonName: string): Promise<Pokemon[]> => {

  const matchedPokemonsRaw = getPokemons.map(pokemon => {
    if (pokemon.includes(pokemonName)) {
      return pokemon;
    }
  });

  const matchedPokemonsNames = matchedPokemonsRaw.filter(pokemonName => pokemonName != undefined);

  const pokemons: Pokemon[] = [];

  for (let pokemonName of matchedPokemonsNames) {
    const endpoint = `/${pokemonName}`;

    const { data } = await axios.get(`${BASE_FIND_POKEMON_URL + endpoint}`);
    const pokemon = createPokemonData(data);

    pokemons.push(pokemon);
  }

  return pokemons;
};

export const findRandom = async (pokemonFetchQuantity = 6): Promise<Pokemon[]> => {
  const pokemonsNames = getRandomPokemonsNames(pokemonFetchQuantity);

  const pokemons: Pokemon[] = [];

  for (let name of pokemonsNames) {
    const pokemon = await findByName(name);

    pokemons.push(pokemon)
  }

  return pokemons;
};
