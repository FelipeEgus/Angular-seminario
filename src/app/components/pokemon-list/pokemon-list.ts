import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonCard } from '../pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    PokemonCard
  ],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss'
})
export class PokemonList {

  @Input() pokemons: Pokemon[] = [];

}