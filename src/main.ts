// Versión síncrona:
// Crear un nuevo Game y llamar al método start

// Versión asíncrona:
// Iniciar un contador de 10 segundos antes de empezar el juego
// Inciar un intervalo para mostras los segundos restantes en la consola
// Recuerda 'cancelar' el intervalo cuando llegue a 0 segundos

import { Player } from "./player";
import { Pokemon } from "./pokemon";

// const myPoke = new Pokemon("Squirtle");
// const opponentPoke = new Pokemon("Onix");
// console.log(myPoke.type);
// console.log(opponentPoke.type);
// console.log(myPoke.growthRate);
// console.log(myPoke.baseExp);
// console.log(myPoke.experiencePoints);
// myPoke.setCurrentMove("bubble");
// console.log(myPoke.stats);
// console.log(opponentPoke.stats);
// console.log(myPoke.calculateEffectiveness(opponentPoke));
// console.log(myPoke.calculateBaseDamage(opponentPoke));
// myPoke.attack(opponentPoke);
// console.log(myPoke.level);
// console.log(myPoke.expForLevel(myPoke.level + 1));
// myPoke.processVictory(opponentPoke);

// console.log(myPoke.isFainted());

const player = new Player("Ash", "Bulbasaur", "Bulbasaur", 1);
player.selectMove();