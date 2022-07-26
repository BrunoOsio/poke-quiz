import styled from "styled-components";
import { imageBlur } from "./shared/helpers/pokemonHelpers";

type IsPokemonCorrectProps = {
  isPokemonCorrect: boolean
  isPokemonAttemptsOver: boolean
}

type ImageProps = {
  attempts: number
  isCorrect: boolean
  isAttemptsOver: boolean
}

type PokemonAttemptsLabelProps = {
  isCorrect?: boolean
  isAttemptsOver?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;

  h1 {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 300;
    color: #814a13;
  }
`;

export const PokemonsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 50px;
  margin-top: 50px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  }
`;

export const PokemonContainer = styled.article<IsPokemonCorrectProps>`
  width: 300px;
  box-shadow: 0px 0px 5px #ffeecc;
  display: flex;
  flex-direction: column;
  border: 3px solid #ffeecc;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({isPokemonCorrect}) => isPokemonCorrect ? "#32CD32": "inherit"};
  background-color: ${({isPokemonAttemptsOver}) => isPokemonAttemptsOver && "#f76e6e"};
  opacity: ${({isPokemonCorrect}) => isPokemonCorrect ? "0.5": "1"};
  transition: all 0.2s ease-in-out;
`;

export const Image = styled.img<ImageProps>`
  width: 100%;
  cursor: pointer;
  filter: ${({attempts}) => `blur(${imageBlur(attempts)})`};
  filter: ${({isCorrect}) => isCorrect && `blur(0px)`};
  user-select: none;
  pointer-events: none;

  &:hover {
    opacity: ${({isCorrect}) => isCorrect && "1"};
  }
`;

export const SubmitContainer = styled.div`
  display: flex;
  height: 60px;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 1.4rem;
  padding: 10px 5px;
  outline: none;
  border-radius: 10px 0 0 10px;
  border: 3px solid #ffcc66;
  border-right: none;
  color: #050505;

  &:focus {
    border-color: #e69900;
    border-right: 2px solid #e69900;
  }
`;

export const Button = styled.button`
  height: 100%;
  width: 80px;
  border-radius: 0 10px 10px 0;
  outline: none;
  background-color:  #ffe6b3;
  border: 3px solid #ffcc66;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f0a92d;
  }
`;

export const PokemonNameLabel = styled.span`
  width: 100%;
  font-size: 1.8rem;
  padding: 10px 5px;
  font-weight: bold;
  text-align: center;
  color: white;
  opacity: 1;
`;

export const PokemonAttemptsLabel = styled.span<PokemonAttemptsLabelProps>`
  font-size: 1rem;
  color: ${({isCorrect}) => isCorrect ? "white" : "#ccc"};
  color: ${({isAttemptsOver}) => isAttemptsOver && "#aa0909"};
  font-weight: ${({isAttemptsOver}) => isAttemptsOver ? "bold" : "inherit"};
  text-align: center;
`;
