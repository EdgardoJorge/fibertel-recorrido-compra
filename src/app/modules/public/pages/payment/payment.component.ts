import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../../../shared/services/Pedido.service'; // Importa el servicio de pedidos
import { Pedido, pedidobody } from '../../../../shared/models/Pedido'; // Importa el modelo pedidobody
import { CarritoService } from '../../../../shared/services/carrito.service'; // Importa el servicio de Carrito
import { detallePedidobody } from '../../../../shared/models/detallePedido';
import { DetallePedidoService } from '../../../../shared/services/detallePedido.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private carritoService: CarritoService,
    private detalleService: DetallePedidoService // Inyecta el servicio de DetallePedido
  ) {}

  continue() {
    // Obtiene los IDs de cliente y envío del localStorage
    const idCliente = localStorage.getItem('clienteId');
    const idEnvio = localStorage.getItem('envioId');

    // Verifica si los IDs están presentes
    if (!idCliente || !idEnvio) {
      console.error('No se encontraron los IDs de cliente o envío en el localStorage');
      alert('Error al procesar el pedido. Por favor, intente nuevamente.');
      return;
    }

    // Obtén el total del carrito
    const total = this.carritoService.total();

    // Crea el objeto pedido a enviar
    const pedidoData: pedidobody = {
      fechaCancelado: new Date(),
      tipoPedido: 'Entrega',
      estado: 'Pendiente',
      total: total,
      idCliente: parseInt(idCliente),
      idEnvio: parseInt(idEnvio)
    };

    // Llama al servicio de Pedido para crear un nuevo pedido
    this.pedidoService.create(pedidoData).subscribe({
      next: (response) => {
        console.log('Pedido creado:', response);

        // Guarda el ID del pedido en el localStorage
        localStorage.setItem('pedidoId', response.idPedido.toString());

        // Envía los detalles de cada producto en el carrito
        const carritoItems = this.carritoService.getcarrito();
        carritoItems.forEach(item => {
          const detallePedidoData: detallePedidobody = {
            cantidad: item.cantidad,
            precioUnitario: item.producto.precio,
            precioDescuento: item.producto.precioOferta || 0, // Asegúrate de que tiene un valor numérico
            subTotal: item.producto.precio,
            idProducto: item.producto.idProducto,
            idPedido: response.idPedido
          };

          // Llama al servicio de DetallePedido para agregar cada detalle al pedido
          this.detalleService.create(detallePedidoData).subscribe({
            next: (detalleResponse) => {
              console.log('Detalle de pedido creado:', detalleResponse);
            },
            error: (error) => {
              console.error('Error al crear detalle de pedido:', error);
            }
          });
        });

        // Opcional: limpia el localStorage si ya no necesitas los IDs
        localStorage.removeItem('clienteId');
        localStorage.removeItem('envioId');

        // Redirige a la siguiente vista después de completar el pago
        this.router.navigate(['/recorrido/completado']);
      },
      error: (error) => {
        console.error('Error al crear el pedido:', error);
        alert('Hubo un problema al crear el pedido. Por favor, inténtelo más tarde.');
      }
    });
  }
}
