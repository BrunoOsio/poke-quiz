import styled, { keyframes } from "styled-components";
import { imageBlur } from "./shared/helpers/pokemonHelpers";

interface PokemonProps {
  isPokemonCorrect?: boolean
  isPokemonAttemptsOver?: boolean
}

interface ImageProps {
  attempts: number
  isPokemonCorrect: boolean
  isPokemonAttemptsOver: boolean
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

  @media (max-width: 400px) {
    width: 80vw;
  }
`;

export const RestartButton = styled.button`
  color: #814a13;
  font-size: 1.4rem;
  padding: 0;
  width: 30px;
  margin: 0 auto;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.2);
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
  margin-top: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  }

  @media (max-width: 400px) {
    margin-top: 35px;
  }
`;

export const PokemonContainer = styled.article<PokemonProps>`
  width: 300px;
  box-shadow: 0px 0px 5px #ffeecc;
  box-shadow: ${({isPokemonCorrect}) => isPokemonCorrect && "0px 0px 5px #65d265"};
  box-shadow: ${({isPokemonAttemptsOver}) => isPokemonAttemptsOver && "0px 0px 5px #f76e6e"};
  display: flex;
  flex-direction: column;
  border: 3px solid #ffeecc;
  border: ${({isPokemonCorrect}) => isPokemonCorrect && "3px solid #65d265"};
  border: ${({isPokemonAttemptsOver}) => isPokemonAttemptsOver && "3px solid #f76e6e"} ;
  padding: 20px;
  border-radius: 10px;
  background-color: ${({isPokemonCorrect}) => isPokemonCorrect && "#65d265"};
  background-color: ${({isPokemonAttemptsOver}) => isPokemonAttemptsOver && "#f76e6e"};
  transition: all 0.2s ease-in-out;

  @media (max-width: 400px) {
    margin-bottom: 30px;
  }
`;

export const Image = styled.img<ImageProps>`
  width: 100%;
  cursor: pointer;
  filter: ${({attempts}) => `blur(${imageBlur(attempts)})`};
  filter: ${({isPokemonCorrect}) => isPokemonCorrect && `blur(0px)`};
  user-select: none;
  pointer-events: none;

  &:hover {
    opacity: ${({isPokemonCorrect}) => isPokemonCorrect && "1"};
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
  color: #814a13;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #e69900;
    border-right: 2px solid #e69900;
    border-radius: 10px 10px 10px 10px;
    transform: scale(1.05);
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
    border: 3px solid #f0a92d;
    color: white;
  }

  &:focus {
    border-color: #e69900;
    border-right: 2px solid #e69900;
    border-radius: 10px 10px 10px 10px;
    transform: scale(1.05);
    background-color: #f0a92d;
    color: white;
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

export const PokemonAttemptsLabel = styled.span<PokemonProps>`
  font-size: 1rem;
  color: ${({isPokemonCorrect}) => isPokemonCorrect ? "white" : "#ccc"};
  color: ${({isPokemonAttemptsOver}) => isPokemonAttemptsOver && "#aa0909"};
  font-weight: ${({isPokemonAttemptsOver, isPokemonCorrect}) => (isPokemonAttemptsOver || isPokemonCorrect) && "bold"};
  text-align: center;
`;
