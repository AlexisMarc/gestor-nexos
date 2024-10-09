import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvServiceService } from '@env';
import { RespData, whatsAppTemplate } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatsAppServiceService {
  private _env = inject(EnvServiceService);
  private http = inject(HttpClient);

  constructor() {}

  public getTemplateWhatsApp() {
    return this.http.get<RespData<whatsAppTemplate[]>>(
      `${this._env.ENDPOINT_SECONDARY}/management/api/voting/whatsapp/active`
    );
  }
}
