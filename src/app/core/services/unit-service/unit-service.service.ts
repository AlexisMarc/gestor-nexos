import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvServiceService } from '@env';
import { RespData, unit } from '@models';

export interface unitRelated {
  array_units: ArrayUnits[];
  customer_id: string;
}

export interface ArrayUnits {
  id: number;
  is_owner: number;
}

@Injectable({
  providedIn: 'root',
})
export class UnitServiceService {
  private _env = inject(EnvServiceService)
  private http = inject(HttpClient);
  constructor() {}

  public getUnitsByMeetingId(id: string) {
    return this.http.get<RespData<unit[]>>(`${this._env.ENDPOINT_SECONDARY}/management/api/units/meeting/${id}`);
  }

  public getUnitsByMeetingIdByCustomer(
    meeting_id: string,
    customize_id: string
  ) {
    return this.http.get<RespData<unit[]>>(
      `${this._env.ENDPOINT_SECONDARY}/management/api/units/meeting/${meeting_id}/${customize_id}`
    );
  }

  public saveRelateUnit(data: unitRelated) {
    return this.http.put<RespData<any>>(
      `${this._env.ENDPOINT_SECONDARY}/management/api/units/save-relation`,
      data
    );
  }
}
