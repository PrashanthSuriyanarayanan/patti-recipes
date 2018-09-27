import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppState } from '../store/app.reducer';
import { State } from './store/auth.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    return this.store.select('auth').pipe(
      map((authState: State) => {
        return authState.authenticated;
      })
    );
    // return this.auth.isAuthenticated();
  }
}
