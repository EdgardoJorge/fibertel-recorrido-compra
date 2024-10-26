import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido, pedidobody } from '../models/Pedido';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {

constructor(private http:HttpClient) {}
  list(id : string): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(
      `${environment.backendBaseUrl}/api/store/pedido/${id}`
    )
  };
  create(body: pedidobody): Observable<Pedido> {
    const url = `${environment.backendBaseUrl}/api/store/pedido`;
    return this.http.post<Pedido>(url, body);
}
}
