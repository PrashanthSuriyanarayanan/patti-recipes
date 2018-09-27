import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '../../../node_modules/@angular/core';

import { Store } from '../../../node_modules/@ngrx/store';
import { AppState } from '../store/app.reducer';
import { State } from '../auth/store/auth.reducer';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: State) => {
        const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
        return next.handle(copiedReq);
      })
    );

    // const params = req.params.append('auth', this.authService.getToken());
    // const copiedReq = req.clone({ params: params });
    // return next.handle(copiedReq);
  }
}
