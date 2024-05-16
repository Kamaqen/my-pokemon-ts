// Versión síncrona:
// Crear un nuevo Game y llamar al método start

// Versión asíncrona:
// Iniciar un contador de 10 segundos antes de empezar el juego
// Inciar un intervalo para mostras los segundos restantes en la consola
// Recuerda 'cancelar' el intervalo cuando llegue a 0 segundos

import { Pokemon } from "./pokemon";

const poke = new Pokemon("Spearow");
console.log(poke.type);
console.log(poke.growthRate);
console.log(poke.baseExp);
console.log(poke.experiencePoints);
console.log(poke.setCurrentMove("peck"));
console.log(poke.isFainted);
