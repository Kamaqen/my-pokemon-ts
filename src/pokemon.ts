import {
  Pokemons,
  PokemonObject,
  ExperienceCurves,
  CurveKeys,
  Moves,
  Move,
  TypeMultiplier,
  SpecialMoveTypes,
} from "./pokedex";
import randomBetween from "./utils.ts";

type StatsObject = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

type EffortPoints = { type: string; amount: number };

export class Pokemon {
  species: string;
  name: string;
  level: number;
  type: string[];
  baseExp: number;
  effortPoints: EffortPoints;
  growthRate: CurveKeys;
  baseStats: StatsObject;
  moves: string[];
  experiencePoints: number;
  individualValues: StatsObject;
  effortValues: StatsObject;
  currentHp: number;
  currentMove: Move | undefined | null;

  constructor(species: string, name: string = species, level: number = 1) {
    // Inicializar atributos usando los parámetros
    this.species = species;
    this.name = name;
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
    this.currentHp = this.currentHp < damage ? 0 : this.currentHp - damage;
  }

  setCurrentMove(move: string): void {
    // buscar el move (string) en el pokedex y asignarlo al atributo currentMove
    const moveObject: Move | undefined = Moves.find(
      (movement) => movement.name === move
    );
    this.currentMove = moveObject;
  }

  isFainted(): boolean {
    // retornar si currentHp es 0 o no
    return this.currentHp === 0;
  }

  attack(target: Pokemon): void {
    // anunciar "[nombre] used [MOVE]!"
    console.log(
      `%c${this.name} used ${this.currentMove?.name.toUpperCase()}`,
      "font-weight: bold; color: purple"
    );
    // determinar si el movimiento "pega" con moveHits()
    const moveHits: boolean = this.moveHits();
    // si "pega":
    if (moveHits) {
      //  calcular daño base con calculateDamage
      const baseDamage: number = this.calculateBaseDamage(target);
      //  determinar si es un critical hit con isCritical
      const isCritical = this.isCritical();
      //  si es critico, anunciarlo
      if (isCritical) {
        console.log("%cIt was a CRITICAL hit!", "color: pink");
      }
      //  calcular el multiplicador de efectividad con calculateEffectiveness
      const effectiveness: number = this.calculateEffectiveness(target);
      //  anunciar mensaje según efectividad. Por ejemplo "It's not very effective..."
      switch (effectiveness) {
        case 0:
          console.log(
            `%cIt doesn't affect ${target.name}.`,
            "font-style: italic"
          );
          break;
        case 0.5:
          console.log("%cIt's not very effective...", "font-style: italic");
          break;
        case 2:
        case 4:
          console.log("%cIt's super effective!", "font-style: italic");
          break;
      }

      //  calcular el daño final usando el daño base, si fue critico o no y la efectividad
      const damage: number = isCritical
        ? baseDamage * effectiveness * 1.5
        : baseDamage * effectiveness;
      //  Hacer daño al oponente usando su metedo receiveDamage
      target.receiveDamage(damage);
      //  Anunciar el daño hecho: "And it hit [oponente] with [daño] damage"
      console.log(`And it hit ${target.name} with ${damage} damage.`);
    } else {
      // si no "pega"
      //  anunciar "But it MISSED!"
      alert("But it MISSED!");
    }
  }

  moveHits(): boolean {
    // Generar un número aleatorio entre 1 y 100
    const randomNumber = randomBetween(1, 100);

    // Comprobar si el número aleatorio es menor o igual que la precisión del movimiento
    return randomNumber <= this.currentMove?.accuracy!;
  }

  isCritical(): boolean {
    // 1/16 de probabilidad que sea critico
    const randomNumber = randomBetween(1, 16);
    return randomNumber === 1;
  }

  calculateBaseDamage(target: Pokemon): number {
    // determinar si el movimiento es especial comparando el currentMove con la data de Pokedex (SpecialMoveTypes)
    const special = SpecialMoveTypes.find(
      (el) => el === this.currentMove?.type
    );
    // determinar si se usara el stat attack o specialAttack del atacante
    const offensiveStat = special
      ? this.stats.specialAttack
      : this.stats.attack;
    // determinar si se usara el stat defense o specialDefense del defensor
    const targetDefensiveStat = special
      ? target.stats.specialDefense
      : target.stats.defense;

    const movePower = this.currentMove?.power!;
    // retornar el rsultado de la formula de daño
    return (
      Math.floor(
        Math.floor(
          (Math.floor((2 * this.level) / 5.0 + 2) * offensiveStat * movePower) /
            targetDefensiveStat
        ) / 50
      ) + 2
    );
  }

  calculateEffectiveness(target: Pokemon): number {
    // calcular el multiplicador de efectividad tomando el tipo del currentMove y el tipo de pokemon del oponente
    const moveType = this.currentMove?.type;

    // If the opponent has one type
    if (target.type.length === 1) {
      const opponentType = target.type[0];
      return TypeMultiplier[moveType!][opponentType];
    } else if (target.type.length === 2) {
      const opponentType1 = target.type[0];
      const opponentType2 = target.type[1];
      const effectiveness1 = TypeMultiplier[moveType!][opponentType1] || 1;
      const effectiveness2 = TypeMultiplier[moveType!][opponentType2] || 1;
      return effectiveness1 * effectiveness2;
    } else {
      return 1;
    }
  }

  processVictory(target: Pokemon): void {
    // calcular la experiencia ganada e incrementarla a tus experiencePoints
    const experienceGained: number = Math.floor(
      (target.baseExp * target.level) / 7
    );
    this.experiencePoints += experienceGained;
    // incrementar los effortValues en la estadística correspondiente con la información de effortPoints del oponente
    const statType = target.effortPoints.type as keyof StatsObject;
    this.effortValues[statType] += target.effortPoints.amount;
    // anunciar "[nombre] gained [cantidad] experience points"
    console.log(`${this.name} gained ${experienceGained} experience points.`);
    // verificar si los nuevos experiencePoints te llevan a subir de nivel
    const levelsUp: boolean =
      this.experiencePoints >= this.expForLevel(this.level + 1);
    // si se sube de nivel
    // incrementar nivel y Anunciar "[nombre] reached level [nivel]!"
    if (levelsUp) {
      this.level++;
      console.log(`${this.name} reached level ${this.level}!`);
    }
  }
}
