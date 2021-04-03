import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HashService } from './hash.service';
import { environment } from '../../environments/environment';

import { GenericQuery } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly apiUrl: string = environment.marvelURI;

  constructor(private readonly http: HttpClient, private readonly hashService: HashService) {}

  public responseCache = new Map();

  genericGet<T>(query: GenericQuery): Observable<T> {
    const URL = query.params
      ? `${this.apiUrl}${query['endpoint']}?${query['params']}`
      : `${this.apiUrl}${query['endpoint']}`;
    const dataFromCache = this.responseCache.get(URL);

    if (dataFromCache) {
      console.log('return from cache');
      return of(dataFromCache);
    } else {
      console.log('return from API');
      const secret = this.hashService.createSecretHash();
      const FULL_URL = query.params ? `${URL}&${secret}` : `${URL}?${secret}`;

      return this.http.get<T>(FULL_URL).pipe(
        catchError(this.handleError),
        map(data => {
          this.responseCache.set(URL, data);
          return data;
        })
      );
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
