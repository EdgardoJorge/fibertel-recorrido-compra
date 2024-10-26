import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recojo, RecojoBody } from '../models/recojo';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecojosService {

  constructor(private http:HttpClient) {}
  listAll(): Observable<Recojo[]>{
    return this.http.get<Recojo[]>(
      `${environment.backendBaseUrl}/api/store/recojo`
    )
  }
  create(body: RecojoBody): Observable<Recojo> {
    const url = `${environment.backendBaseUrl}/api/store/envio`;
    return this.http.post<Recojo>(url, body);
}
}
