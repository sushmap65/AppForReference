import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { MomentModule } from 'angular2-moment';
import { CsvService } from 'angular2-json2csv';
import {
  NgModule,
  ApplicationRef,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { EtaComponent } from './components/eta';
import { ROUTES } from './app.routes';
import { ENV_PROVIDERS } from './environment';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { declarations } from './declarations';

import {
  AuthenticationService,
  AlertService,
  LocalStorageService,
  MissionService,
  AuthGuardService,
  GoogleMarkerService
} from './services';

// CSS loader
import '../styles/fontStyle.scss';
import '../styles/global.css';
import '../styles/materialize.min.css';

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
  ];

const imports = [
  BrowserModule,
  MomentModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule,
  MyDatePickerModule,
  BrowserAnimationsModule,
  ToastModule.forRoot(),
  RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
  }),
  AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB_APIgbjs7IUrqq3ULqj1ykxSY1w2sJIk',
      libraries: ['places']
  })
];

const providers = [
  ENV_PROVIDERS,
  APP_PROVIDERS,
  AlertService,
  AuthenticationService,
  LocalStorageService,
  MissionService,
  CsvService,
  AuthGuardService,
  GoogleMarkerService
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations,
  imports,
  providers,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    this.appState._state = store.state;
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues  = createInputTransfer();
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
