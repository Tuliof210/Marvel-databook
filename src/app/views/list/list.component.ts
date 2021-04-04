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

  total: number = 0;
  limit: number = 10;
  page: number = 0;

  query = {
    nameStartsWith: '',
    orderBy: '-modified',
  };

  marvelCharacters: Character[] = [];

  showBTN: boolean = false;
  inRequestProcess: boolean = false;
  delayRef: number = 50;

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

  beforeRequest(): void {
    this.inRequestProcess = true;
  }
  afterRequest(): void {
    this.page++;
    this.showBTN = false;
    this.inRequestProcess = false;
  }

  requestMarvelCharacters(): void {
    this.beforeRequest();
    this.httpService
      .genericGet({
        endpoint: '',
        params: `${this.query.nameStartsWith}&orderBy=${this.query.orderBy}&limit=${this.limit}&offset=${
          this.page * this.limit
        }`,
      })
      .pipe(
        map(data => data),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        (characters: any) => {
          this.total = characters['data']['total'];
          this.afterRequest();

          characters['data']['results'].forEach((character, i) => this.lazyDisplayData(character, this.delayRef * i));
          setTimeout(() => {
            this.showBTN = this.marvelCharacters.length < this.total;
          }, this.delayRef * characters['data']['results'].length);
        },
        err => {
          console.log({ err });
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

  displayBtn(delay) {
    setTimeout(() => {
      this.showBTN = true;
    }, delay);
  }

  getImageLink(thumb: any, variant: string): string {
    return thumb
      ? thumb['path'] + '/' + variant + '.' + thumb['extension']
      : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/' + variant + '.jpg';
    // List of Image Variants https://developer.marvel.com/documentation/images
  }

  // Handle filters
  catchFilters(filter) {
    console.log(filter);
    if (!this.sameFilter(filter)) {
      this.resetRequests(filter);
      this.requestMarvelCharacters();
    }
  }

  resetRequests(filter: any) {
    this.page = 0;
    this.total = 0;
    this.marvelCharacters = [];
    this.query = { ...filter };
  }

  sameFilter(filter) {
    return this.query['nameStartsWith'] === filter['nameStartsWith'] && this.query['orderBy'] === filter['orderBy'];
  }
}
