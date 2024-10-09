import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvServiceService } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {
  private _env = inject(EnvServiceService);
  private http = inject(HttpClient);
  constructor() {}

  public getAllResidentialByParam(
    value: string,
    quoteTypeId: number
  ): Observable<any> {
    return this.http.get(
      `${this._env.ENDPOINT_PRIMARY}${this._env.APP_MANAGEMENT}/ResidentialServices/getAllResidentialByParam?key=${this._env.SECRET_KEY}&param=${value}&quote_type_id=${quoteTypeId}`
    );
  }
}
