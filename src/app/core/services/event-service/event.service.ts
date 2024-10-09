import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvServiceService } from '@env';
import { events, RespData } from '@models';

export interface ReqDataEvent {
  name: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private _env = inject(EnvServiceService)
  private api = `${this._env.ENDPOINT_SECONDARY}/management/api`;
  private http = inject(HttpClient);

  constructor() {}

  getEventTypes() {
    return this.http.get<RespData<events>>(this.api + '/events');
  }

  getEventTypesActive() {
    return this.http.get<RespData<events[]>>(this.api + '/events/active');
  }

  createEvent(data: ReqDataEvent) {
    return this.http.post<RespData<string>>(this.api + '/events/create', data);
  }
  

  editEvent(id: string, data: ReqDataEvent) {
    return this.http.post<RespData<string>>(
      this.api + '/events/update/' + id,
      data
    );
  }

  getEventById(id: number) {
    return this.http.get<RespData<events | undefined>>(`${this.api}/events/${id}`);
  }
}
