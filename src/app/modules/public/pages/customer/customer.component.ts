import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RucService } from '../../services/ruc.service';
import { DniService } from '../../services/dni.service';
import { CookieService } from 'ngx-cookie-service'; // Importa el servicio ClienteService
import { clientes, clientesbody } from '../../../../shared/models/clientes'; // Importa el modelo clientesbody
import { ClienteService } from '../../../../shared/services/Cliente.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  switchState: boolean = false; // Estado inicial del switch
  rucData: any; // Para almacenar los datos del RUC
  dniData: any; // Para almacenar los datos del DNI
  noResultsDNI: boolean = false; // Variable para controlar si hay resultados
  noResultsRUC: boolean = false;
  gmailBoleta: string = ''; // Para almacenar el Gmail de la boleta
  celularBoleta: string = ''; // Para almacenar el número de celular de la boleta
  gmailFactura: string = ''; // Para almacenar el Gmail de la factura
  celularFactura: string = ''; // Para almacenar el número de celular de la factura

  constructor(
    private rucService: RucService,
    private dniService: DniService,
    private router: Router,
    private clienteService: ClienteService // Inyecta el ClienteService
  ) {}

  // Método para obtener datos del RUC
  fetchRucData(ruc: string) {
    this.rucService.getRucData(ruc).subscribe({
      next: (data) => {
        if (data && (data.razonSocial || data.ruc)) {
          this.rucData = data; 
          this.noResultsRUC = false;
        } else {
          this.rucData = null;
          this.noResultsRUC = true;
        }
        console.log(this.rucData);
      },
      error: (error) => {
        console.error('Error al obtener datos del RUC:', error);
        this.rucData = null;
        this.noResultsRUC = true;
      }
    });
  }

  // Método para obtener datos del DNI
  fetchDniData(dni: string) {
    this.dniService.getDniData(dni).subscribe({
      next: (data) => {
        if (data && (data.dni || data.nombres || data.apellidoPaterno || data.apellidoMaterno || data.codVerifica)) {
          this.dniData = data;
          this.noResultsDNI = false;
        } else {
          this.dniData = null;
          this.noResultsDNI = true;
        }
        console.log(this.dniData);
      },
      error: (error) => {
        console.error('Error al obtener datos del DNI:', error);
        this.dniData = null;
        this.noResultsDNI = true;
      }
    });
  }

  // Método para continuar a la siguiente vista
  continue() {
    // Verifica si al menos uno de los formularios está completo
    const isBoletaComplete = this.gmailBoleta && this.celularBoleta;
    const isFacturaComplete = this.gmailFactura && this.celularFactura;
  
    if (isBoletaComplete || isFacturaComplete) {
      // Crear el objeto cliente a enviar
      const clienteData: clientesbody = {
        razonSocial: this.switchState ? this.rucData?.razonSocial : `${this.dniData?.nombres} ${this.dniData?.apellidoPaterno}`,
        email: this.switchState ? this.gmailFactura : this.gmailBoleta,
        telefonoMovil: this.switchState ? this.celularFactura : this.celularBoleta,
        tipoDocumento: this.switchState ? 'RUC' : 'DNI',
        numeroDocumento: this.switchState ? this.rucData?.ruc : this.dniData?.dni,
        direccionFiscal: this.switchState ? this.rucData?.direccion : undefined // Puedes agregar lógica para la dirección
      };
  
      // Llamar al servicio para crear el cliente
      this.clienteService.create(clienteData).subscribe({
        next: (response: any) => {
          console.log('Cliente creado:', response);
          // Verifica si la respuesta contiene el campo id del cliente
          if (response && response) {
            // Guarda el ID del cliente en el localStorage
            localStorage.setItem('clienteId', response.idCliente.toString());
            console.log('El cliente fue guardado con el ID:', response.id);
          } else {
            console.error('El campo id del cliente no está presente en la respuesta');
          }
          this.router.navigate(['/recorrido/locacion']); // Redirigir a la siguiente vista
        },
        error: (error) => {
          console.error('Error al crear el cliente:', error);
        }
      });
    } else {
      alert("Por favor, completa todos los datos de boleta o factura antes de continuar."); // Mensaje de error si no hay datos
    }
  }
  
}