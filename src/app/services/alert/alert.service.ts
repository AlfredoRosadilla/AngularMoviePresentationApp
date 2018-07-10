import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

/**
 * AlertService will be handle by promises instead of Observers
 * this is just for show up knowledged.
 */
@Injectable()
export class AlertService {
  public alert: any = {};
  private resolveLastPromise: any = null;

  constructor(private translate: TranslateService) {
    this.resetAlertConfig();
    this.alert.timer = null;
   }

  // show an alert and resolve promise when the alert is closed
  showAlert(type?: string, externalConfig?: any): Promise<any> {
    return new Promise((resolve: any) => {
      const alertConfig = this.alert;

      this.closeAlert().then(() => {
        if (!this.alert.fixed) {
          this.resolveLastPromise = resolve;

          if (alertConfig.allowedTypes.indexOf(type) !== -1) {
            this.renderAlert(type, externalConfig).then(() => resolve());
          } else {
            const defaultValues = alertConfig.default;

            this.renderAlert(defaultValues.type, {
              text: defaultValues.text,
              solution: defaultValues.solution
            }).then(() => resolve());
          }
        } else {
          resolve();
        }
      });
    });
  }

  strictClose(): Promise<any> {
    this.alert.fixed = false;

    return this.closeAlert();
  }

  closeAlert(): Promise<any> {
    return new Promise((resolve: any) => {
      if (this.alert.fixed) { resolve(); }

      if (this.alert.render) {
        this.alert.classes = `${this.alert.type} disapear`;

        if (this.alert.timer) {
          clearTimeout(this.alert.timer);
        }

        this.alert.timer = setTimeout(() => {
          this.resetAlertConfig();

          if (this.resolveLastPromise) {
            this.resolveLastPromise();
            this.resolveLastPromise = null;
          }
          resolve();
        }, 800);
      } else {
        resolve();
      }
    });
  }

  private resetAlertConfig() {
    Object.assign(this.alert, {
      render: false,
      classes: '',
      type: 'error',
      text: '',
      solution: '',
      fixed: false,
      translate: [],
      allowedTypes: [
        'error',
        'success',
        'information',
      ],
      lifeTime: 5000,
      default: {
        type: 'error',
        text: 'Error.',
        solution: 'Please contact an admin',
      }
    });
  }

  private translateText(externalConfig: any) {
    return new Promise((resolve: any) => {
      if (externalConfig.translate && externalConfig.translate instanceof Array) {
        const result = externalConfig;
        const arrTransformed: string[] = [];

        result.translate.forEach((key: string) => {
          if (typeof key === 'string' && typeof result[key] === 'string' && result[key]) {
            result[key] = `alert_${ result[key].trim().toLowerCase().replace(new RegExp(' ', 'g'), '-') }`;
            arrTransformed.push(key);
          }
        });

        forkJoin(arrTransformed.map((key: string) => this.translate.get(result[key]))).subscribe((data: any) => {
          arrTransformed.forEach((key: string, index: number) => {
            result[key] = data[index];
          });

          resolve(result);
        });
      } else {
        resolve(externalConfig);
      }
    });
  }

  private renderAlert(type: string, externalConfig: any): Promise<any> {
    return new Promise((resolve: any) => {
      this.translateText(externalConfig).then((parsedConfig) => {
        Object.assign(this.alert, { type, classes: type }, parsedConfig);

        this.alert.render = true;

        if (!this.alert.fixed) {
          this.alert.timer = setTimeout(() => {
            this.closeAlert().then(() => resolve());
          }, this.alert.lifeTime);
        }
      });
    });
  }
}
