import { Pokemon } from "../types/Pokemon";

const pokemonsRaw = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetchd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

export const getPokemons = pokemonsRaw.map((pokemon) => {
  return pokemon.toLowerCase();
});

export const getRandomPokemonsNames = (quantity = 6): string[] => {
  const randomPokemonIndexes: number[] = [];

  for (let i = 0; i < quantity; i++) {
    randomPokemonIndexes.push(Math.floor(Math.random() * getPokemons.length));
  }

  const pokemonsNames = randomPokemonIndexes.map((index) => {
    return getPokemons[index];
  })

  return pokemonsNames;
}

export const formatName = (name: string): string => {
  return name.toLowerCase().trim();
}  

export const capitalize = (name: string): string => {
  return name.replace(name[0], name[0].toUpperCase());
}

export const createPokemonData = (rawPokemonData: any): Pokemon => {

  const pokemon: Pokemon = {
    id: Math.floor(Math.random() * 99999),
    name: rawPokemonData.name,
    sprites: {
      frontFace: rawPokemonData.sprites.front_default,
      backFace: rawPokemonData.sprites.back_default,
    },
    isShowBackface: false,
    isCorrect: false,
    isAttemptsOver: false
  }

  return pokemon
}

export const imageBlur = (attempts: number): string => {
  const initialBlur = 20;
  const suffix = "px";

  const blur = `${initialBlur - (attempts * 2)}${suffix}`; 
  
  return blur;
}