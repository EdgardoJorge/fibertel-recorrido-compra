export interface detallePedido{
    idDetallePedido: number,
    cantidad: number,
    precioUnitario: number,
    precioDescuento: number,
    subTotal: number,
    idProducto: number,
    idPedido:number,
}
export interface detallePedidobody{
    cantidad: number,
    precioUnitario: number,
    precioDescuento: number,
    subTotal: number,
    idProducto: number,
    idPedido:number,
}