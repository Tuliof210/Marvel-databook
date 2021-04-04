import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// Services
import { HttpService } from '../../services/http.service';
// Interfaces
import { FullCharacter } from '../../common/interfaces';

@Component({
  selector: 'view-details',
  templateUrl: './details.template.html',
  styleUrls: ['./details.style.scss'],
})
export class DetailsComponent implements OnInit {
  private readonly _ngUnsubscribe$: Subject<any> = new Subject();

  limit: number = 10;
  page: number = 0;
  orderBy: string = '-modified';

  id: string;
  character: FullCharacter;

  additionalDataKey: string[] = ['comics', 'events'];

  constructor(private readonly router: Router, private readonly httpService: HttpService) {}

  ngOnInit(): void {
    this.id = this.getCharId(this.router.url);
    this.requestAllData();
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }

  getCharId(path: string): string {
    return path.split('/').pop();
  }

  async requestAllData(): Promise<void> {
    await this.requestCharacterData();
    // await request char, then populate char
    this.additionalDataKey.forEach(key => this.requestAdditionalData(key));
  }

  requestCharacterData(): Promise<void> {
    return new Promise(resolve =>
      this.httpService
        .genericGet({
          endpoint: `/${this.id}`,
          params: '',
        })
        .pipe(
          map(data => data),
          takeUntil(this._ngUnsubscribe$)
        )
        .subscribe(
          (response: any) => {
            const character = response['data']['results'][0];
            this.character = {
              id: character.id,
              name: character.name || 'Unknown',
              thumbNail: this.getImageLink(character['thumbnail'], 'detail'),
              description: character.description || 'There is no description available for this character',
              link: character.urls ? character.urls[0]['url'] : '',
              comics: [],
              events: [],
            };
          },
          err => console.log({ err }),
          () => {
            console.log({ character: this.character });
            resolve();
          }
        )
    );
  }

  requestAdditionalData(typeofData: string): void {
    this.httpService
      .genericGet({
        endpoint: `/${this.id}/${typeofData}`,
        params: `orderBy=${this.orderBy}&limit=${this.limit}&offset=${this.page * this.limit}`,
      })
      .pipe(
        map(data => data),
        takeUntil(this._ngUnsubscribe$)
      )
      .subscribe(
        (response: any) => {
          response['data']['results'].forEach(item => {
            this.character[typeofData].push({
              id: item.id,
              title: item.title || 'Unknown',
              thumbNail: this.getImageLink(item['thumbnail'], 'portrait_xlarge'),
              link: item.urls ? item.urls[0]['url'] : '',
            });
          });
        },
        err => console.log({ err }),
        () => {
          console.log({ [typeofData]: this.character[typeofData] });
        }
      );
  }

  getImageLink(thumb: any, variant: string): string {
    return thumb
      ? thumb['path'] + '/' + variant + '.' + thumb['extension']
      : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/' + variant + '.jpg';
    // List of Image Variants https://developer.marvel.com/documentation/images
  }

  openRedirect(link: string) {
    window.open(link, '_blank');
  }
}
