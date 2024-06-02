import { Bot, Player } from './player';
import { Pokemon } from './pokemon';

export class Battle {
	player1: Player;
	player2: Player | Bot;

	constructor(player1: Player, player2: Player | Bot) {
		// asigna los jugadores a sus respectivos atributos
		this.player1 = player1;
		this.player2 = player2;
	}

	start() {
		// Anunciar "The battle is about to start!"
		console.log('%cThe battle is about to start!', 'font-weight: bold');

		// Preparar la batalla con prepareBattle()
		this.prepareBattle();

		// Iniciar la batalla
		console.log('%cBattle start!', 'font-weight: bold');

		// Usar un bucle para todos los turnos
		do {
			// Mostrar el estado de la batalla
			this.printBattleStatus();

			// Ambos jugadores seleccionan un movimiento
			let moveP1 = this.player1.selectMove();
			let moveP2 = this.player2.selectMove();

			// Si al seleccionar un movimiento, retorna 'true' terminar la batalla y anunciar "[nombre] run away!"
			if (moveP1 !== true && moveP2 !== true) {
				// Calcular quien atacará primero
				let firstPokemon = this.getFirstPokemon();
				let secondPokemon: Pokemon;

				if (firstPokemon === this.player1.pokemon) {
					secondPokemon = this.player2.pokemon;
				} else {
					secondPokemon = this.player1.pokemon;
				}

				// El primero ataca al segundo
				firstPokemon.attack(secondPokemon);
				
				// Si el segundo aun no se desmaya...
				if (!secondPokemon.isFainted()) {
					// El segundo ataca al primero
					secondPokemon.attack(firstPokemon);
				}
			} else {
					if (moveP1) console.log(`${this.player1.name} run away`);
					if (moveP2) console.log(`${this.player2.name} run away`);
			}

		} while (!this.player1.pokemon.isFainted() && !this.player2.pokemon.isFainted())
		// El bucle continua hasta que alguno se desmaye

		// Al terminar el bucle, identificar al ganador y al perdedor
		let winner: Pokemon;
		let loser: Pokemon;
		if (this.player1.pokemon.isFainted()) {
			winner = this.player2.pokemon;
			loser = this.player1.pokemon;
		} else {
			winner = this.player1.pokemon;
			loser = this.player2.pokemon;
		}

		// Anunciar "[perdedor] FAINTED!"
		console.log(`${loser.name} FAINTED!`);

		// Anunciar "[ganador] WINS!"
		console.log(`${winner.name} WINS!`);

		// Se procesa la victoria
		winner.processVictory(loser);
	}

	prepareBattle(): void {
		// llamar a prepareForBattle de los pokemones de ambos jugadores
		this.player1.pokemon.prepareForBattle();
		this.player2.pokemon.prepareForBattle();

		// anunciar "[judgador]sent out [POKEMON]!" para ambos jugadores
		console.log(
			`${
				this.player1.name
			} sent out ${this.player1.pokemon.name.toUpperCase()}!`
		);
		console.log(
			`${
				this.player2.name
			} sent out ${this.player2.pokemon.name.toUpperCase()}!`
		);
	}

	getFirstPokemon(): Pokemon {
		// verificar si un pokemon empieza por tener movimiento con mayor prioridad con firstByPriority
		if (this.firstByPriority() !== null) return this.firstByPriority()!;

		// verificar si un pokemon empieza por tener  mayor velocidad con firstBySpeed
		if (this.firstBySpeed() !== null) return this.firstBySpeed()!;

		// si no, elegir uno de manera aleatorio
		const playerArray = [this.player1, this.player2];
		let playerSelected = playerArray[Math.floor(Math.random() * playerArray.length)];
		return playerSelected.pokemon;
	}

	firstByPriority(): Pokemon | null {
		// retornar el pokemon con movimiento de mayor prioridad. Si igualan, retornar null
		const movePriorityP1 = this.player1.pokemon.currentMove?.priority;
		const movePriorityP2 = this.player2.pokemon.currentMove?.priority;

		return movePriorityP1 === movePriorityP2
			? null
			: movePriorityP1! > movePriorityP2!
			? this.player1.pokemon
			: this.player2.pokemon;
	}

	firstBySpeed(): Pokemon | null {
		// retornar el pokemon de mayor velocidad. Si igualan, retornar null
		const speedPlayer1 = this.player1.pokemon.stats.speed;
		const speedPlayer2 = this.player2.pokemon.stats.speed;

		return speedPlayer1 === speedPlayer2
			? null
			: speedPlayer1 > speedPlayer2
			? this.player1.pokemon
			: this.player2.pokemon;
	}

	printBattleStatus() {
		// usar console.table para mostrar el status de la batalla (player, pokemon, level, currentHp)
		const playerStatus1 = {
			player: this.player1.name,
			pokemon: this.player1.pokemon.name,
			level: this.player1.pokemon.level,
			HP: this.player1.pokemon.currentHp,
		};

		const playerStatus2 = {
			player: this.player2.name,
			pokemon: this.player2.pokemon.name,
			level: this.player2.pokemon.level,
			HP: this.player2.pokemon.currentHp,
		};

		console.table([playerStatus1, playerStatus2]);
	}
}
