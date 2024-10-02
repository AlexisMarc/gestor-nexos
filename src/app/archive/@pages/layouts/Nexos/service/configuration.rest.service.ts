import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationRestService {
 
  //server principal
  endpoint = 'https://apiasambleas.grupoempresarialnexos.com/app-management/';
  endpoint2 = 'https://apiasambleas.grupoempresarialnexos.com/app/Api/';
  endpoint3 = 'https://apiasambleas.grupoempresarialnexos.com/app-preregistro/';
  endpoint4 = 'https://asambleas.grupoempresarialnexos.com/';
  endpoint5 = 'https://apiasambleas.grupoempresarialnexos.com/app/ServicesResidential/';
  endpoint6 = 'https://apiasambleas.grupoempresarialnexos.com/gestor-v2/';
  endpointSocket = 'wss://socket.grupoempresarialnexos.com:3000';
  //// endpoint6 = 'https://apiasambleas.grupoempresarialnexos.com/management/';
   

  // Server de prueba
  // endpoint = 'https://apiservices.grupogift.com/app-management/';
  // endpoint2 = 'https://apiservices.grupogift.com/app/Api/';
  // endpoint3 = 'https://apiservices.grupogift.com/app-preregistro/';
  // endpoint4 = 'https://apiservices.grupogift.com/';
  // endpoint5 = 'https://apiservices.grupogift.com/app/ServicesResidential/';  
  // endpoint6 = 'https://apiservices.grupogift.com/management/';
  //endpointSocket = 'wss://socket.tetranscribo.com:3000';

  // WHASTAPP PRUEBAS
  endpoint7 = 'https://apiservices.grupogift.com/';

  // WHATSAPP PRODUCCION 
  // endpoint7 = 'https://apiservices.grupoempresarialnexos.com/';

  key = 'GiUBniR9UtmfKDaeOc9tXKt16lk=';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor() { }
}
