import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { clientes, clientesbody } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

constructor(private http : HttpClient) { }
  search( query : string): Observable<any>{
    return this.http.get(`${environment.backendBaseUrl}/api/store/cliente/Buscar?dni=${query}`);
  }
  list(): Observable<clientes[]>{
    return this.http.get<clientes[]>(
      `${environment.backendBaseUrl}/api/store/cliente`
    )
  }
  create(body: clientesbody): Observable<clientes> {
    const url = `${environment.backendBaseUrl}/api/store/envio`;
    return this.http.post<clientes>(url, body);
}
}
