import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private clientId = 'ff3266c22ea34d37879378a9ddbd555e';
  private clientSecret = 'd8ccbb4a39754710b5ebc36063d5a64d'; 
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1/search';

  constructor(private http: HttpClient) {}


  private getToken(): Observable<any> {
    const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }


  getTracks(query: string = 'pop'): Observable<any> {
      
    const randomOffset = Math.floor(Math.random() * 1000);

    return this.getToken().pipe(
      switchMap((tokenData: any) => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${tokenData.access_token}`
        });
        const params = new HttpParams()
          .set('q', query)
          .set('type', 'track')
          .set('limit', '10')
          .set('offset', randomOffset.toString());

        return this.http.get(this.apiUrl, { headers, params });
      })
    );
  }
  
}