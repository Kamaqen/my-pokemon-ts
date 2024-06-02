import { Pokemon } from "./pokemon";
import { randomBetween } from "./utils";

export class Player {
  name: string;
  pokemon: Pokemon;

  constructor(
    name: string,
    species: string,
    pokeName: string,
    level: number = 1
  ) {
    // Asignar name a un atributo con el mismo nombre
    this.name = name;
    // Crear un Pokemon con el resto de parámetros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove(): void | true {
    // Mostrar al usuario los movimientos disponibles
    const moves: string[] = this.pokemon.moves;
    const movesString = moves.join("\n");
    let response = moves[0];

    // Volver a pedir si ingresa un movimiento inválido
    do {
      if (response !== null) {
        response = prompt(
          `Elige un movimiento:\n${movesString}\n`,
          response
        )?.toLowerCase()!;
      } else {
        console.log("return true");
        return true;
      }

      // Mostrar alerta si el movimiento ingresado no es válido
      if (response !== null && !moves.includes(response)) {
        alert("Opción no válida. Por favor, elige un movimiento de la lista.");
      }
    } while (response !== null && !moves.includes(response));

    // Asigna el movimiento con 'setCurrentMove'
    if (response !== null) {
      this.pokemon.setCurrentMove(response);
      console.log(this.pokemon.currentMove);
    }
  }
}

export class Bot extends Player {
  selectMove(): void | true {
    // Selecciona un movimiento de manera aleatoria
    const lastMoveIndex = this.pokemon.moves.length - 1;
    const moveIndex = randomBetween(0, lastMoveIndex);
    const moveSelected = this.pokemon.moves[moveIndex];

    // Los asigna con 'setCurrentMove'
    this.pokemon.setCurrentMove(moveSelected);
    console.log(this.pokemon.currentMove);
  }
}
