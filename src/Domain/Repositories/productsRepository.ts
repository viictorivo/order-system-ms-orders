import { Products } from '../Interfaces/products';

export abstract class ProductsRepository {
  abstract getProductsById(id: number): Promise<Products | null>;
  abstract saveProducts(products: Products): Promise<Products>;
  abstract updateProducts(products: Products): Promise<Products>;
  abstract deleteProductsById(id: number): Promise<Products>;
}
