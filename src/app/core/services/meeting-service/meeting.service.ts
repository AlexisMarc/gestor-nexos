import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvServiceService } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private _env = inject(EnvServiceService)
  private http = inject(HttpClient);
  constructor() { }

  public getLastMeetingSettingsByResidential(id:string):Observable<any>{
    return this.http.get(`${this._env.ENDPOINT_SECONDARY}/management/api/meeting/lastmeeting/${id}`)
  }

}
