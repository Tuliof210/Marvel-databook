import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HashService } from './hash.service';
import { environment } from '../../environments/environment';

interface GenericQuery {
  endpoint: string;
  params: string;
}
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly apiUrl: string = environment.marvelURI;

  constructor(
    private readonly http: HttpClient,
    private readonly hashService: HashService
  ) {}

  genericGet<T>(query: GenericQuery): Observable<T> {
    const secret = this.hashService.createSecretHash();
    const url = `${this.apiUrl}${query['endpoint']}?${secret}&${query['params']}`;
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
