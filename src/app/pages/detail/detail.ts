import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon';
import { PokemonDetail } from '../../interfaces/pokemon-detail';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail implements OnInit {

  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private cdr = inject(ChangeDetectorRef);
  private favoritesService = inject(FavoritesService);

  pokemon!: PokemonDetail;

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.pokemonService.getPokemonById(id)
      .subscribe({
        next: (data) => {
          this.pokemon = {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,

            height: data.height,
            weight: data.weight,

            types: data.types.map((type: any) => type.type.name),
            abilities: data.abilities.map((ability: any) => ability.ability.name)
          };

          console.log(this.pokemon);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  agregarFavorito(){
    this.favoritesService.addFavorite({
      pokemonId: Number(this.pokemon.id),
      name: this.pokemon.name,
      image: this.pokemon.image,
      note: 'Mi pokemon favorito'
    })
    .subscribe(data=>{
      console.log(
        "Guardado:",
        data
      );
    });
  }

}