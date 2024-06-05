export default class mdlUpdateProductRequest {
  id: string;
  name: string;
  description: string;
  price: number

  constructor(pId: string, pName: string, pDescription: string, pPrice: number) {
    this.id = pId;
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
  }
}