export class Chats{
    constructor(
        
    public id:string,
    public message: string,
    public created_at:string,
    public name: string,
    public number:string,
    public building_id:string,
    public sector_name:string,
    public nameRegister:string,
    public sector_number:string,

 
   ){}
}

export interface ChatsInterface {
    id: string;
    message: string;
    created_at: string;
    name: string;
    number: string;
    building_id: string;
    sector_name: string;
    nameRegister: string;
    sector_number: string;
}