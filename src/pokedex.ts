export interface PokemonObject {
  species: string;
  type: string[];
  baseExp: number;
  effortPoints: { type: string; amount: number };
  growthRate: CurveKeys;
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves: string[];
}

export type Move = {
  name: string;
  type: string;
  power: number;
  accuracy: number;
  priority: number;
};

interface TypeMultiplier {
  [attackingType: string]: {
    [defendingType: string]: number;
  };
}

type ExperienceCurveType = {
  slow: (a: number) => number;
  mediumSlow: (a: number) => number;
  mediumFast: (a: number) => number;
  fast: (a: number) => number;
};

export type CurveKeys = keyof ExperienceCurveType;

export const Pokemons: PokemonObject[] = [
  {
    species: "Bulbasaur",
    type: ["grass", "poison"],
    baseExp: 64,
    effortPoints: { type: "specialAttack", amount: 1 },
    growthRate: "mediumSlow",
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
    moves: ["tackle", "vine whip"],
  },
  {
    species: "Charmander",
    type: ["fire"],
    baseExp: 62,
    effortPoints: { type: "speed", amount: 1 },
    growthRate: "mediumSlow",
    baseStats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65,
    },
    moves: ["scratch", "ember"],
  },
  {
    species: "Squirtle",
    type: ["water"],
    baseExp: 63,
    effortPoints: { type: "defense", amount: 1 },
    growthRate: "mediumSlow",
    baseStats: {
      hp: 44,
      attack: 48,
      defense: 65,
      specialAttack: 50,
      specialDefense: 64,
      speed: 43,
    },
    moves: ["tackle", "bubble"],
  },
  {
    species: "Ratata",
    type: ["normal"],
    baseExp: 51,
    effortPoints: { type: "speed", amount: 1 },
    growthRate: "mediumFast",
    baseStats: {
      hp: 30,
      attack: 56,
      defense: 35,
      specialAttack: 25,
      specialDefense: 35,
      speed: 72,
    },
    moves: ["tackle", "quick attack"],
  },
  {
    species: "Spearow",
    type: ["normal", "flying"],
    baseExp: 52,
    effortPoints: { type: "speed", amount: 1 },
    growthRate: "mediumFast",
    baseStats: {
      hp: 40,
      attack: 60,
      defense: 30,
      specialAttack: 31,
      specialDefense: 31,
      speed: 70,
    },
    moves: ["peck", "pursuit"],
  },
  {
    species: "Pikachu",
    type: ["electric"],
    baseExp: 112,
    effortPoints: { type: "speed", amount: 2 },
    growthRate: "mediumFast",
    baseStats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
    moves: ["thunder shock", "quick attack"],
  },
  {
    species: "Onix",
    type: ["rock", "ground"],
    baseExp: 77,
    effortPoints: { type: "defense", amount: 1 },
    growthRate: "mediumFast",
    baseStats: {
      hp: 35,
      attack: 45,
      defense: 160,
      specialAttack: 30,
      specialDefense: 45,
      speed: 70,
    },
    moves: ["tackle", "rock throw"],
  },
];

export const Moves = [
  {
    name: "tackle",
    type: "normal",
    power: 40,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "vine whip",
    type: "grass",
    power: 45,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "scratch",
    type: "normal",
    power: 40,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "ember",
    type: "fire",
    power: 40,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "bubble",
    type: "water",
    power: 40,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "quick attack",
    type: "normal",
    power: 40,
    accuracy: 100,
    priority: 1,
  },
  {
    name: "peck",
    type: "flying",
    power: 35,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "pursuit",
    type: "dark",
    power: 40,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "thunder shock",
    type: "electric",
    power: 40,
    accuracy: 100,
    priority: 0,
  },
  {
    name: "rock throw",
    type: "rock",
    power: 50,
    accuracy: 90,
    priority: 0,
  },
];

export const SpecialMoveTypes = [
  "water",
  "grass",
  "fire",
  "ice",
  "electric",
  "psychic",
  "dragon",
  "dark",
];

export const TypeMultiplier: TypeMultiplier = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5,
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
};

export const ExperienceCurves: ExperienceCurveType = {
  slow: (n) => Math.floor((5 * n ** 3) / 4),
  mediumSlow: (n) => Math.floor((6 / 5) * n ** 3 - 15 * n ** 2 + 100 * n - 140),
  mediumFast: (n) => Math.floor(n ** 3),
  fast: (n) => Math.floor((4 * n ** 3) / 5),
};
