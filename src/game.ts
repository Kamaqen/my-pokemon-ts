import { Player } from "./player";
import { capitalize } from "./utils";

export default class Game {
  player: Player | undefined;
  constructor(player?: Player | undefined) {
    this.player = player;
  }
  start() {
    // llamar a welcome para el proceso de bienvenida y obtener el arreglo [name, pokemon, pokemonName]
    const userInput = Game.welcome();
    // crear un Player con la info obtenida (tu pokemon empieza con nivel 3 por defecto). Asignarlo al atributo 'player'
    const newPlayer = new Player(
      userInput[0]!,
      userInput[1]!,
      userInput[2]!,
      3
    );
    this.player = newPlayer;
    console.log(this.player, this.player.pokemon);
    // Empezar el bucle del juego
    while (true) {
      // Usar menu() para pedir al usuario que elija entre Train, Leader o Stats
      const choice = Game.menu();
      if (choice !== null) {
        console.log(choice);
        // Ejecutar train(), challengeLeader() o showStats() segun la opción del usuario
        switch (choice) {
          case "Entrenar":
            this.train();
            break;
          case "Estadísticas":
            this.showStats();
            break;
          case "Líder":
            this.challengeLeader();
            break;
          // Continuar el bucle hasta que el usuario aprete Cancel
          default:
            alert("Opción no válida.");
        }
      } else {
        // Llamar a goodbye para la despedida
        Game.goodbye();
        break;
      }
    }
  }

  train() {
    // Crear un Bot llamado "Random Person", con un Pokemon aleatorio de nivel entre 1 y 5
    // Anunciar "[nombre] challenges [oponente] for training"
    // Anunciar "[oponente] has a [pokemon] level [nivel]"
    // Usar confirm() para preguntar al usuario si quiere pelear "Do you want to fight?"
    // Si, sí quiere pelear
    // Crear una Batalla entre el player y el oponente
    // empezar la batalla con su start
  }

  challengeLeader() {
    // mismo mecanismo que train() pero el Bot se llama Brock y usa un Onix nivel 10
  }

  showStats() {
    // Usar console.table para presentar las estadísticas de tu Pokémon
    const {
      species,
      level,
      type,
      experiencePoints,
      stats: { hp, attack, defense, specialAttack, specialDefense, speed },
    } = this.player.pokemon;

    const tipo = type.join(", ");
    const statsTable = [
      { Atributo: "Especie", Valor: species },
      { Atributo: "Nivel", Valor: level },
      { Atributo: "Tipo", Valor: tipo },
      { Atributo: "Puntos de Experiencia", Valor: experiencePoints },
      { Atributo: "Puntos de Salud", Valor: hp },
      { Atributo: "Ataque", Valor: attack },
      { Atributo: "Defensa", Valor: defense },
      { Atributo: "Ataque Especial", Valor: specialAttack },
      { Atributo: "Defensa Especial", Valor: specialDefense },
      { Atributo: "Velocidad", Valor: speed },
    ];

    console.table(statsTable);
  }

  static welcome() {
    alert(`Bienvenido a Pokémon TS Edition!

¡Hola! ¡Bienvenido al mundo de los POKÉMON! ¡Mi nombre es OAK! ¡La gente me llama el PROFESOR POKÉMON!

Este mundo está habitado por criaturas llamadas POKÉMON. Para algunas personas, los POKÉMON son mascotas. Otros los usan para luchar.

Yo, particularmente,... estudio a los POKÉMON como profesión.`);

    const name = prompt("Primero, ¿cuál es tu nombre?", "Ash");

    alert(`¡Perfecto! Entonces tu nombre es ${name!.toUpperCase()}!

¡Tu propia leyenda de POKÉMON está a punto de comenzar! ¡Un mundo de sueños y aventuras con POKÉMON te espera! ¡Vamos!

Aquí, ¡${name!.toUpperCase()}! ¡Aquí hay 3 POKÉMON!

Cuando joven, yo era un entrenador de POKÉMON serio. A mi avanzada edad, solo me quedan 3, ¡pero puedes tomar uno!`);

    const shownOptions = ["Bulbasaur", "Charmander", "Squirtle"];
    const validOptions = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"];
    let pokemon;
    while (true) {
      pokemon = prompt(
        `Elige tu pokemon:\n${shownOptions.join("\n")}`,
        shownOptions[0]
      );

      if (pokemon === null) {
        alert("Debes elegir un Pokémon.");
        continue; // Volver a pedir la selección
      }

      pokemon = capitalize(pokemon);

      if (!validOptions.includes(pokemon)) {
        alert("Opción no válida");
      }

      const pokemonName =
        prompt("Puedes ponerle un nombre a tu Pokémon:", pokemon) || pokemon;

      alert(`${name!.toUpperCase()}, ¡cría a tu joven ${pokemonName.toUpperCase()} haciéndolo luchar!

Cuando te sientas preparado, puedes desafiar a BROCK, el LÍDER del GIMNASIO de PEWTER`);

      return [name, pokemon, pokemonName];
    }
  }

  static menu(): string | null {}

  static goodbye() {
    console.log(
      "%cGracias por jugar Pokémon TS Edition.",
      "font-weight: bold; color: teal"
    );
    console.log(
      "%cEste juego fue creado con amor y muchos anys.",
      "color: turquoise"
    );
  }
}
