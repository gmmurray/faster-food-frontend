export class RestaurantModel {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public postalCode: string,
    public city: string,
    public state: string,
    public deliveryUrl: string,
    public selected?: boolean,
  ) {}
}
