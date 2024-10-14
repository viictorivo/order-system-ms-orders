export interface ProductsByCategory {
  Products: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    priceUnit: number;
    categoryID: number;
  }[];
}
