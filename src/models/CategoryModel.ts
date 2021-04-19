export class CategoryModel {
  constructor(
    public name: string,
    public id: string,
    public iconUrl: string,
    public selected?: boolean,
  ) {}
}
