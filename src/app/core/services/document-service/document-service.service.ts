import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentServiceService {
  private api = 'http://127.0.0.1:8000/management/api';
  private http = inject(HttpClient);

  cutImage(data: {
    width: number;
    height: number;
    image: string;
    points: number[][];
  }) {
    return this.http.post<any>(
      `${this.api}/meeting/documentImageCropping`,
      data
    );
  }
}
