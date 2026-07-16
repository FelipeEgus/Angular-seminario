import { Component, Input, inject } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss'
})
export class PokemonCard {
  @Input() pokemon!: Pokemon;

  private router = inject(Router);

  verDetalle() {
    this.router.navigate([
      '/pokemon',
      this.pokemon.id
    ]);
  }
}