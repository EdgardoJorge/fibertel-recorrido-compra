import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { detallePedido, detallePedidobody } from '../models/detallePedido';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

constructor(private http:HttpClient) { }
  list():Observable<detallePedido[]>{
    return this.http.get<detallePedido[]>(
      `${environment.backendBaseUrl}/api/store/detallePedido`
    )
  }
  create(body: detallePedidobody): Observable<detallePedido> {
    const url = `${environment.backendBaseUrl}/api/store/detallePedido`;
    return this.http.post<detallePedido>(url, body);
}
}
