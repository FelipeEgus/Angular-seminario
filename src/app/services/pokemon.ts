
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(limit: number = 135): Observable<Pokemon[]> {
    return this.http
      .get<{ results: { name: string; url: string }[] }>(
        `${this.apiUrl}?limit=${limit}&offset=251`
      ).pipe(switchMap(response =>forkJoin(response.results.map
        (pokemon => this.http.get<any>(pokemon.url).pipe(map(data => ({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default
          })))
      ))));
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );
  }
}