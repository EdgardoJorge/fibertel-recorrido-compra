export interface clientes{
    idCliente: number,
    razonSocial: string,
    email: string,
    telefonoMovil: string,
    tipoDocumento: string,
    numeroDocumento:string,
    direccionFiscal?: string,
}
export interface clientesbody{
    razonSocial: string,
    email: string,
    telefonoMovil: string,
    tipoDocumento: string,
    numeroDocumento:string,
    direccionFiscal?: string,
}