import { Injectable } from "@angular/core";
import { ItemsQuote } from "./items.model";
import { DataQuote } from "./dataquote.model";
import { ItemSave } from "./itemsave.model";

@Injectable()
export class Globals {
    listadoItems: ItemSave[] = [];
    dataQuote: DataQuote[] = [];
    quote_type_id: any;
    search_data: string;
    quorum_real_time: string;
}