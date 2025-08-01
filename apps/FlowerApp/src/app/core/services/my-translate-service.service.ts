import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
  signal,
} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private render2: Renderer2;
  private readonly currentLanguage = signal<string>('en');

  constructor(
    private _translaateServices: TranslateService,
    @Inject(PLATFORM_ID) private id: object,
    private render: RendererFactory2
  ) {
    this.render2 = this.render.createRenderer(null, null);
    if (isPlatformBrowser(this.id)) {
      this._translaateServices.setDefaultLang('en');

      const saveLanguage = localStorage.getItem('lang');

      if (saveLanguage) {
        this._translaateServices.use(saveLanguage!);
      }

      this.changeDiraction();
    }
  }
  setCurrentLang(lang: string) {
    this.currentLanguage.set(lang);
    //this.cookieUtils.setCookie(this.storageKey, theme);
  }
  geturrentLang() {
    return this.currentLanguage();
    //this.cookieUtils.setCookie(this.storageKey, theme);
  }
  get(keys: string | string[]) {
    return this._translaateServices.get(keys);
  }

  get currentLang(): string {
    return this._translaateServices.currentLang;
  }
  get onLangChange(): Observable<LangChangeEvent> {
    return this._translaateServices.onLangChange;
  }

  //  changeDiraction():void
  //  {
  //   if(localStorage.getItem('lang') === 'en')
  //   {
  //     this.render2.setAttribute(document.documentElement, 'dir' ,'ltr');
  //     this.render2.setAttribute(document.documentElement, 'lang' ,'en');

  //   }
  //   else if(localStorage.getItem('lang') === 'ar')
  //   {
  //     this.render2.setAttribute(document.documentElement, 'dir' ,'ltr');
  //     this.render2.setAttribute(document.documentElement, 'lang' ,'ar');
  //   }
  //  }

  changeDiraction(): void {
    const lang = localStorage.getItem('lang');

    if (lang === 'en') {
      this.render2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.render2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (lang === 'ar') {
      this.render2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.render2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  changeTranslateLange(lang: string): void {
    localStorage.setItem('lang', lang);
    this.setCurrentLang(lang);
    this._translaateServices.use(lang);

    this.changeDiraction();
  }
}
