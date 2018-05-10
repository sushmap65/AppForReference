import {
  enableDebugTools,
  disableDebugTools
} from '@angular/platform-browser';
import {
  ApplicationRef,
  enableProdMode
} from '@angular/core';

let PROVIDERS: any[] = [
];

let _decorateModuleRef = <T>(value: T): T => value;

if ('production' === ENV) {
  enableProdMode();

  _decorateModuleRef = (modRef: any) => {
    disableDebugTools();

    return modRef;
  };

  PROVIDERS = [
    ...PROVIDERS,
  ];

} else {

  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    const _ng = (window as any).ng;
    enableDebugTools(cmpRef);
    (window as any).ng.probe = _ng.probe;
    (window as any).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };

  PROVIDERS = [
    ...PROVIDERS,
  ];

}

export const decorateModuleRef = _decorateModuleRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
