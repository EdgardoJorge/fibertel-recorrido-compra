export interface envio {
    idEnvio: number;
    region: string;
    provincia: string;
    distrito: string;
    localidad: string;
    calle: string;
    nDomicilio: string;
    codigoPostal: string;
    fechaEnvio: Date;
    fechaEntrega: Date;
    responsableEntrega: string;
    idPersonal: number;
}
export interface enviobody{
    region: string;
    provincia: string;
    distrito: string;
    localidad: string;
    calle: string;
    nDomicilio: string;
    codigoPostal: string;
    fechaEnvio: Date;
    fechaEntrega: Date;
    responsableEntrega: string;
    idPersonal: number;
}