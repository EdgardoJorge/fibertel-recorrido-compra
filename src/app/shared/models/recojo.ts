export interface Recojo {
    idRecojo: number;         
    fechaListo: Date;          
    fechaEntrega: Date;         
    responsableEntrega?: string;
}
export interface RecojoBody{
    fechaListo: Date;          
    fechaEntrega: Date;         
    responsableEntrega?: string;
}