import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Credentials {
  // Customize received credentials here
  token: string;
  username: string;
  expiration_token: number;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

@Injectable()
export class AuthenticationService {
  private _credentials: Credentials | null;
  private minutesToExpirate: number = 30;

  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);

    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      token: '123456',
      username: context.username,
      expiration_token: Date.now()
    };

    this.setCredentials(data, context.remember);

    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this.setCredentials();

    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !this.isSessionExpired();
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Validate the expiration token.
   * @return {boolean} exists and is valid the current expiration token.
   */
  private isSessionExpired(): boolean {
    let expired: boolean = true;

    if (this.credentials) {
      const token = this.credentials.expiration_token;

      if (((Date.now() - token) / (1000 * 60)) < this.minutesToExpirate) {
        expired = false;
      } else {
        this.setCredentials();
      }
    }

    return expired;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;

      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }
}
