import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';



@Component({
  imports: [RouterModule, ButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FlowerApp';



 private readonly myTranslate = inject(MyTranslateService);
  private readonly translateService = inject(TranslateService);

  isArabic = false;

  ngOnInit(): void {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translateService.use(savedLang);
    this.setDirection(savedLang);

    this.translateService.onLangChange.subscribe(event => {
      this.setDirection(event.lang);
    });
  }

  change(lang: string): void {
    this.myTranslate.changeTranslateLange(lang);
    this.setDirection(lang);
  }

  setDirection(lang: string): void {
    this.isArabic = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = this.isArabic ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', this.isArabic ? 'rtl' : 'ltr');
  }

  currentLanguage(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }

}
