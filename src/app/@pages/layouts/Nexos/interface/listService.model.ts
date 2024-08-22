export class ListService {
    constructor(
        public id: number,
        public name: string,
        public status_id: string,
        public created_at: string,
        public updated_at: string,
        public status: string,
        public serviciosActivos:string,
        //Toca revisarlos
    ) { }
}