import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvServiceService {
  ENDPOINT_PRIMARY = '';
  ENDPOINT_SECONDARY = '';
  ENDPOINT_TERTITARY = '';
  ENDPOINT_SOCKET = '';

  APP_MANAGEMENT = '';
  APP_API = '';
  APP_PREREGISTRO = '';
  APP_SERVICE_RESIDENTIAL = '';
  GESTOR_V2 = '';

  SECRET_KEY = '';

  constructor() {}
}
