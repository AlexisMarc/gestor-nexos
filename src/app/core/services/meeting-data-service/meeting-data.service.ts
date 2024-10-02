import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { meetingDataAll, MeetingWelcome, RespData } from '@models';

export interface ReqMeetingData {
  name: string;
  meeting_time: string;
  email_template_id: string;
  residential_id: string;
  whatsapp_id: string;
  login_with_credentials: number;
  limit_raising_by_customer: number;
  upload_database?: number;
  mails_to_send_documents: string;
  quality_care_selection: number;
  color: string;
  file?: string;
  logo?: string;
  shall_ask_representation_document: boolean;
  label_name_owner: string;
  label_name_agent: string;
  welcome_message: string;
  event_type_id?: number;
  signature_module: boolean;
  authority_granted: boolean
}

@Injectable({
  providedIn: 'root',
})
export class MeetingDataService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  constructor() {}

  createMeetingData(data: ReqMeetingData) {
    return this.http.post<RespData<void>>(this.api + '/meeting/create', data);
  }

  editMeetingData(data: ReqMeetingData, id: number) {
    return this.http.post<RespData<any>>(
      `${this.api}/meeting/update/${id}`,
      data
    );
  }

  getMeetingDataByResident(id: string) {
    return this.http.get<RespData<meetingDataAll[]>>(
      `${this.api}/meeting/lastmeeting/${id}`
    );
  }

  getWelcomeByMeetingId(id:number) {
    return this.http.get<MeetingWelcome>(
      `${this.api}/meeting/welcome/${id}`
    );
  }
}
