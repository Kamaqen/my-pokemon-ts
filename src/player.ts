import { Pokemon } from "./pokemon";
import randomBetween from "./utils";

export class Player {
  name: string;
  pokemon: Pokemon;
  
  constructor(name: string, species: string, pokeName: string, level: number = 1) {
    // asignar name a un atributo con el mismo nombre
    this.name = name;
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(species, pokeName, level);
  }

  selectMove(): void | true {
    // mostrar al usuario los movimientos disponibles
    const moves: string[] = this.pokemon.moves;
    const movesString = moves.join('\n');
    let response = moves[0];
    // Volver a pedir si ingresa un movimiento invalido
    do {
      if(response || response === "") {
        response = prompt(`Elige un movimiento:\n${movesString}\n`, response)?.toLowerCase()!;
      } else {
        console.log("return true");
        return true;
      }
    } while(!moves.includes(response))
      // TODO: agregar el mensaje de opción no válida

    // Asigna el movimiento con 'setCurrentMove'
    this.pokemon.setCurrentMove(response);
    console.log(this.pokemon.currentMove);
  }
}

export class Bot extends Player {
  selectMove() {
    // selecciona un movimiento de manera aleatoria
    const lastMoveIndex =  this.pokemon.moves.length -1;
    const moveIndex = randomBetween(0, lastMoveIndex);
    const moveSelected = this.pokemon.moves[moveIndex];
    // los asigna con 'setCurrentMove'
    this.pokemon.setCurrentMove(moveSelected);
    console.log(this.pokemon.currentMove);
  }
}

