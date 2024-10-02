import { listadoUnidad } from "./listadounidad";

export class Customer{
    constructor(
        
    public id: string,
    public name: string,
    public nameRegister: string,
    public document_number: string,
    public email_1: string,
    public email_1_copy: string,
    public email_2: string,
    public email_3: string,
    public email_4: string,
    public moroso: string,
    public is_observer: string,
    public speaker: string,
    public units: listadoUnidad[] = []
 
   ){}
}