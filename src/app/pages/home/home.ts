import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from '../../services/pokemon';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonList } from '../../components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PokemonList
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  private pokemonService = inject(PokemonService);
  private cdr = inject(ChangeDetectorRef);

  pokemons: Pokemon[] = [];

  ngOnInit(): void {

    console.log("HOME INICIADO");

    this.pokemonService.getPokemons().subscribe({
    next: (data) => {

      console.log("DATOS RECIBIDOS:", data);

      this.pokemons = data;

      console.log("POKEMONS DESPUES:", this.pokemons.length);

      this.cdr.detectChanges();

    },
    error: (err) => {
      console.error(err);
    }
  });

  }

}