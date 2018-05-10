import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
public set(name, data) {
	localStorage.setItem('lg-' + name, JSON.stringify(data));
}

public get(name) {
  const data = JSON.parse(localStorage.getItem('lg-' + name));
  if (!data) {
  	return undefined;
  }
  if (name) {
   return data;
  } else {
    return undefined;
  }
}

public delete(name) {
  localStorage.removeItem('lg-' + name);
}
}
