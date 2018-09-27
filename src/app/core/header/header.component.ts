import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorageService: DataStorageService,
    public auth: AuthService,
    private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    // this.onFetch();
    this.authState = this.store.select('auth');
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSave() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: HttpEvent<object>) => {
          console.log(response);
        },
        (err) => alert(err)
      );
  }

  onFetch() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.auth.logout();
  }
}
