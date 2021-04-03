import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// Services
import { HttpService } from '../../services/http.service';
// Interfaces
import { Character } from '../../common/interfaces';

@Component({
  selector: 'view-list',
  templateUrl: './list.template.html',
  styleUrls: ['./list.style.scss'],
})
export class ListComponent implements OnInit {
  private readonly _ngUnsubscribe$: Subject<any> = new Subject();

  delayRef: number = 50;

  limit: number = 20;
  page: number = 0;
  orderBy: string = '-modified';

  marvelCharacters: Character[] = [];

  constructor(private readonly router: Router, private readonly httpService: HttpService) {}

  ngOnInit(): void {
    this.requestMarvelCharacters();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  seeMore(id: number): void {
    this.router.navigate(['/details/' + id]);
  }

  requestMarvelCharacters(): void {
    this.httpService
      .genericGet({
        endpoint: '',
        params: `orderBy=${this.orderBy}&limit=${this.limit}&offset=${this.page * this.limit}`,
      })
      .pipe(
        map(data => data),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        (characters: any) => {
          characters['data']['results'].forEach((character, i) => {
            this.lazyDisplayData(character, this.delayRef * i);
          });
        },
        err => {
          console.log({ err });
        },
        () => {
          this.page++;
        }
      );
  }

  lazyDisplayData(character, delay) {
    setTimeout(() => {
      this.marvelCharacters.push({
        id: character['id'],
        name: character['name'] || 'Unknown',
        thumbNail: this.getImageLink(character['thumbnail'], 'standard_xlarge'),
      });
    }, delay);
  }

  getImageLink(thumb: any, variant: string): string {
    return thumb
      ? thumb['path'] + '/' + variant + '.' + thumb['extension']
      : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/' + variant + '.jpg';
    // List of Image Variants https://developer.marvel.com/documentation/images
  }
}
