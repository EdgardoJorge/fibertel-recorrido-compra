export interface Pedido {
    idPedido: number;
    fechaPedido: Date;
    fechaCancelado?: Date; // Opcional
    tipoPedido: string;
    estado: string;
    total: number;
    idCliente: number;
    idPersonal?: number; // Opcional
    idEnvio?: number; // Opcional
    idRecojo?: number; // Opcional
}
export interface pedidobody{
    fechaCancelado?: Date; 
    tipoPedido: string;
    estado: string;
    total: number;
    idCliente: number;
    idPersonal?: number; 
    idEnvio?: number; 
    idRecojo?: number;
}