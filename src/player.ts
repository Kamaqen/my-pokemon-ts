import { Pokemon } from "./pokemon";

export class Player {
  name: string;
  pokemon: Pokemon;
  
  constructor(name: string, species: string, pokeName: string, level: number = 1) {
    // asignar name a un atributo con el mismo nombre
    this.name = name;
    // crear un Pokemon con el resto de parametros y asignarlo al atributo pokemon
    this.pokemon = new Pokemon(species, pokeName, level);
    
  }

  selectMove() {
    // mostrar al usuario los movimientos disponibles
    const moves: string[] = this.pokemon.moves;
    const movesString = moves.join('\n');
    let response = moves[0];
    // Volver a pedir si ingresa un movimiento invalido
    do {
      if(response) {
        response = prompt(`Elige un movimiento:\n${movesString}\n`, response)?.toLowerCase()!;
      } else {
        console.log("return true");
        return true
      }
    } while(!moves.includes(response))

    // Asigna el movimiento con 'setCurrentMove'
    this.pokemon.setCurrentMove(response);
    console.log(this.pokemon.currentMove);
  }
}

export class Bot extends Player {
  selectMove() {
    // selecciona un movimiento de maner aleatoria
    // los asigna con 'setCurrentMove'
  }
}

