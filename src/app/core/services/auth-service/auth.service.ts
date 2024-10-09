import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvServiceService } from '@env';
import { RespData } from '@models';


export interface ReqAuth {
  email: string;
  password: string;
  source: 'gestor';
}

export interface RespAuth {
    id: string;
    name: string;
    status_id: string;
    email: string;
    photo: string;
    profile_id: string;
    profile: string;
    token: string;
  
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _env = inject(EnvServiceService)
  private http = inject(HttpClient);

  Authentication(data: ReqAuth) {
    return this.http.post<RespData<RespAuth>>(`${this._env.ENDPOINT_PRIMARY}${this._env.GESTOR_V2}api/users/login`, JSON.stringify(data));
  }
}
