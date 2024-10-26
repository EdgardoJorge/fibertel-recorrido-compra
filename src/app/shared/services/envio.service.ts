import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envio, enviobody } from '../models/envio';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  constructor(private http:HttpClient) {}
  listAll(): Observable<envio[]>{
    return this.http.get<envio[]>(
      `${environment.backendBaseUrl}/api/store/envio`
    )
  }
  create(body: enviobody): Observable<envio> {
    const url = `${environment.backendBaseUrl}/api/store/envio`;
    return this.http.post<envio>(url, body);
}
}
