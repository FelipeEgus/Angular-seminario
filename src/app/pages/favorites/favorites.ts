import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { PokemonForm } from '../../components/pokemon-form/pokemon-form';
import { FavoritesService } from '../../services/favorites';
import { Favorite } from '../../interfaces/favorite';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [PokemonForm],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss'
})
export class Favorites implements OnInit {

  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  favorites: Favorite[] = [];

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  cargarFavoritos(): void {
    this.favoritesService.getFavorites().subscribe({
      next: (data) => {
        console.log("FAVORITOS CRUDOS: ", data)
        this.favorites = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  guardar(favorite: Favorite): void {
    this.favoritesService.updateFavorite(favorite).subscribe({
      next: () => { 
        this.cargarFavoritos(); 
      },
      error: (err) => { 
        console.error(err); 
      }
    });
  }

  eliminar(id: string): void {
    console.log(id);
    this.favoritesService.deleteFavorite(id).subscribe({
      next: () => {
        this.cargarFavoritos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  } 

}