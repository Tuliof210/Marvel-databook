import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import md5 from 'md5';

@Injectable({
  providedIn: 'root',
})
export class HashService {
  private readonly publicKey: string = environment.publicKey;
  private readonly privateKey: string = environment.privateKey;

  constructor() {}

  createSecretHash(): string {
    const time = new Date().getTime().toString();
    return `ts=${time}&apikey=${this.publicKey}&hash=${md5(
      time + this.privateKey + this.publicKey
    )}`;
  }
}
