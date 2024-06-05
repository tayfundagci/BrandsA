export default class mdlCreateProductRequest {
  name: string;
  description: string;
  price: number

  constructor(pName: string, pDescription: string, pPrice: number) {
    this.name = pName;
    this.description = pDescription;
    this.price = pPrice;
  }
}