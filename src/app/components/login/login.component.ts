import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, AlertService, ThemeService } from '@app/services';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error = '';
  public loginForm: FormGroup;
  public isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private themeService: ThemeService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.themeService.setTheme(this.themeService.themeList[0]);
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authenticationService.login(this.loginForm.value)
        .pipe(finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }))
        .subscribe(credentials => {
          this.router.navigate(['/home'], { replaceUrl: true });
        }, (error: any) => {
          log.error(error);
          this.error = error;
          this.alertService.showAlert();
        });
    }
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }
}
