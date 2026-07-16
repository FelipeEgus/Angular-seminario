import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../interfaces/favorite';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private http = inject(HttpClient);
  private apiUrl = 'https://6a4fd52ff45d5352b611e8a6.mockapi.io/favorites';

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(this.apiUrl);
  }

  addFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.post<Favorite>(this.apiUrl, favorite);
  }

  updateFavorite(favorite: Favorite): Observable<Favorite> {
    return this.http.put<Favorite>(`${this.apiUrl}/${favorite.id}`,favorite);
  }

  deleteFavorite(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}