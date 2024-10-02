export class DataQuote {
  constructor(
    public name_residential: string,
    public name_administrator: string,
    public nit: string,
    public units: any,
    public phone: string,
    public phone2: string,
    public email: string,
    public address: string,
    public id_city: any,
    public date_quote: any,
    public percent_device: any,
    public observation_quote: string,
    public id_promotion: any,
    public text_promotion: string,
    public value_promotion: any,
    public percent_promotion: any
  ) { }
}