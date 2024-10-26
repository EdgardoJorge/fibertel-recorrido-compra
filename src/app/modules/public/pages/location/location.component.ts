import { Component, OnInit } from '@angular/core';
import { UbigeoService } from '../../services/ubigeo.service';
import { EnvioService } from '../../../../shared/services/envio.service';
import { Router } from '@angular/router';
import { envio, enviobody } from '../../../../shared/models/envio';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  switchState: boolean = false;
  ubigeos: any[] = [];
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];

  selectedDepartamento: string = '';
  selectedProvincia: string = '';
  selectedDistrito: string = '';
  referencia: string = '';
  CodigoPostal: string = '';

  departamentoError: boolean = false;
  provinciaError: boolean = false;
  distritoError: boolean = false;
  referenciaError: boolean = false;
  CodigoPostalError: boolean = false;

  formSubmitted: boolean = false;

  constructor(
    private ubigeoService: UbigeoService,
    private envioService: EnvioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ubigeoService.getUbigeos().subscribe((data: any) => {
      this.ubigeos = data;
      this.departamentos = [...new Set(this.ubigeos.map((item: any) => item.departamento))];
    }, error => {
      console.error('Error al cargar los ubigeos:', error);
    });
  }

  onDepartamentoChange(): void {
    this.provincias = [
      ...new Set(
        this.ubigeos
          .filter((item: any) => item.departamento === this.selectedDepartamento)
          .map((item: any) => item.provincia)
      )
    ];
    this.distritos = [];
    this.selectedProvincia = '';
  }

  onProvinciaChange(): void {
    this.distritos = this.ubigeos
      .filter(
        (item: any) =>
          item.departamento === this.selectedDepartamento && item.provincia === this.selectedProvincia
      )
      .map((item: any) => item.distrito);
    this.selectedDistrito = '';
  }

  continue(): void {
    if (this.switchState) {
      console.log('Formulario de recojo enviado');
      this.formSubmitted = true;
      this.router.navigate(['/recorrido/pago']);
      return;
    }

    this.departamentoError = !this.selectedDepartamento;
    this.provinciaError = !this.selectedProvincia;
    this.distritoError = !this.selectedDistrito;
    this.referenciaError = !this.referencia;
    this.CodigoPostalError = !this.CodigoPostal;

    if (this.departamentoError || this.provinciaError || this.distritoError || this.referenciaError || this.CodigoPostalError) {
      return;
    }

    const envioData: enviobody = {
      region: this.selectedDepartamento,
      provincia: this.selectedProvincia,
      distrito: this.selectedDistrito,
      localidad: 'juan de dios',
      calle: this.referencia,
      nDomicilio: 'cajamarca',
      codigoPostal: this.CodigoPostal,
      fechaEnvio: new Date(),
      fechaEntrega: new Date(),
      responsableEntrega: '',
      idPersonal: 1
    };

    console.log('Formulario enviado:', envioData);

    this.envioService.create(envioData).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        if (response && response) {
          localStorage.setItem('envioId', response.idEnvio.toString());
          console.log('El ID del envío fue guardado en el localStorage:', response.id);
        } else {
          console.error('El campo id no está presente en la respuesta o es inválido:', response);
        }
        this.formSubmitted = true;
        this.router.navigate(['/recorrido/pago']);
      },
      error => {
        console.error('Error al crear el envío:', error);
      }
    );
  }
}
