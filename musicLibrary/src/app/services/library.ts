import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private apiUrl = 'http://localhost:5555/songs';

  constructor(private http: HttpClient) {}

  getSongs() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addSong(song: any) {
    return this.http.post(this.apiUrl, song);
  }

  removeSong(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}