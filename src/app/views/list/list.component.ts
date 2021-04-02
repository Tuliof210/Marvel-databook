import { Component, HostListener, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// services
import { HttpService } from '../../services/http.service';

interface Character {
  id: number;
  name: string;
  thumbNail?: string | boolean;
}

@Component({
  selector: 'view-list',
  templateUrl: './list.template.html',
  styleUrls: ['./list.style.scss'],
})
export class ListComponent implements OnInit {
  private readonly _ngUnsubscribe$: Subject<any> = new Subject();

  limit: number = 50;
  page: number = 0;
  marvelCharacters: Character[] = [];

  constructor(private readonly httpService: HttpService) {}

  ngOnInit(): void {
    this.requestMarvelHeroes();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  requestMarvelHeroes(): void {
    this.httpService
      .genericGet({
        endpoint: '',
        params: `orderBy=name&limit=${this.limit}&offset=${this.page * this.limit}`,
      })
      .pipe(
        map(data => data),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        (response: any) => {
          this.formatResponseData(response.data.results);
        },
        err => {
          console.log({ err });
        },
        () => {
          this.page++;
          if (this.page < 6) this.requestMarvelHeroes();
          else console.log(this.marvelCharacters);
        }
      );
  }

  formatResponseData(characters: object[]): void {
    characters.forEach(character => {
      this.marvelCharacters.push({
        id: character['id'],
        name: character['name'],
        thumbNail: character['thumbnail']['path'] || false,
      });
    });
  }
}
