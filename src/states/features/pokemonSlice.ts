import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../shared/types/Pokemon";
import { BaseState } from "./types/BaseState";
import * as pokemonService from "../../shared/service/pokemonService";
import { formatName } from "../../shared/helpers/pokemonHelpers";

type PokemonState = BaseState<Pokemon>;

const initialState: PokemonState = {
  value: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  error: "",
};

const findPokemon = createAsyncThunk(
  "pokemon/findPokemon",

  async (pokemonName: string): Promise<Pokemon[]> => {
    const name = formatName(pokemonName);
    const pokemons = await pokemonService.findManyByName(name);

    return pokemons;
  }
);

const findRandomPokemons = createAsyncThunk(
  "pokemon/findRandomPokemons",

  async () => {
    const pokemons = await pokemonService.findRandom(6);

    return pokemons;
  }
);

const findMatchRandomPokemons = createAsyncThunk(
  "pokemon/findMatchRandomPokemon",

  async () => {
    const pokemon = await pokemonService.findRandom(3);
    return pokemon;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,

  reducers: {
    togglePokemonImage(state, action: PayloadAction<Pokemon>) {
      const targetPokemon = action.payload;

      const targetPokemonIndex = state.value.findIndex(
        (pokemon) => pokemon.id === targetPokemon.id
      );

      state.value[targetPokemonIndex].isShowBackface = !targetPokemon.isShowBackface;
    },

    setPokemonIsCorrect(state, action: PayloadAction<Pokemon>) {
      const targetPokemon = action.payload;

      const targetPokemonIndex = state.value.findIndex(
        (pokemon) => pokemon.id === targetPokemon.id
      );

      state.value[targetPokemonIndex].isCorrect = true;
    },

    setPokemonAttemptsIsOver(state, action: PayloadAction<Pokemon>) {
      const targetPokemon = action.payload;

      const targetPokemonIndex = state.value.findIndex(
        (pokemon) => pokemon.id === targetPokemon.id
      );

      state.value[targetPokemonIndex].isAttemptsOver = true;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(
      findPokemon.pending, 
      (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(
      findPokemon.fulfilled,
      (state, action: PayloadAction<Pokemon[]>) => {
        state.value = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      }
    );

    builder.addCase(
      findPokemon.rejected, 
      (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(
      findRandomPokemons.pending, 
      (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(
      findRandomPokemons.fulfilled,
      (state, action: PayloadAction<Pokemon[]>) => {
        state.value = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      }
    );

    builder.addCase(
      findRandomPokemons.rejected, 
      (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(
      findMatchRandomPokemons.pending, 
      (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    });

    builder.addCase(
      findMatchRandomPokemons.fulfilled,
      (state, action: PayloadAction<Pokemon[]>) => {
        state.value = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      }
    );

    builder.addCase(
      findMatchRandomPokemons.rejected, 
      (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const { togglePokemonImage, setPokemonIsCorrect, setPokemonAttemptsIsOver } = pokemonSlice.actions;
export { findPokemon, findRandomPokemons, findMatchRandomPokemons };

export default pokemonSlice.reducer;
