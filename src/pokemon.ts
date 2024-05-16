import {
  Pokemons,
  PokemonObject,
  ExperienceCurves,
  CurveKeys,
} from "./pokedex";
import randomBetween from "./utils";

type StatsObject = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

class Pokemon {
  species: string;
  name: string;
  level: number;
  type: string[];
  baseExp: number;
  effortPoints: { type: string; amount: number };
  growthRate: CurveKeys;
  baseStats: StatsObject;
  moves: string[];
  experiencePoints: number;
  individualValues: StatsObject;
  effortValues: StatsObject;
  currentHp: number;
  currentMove: string | null;

  constructor(species: string, name: string, level: number = 1) {
    // Inicializar atributos usando los parámetros
    this.species = species;
    this.name = name || species;
    this.level = level;

    // Inicializar atributos usando la información del Pokedex
    let index: number = Pokemons.findIndex(
      (pokeInfo: PokemonObject) => pokeInfo.species === species
    );
    this.type = Pokemons[index].type;
    this.baseExp = Pokemons[index].baseExp;
    this.effortPoints = Pokemons[index].effortPoints;
    this.growthRate = Pokemons[index].growthRate;
    this.baseStats = Pokemons[index].baseStats;
    this.moves = Pokemons[index].moves;

    // Inicializar atributos según otras indicaciones
    this.experiencePoints = 0;

    if (level > 1) {
      this.experiencePoints = ExperienceCurves[this.growthRate](level);
    }

    this.individualValues = {
      hp: randomBetween(0, 31),
      attack: randomBetween(0, 31),
      defense: randomBetween(0, 31),
      specialAttack: randomBetween(0, 31),
      specialDefense: randomBetween(0, 31),
      speed: randomBetween(0, 31),
    };

    this.effortValues = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };
    this.currentHp = this.stats.hp;
    this.currentMove = null;
  }

  get stats(): StatsObject {
    const stats = {
      hp: Math.floor(
        ((2 * this.baseStats.hp +
          this.individualValues.hp +
          this.effortValues.hp) *
          this.level) /
          100 +
          this.level +
          10
      ),
      attack: Math.floor(
        ((2 * this.baseStats.attack +
          this.individualValues.attack +
          this.effortValues.attack) *
          this.level) /
          100 +
          5
      ),
      defense: Math.floor(
        ((2 * this.baseStats.defense +
          this.individualValues.defense +
          this.effortValues.defense) *
          this.level) /
          100 +
          5
      ),
      specialAttack: Math.floor(
        ((2 * this.baseStats.specialAttack +
          this.individualValues.specialAttack +
          this.effortValues.specialAttack) *
          this.level) /
          100 +
          5
      ),
      specialDefense: Math.floor(
        ((2 * this.baseStats.specialDefense +
          this.individualValues.specialDefense +
          this.effortValues.specialDefense) *
          this.level) /
          100 +
          5
      ),
      speed: Math.floor(
        ((2 * this.baseStats.speed +
          this.individualValues.speed +
          this.effortValues.speed) *
          this.level) /
          100 +
          5
      ),
    };

    // calcular las estadisticas actuales del Pokémon
    return stats;
  }

  expForLevel(n: number): number {
    // obtener la función de crecimiento del pokedex
    // retornar el resultado de llamar a la función pasando `n`
    return ExperienceCurves[this.growthRate](n);
  }

  prepareForBattle(): void {
    // asignar al atributo currentHp la estadistica HP del Pokemon
    this.currentHp = this.stats.hp;
    // resetear el atributo currentMove a null
    this.currentMove = null;
  }

  receiveDamage(damage: number): void {
    // reducir currentHp en la cantidad de damage. No debe quedar menor a 0.
  }

  setCurrentMove(move): void {
    // buscar el move (string) en el pokedex y asignarlo al atributo currentMove
  }

  isFainted(): boolean {
    // retornar si currentHp es 0 o no
  }

  attack(target): void {
    // anunciar "[nombre] used [MOVE]!"
    // determinar si el movimiento "pega" con moveHits()
    // si "pega":
    //  calcular daño base con calculateDamage
    //  determinar si es un critical hit con isCritical
    //  si es critico, anunciarlo
    //  calcular el multiplicador de efectividad con calculateEffectiveness
    //  anunciar mensaje según efectividad. Por ejemplo "It's not very effective..."
    //  calcular el daño final usando el daño base, si fue critico o no y la efectividad
    //  Hacer daño al oponente usando su metedo receiveDamage
    //  Anunciar el daño hecho: "And it hit [oponente] with [daño] damage"
    // si no "pega"
    //  anunciar "But it MISSED!"
  }

  moveHits(): boolean {
    // calcular si pega en base al accuracy del currentMove
  }

  isCritical(): boolean {
    // 1/16 de probabilidad que sea critico
  }

  calculateBaseDamage(target: string): number {
    // determinar si el movimiento es especial comparando el currentMove con la data de Pokedex (SpecialMoveTypes)
    // determinar si se usara el stat attack o specialAttack del atacante
    // determinar si se usara el stat defense o specialDefense del defensor
    // retornar el rsultado de la formula de daño
  }

  calculateEffectiveness(target): number {
    // caluclar el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
  }

  processVictory(target): void {
    // calcular la experiencia ganada e incrementarla a tus experiencePoints
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    // anunciar "[nombre] gained [cantidad] experience points"
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
  }
}

const poke = new Pokemon("Spearow", "char");
console.log(poke.type);
console.log(poke.growthRate);
console.log(poke.baseExp);
console.log(poke.experiencePoints);
