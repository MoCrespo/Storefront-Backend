import { Products } from '../models/products';
import { CreateProductDTO, UpdateProductDTO } from '../models/types/products.types';

const productModel = new Products();

export class ProductsService {
  static async getProducts() {
    try {
      const products = await productModel.index();
      return products;
    } catch (err) {
      throw err as string;
    }
  }

  static async getProduct(id: string) {
    try {
      const product = await productModel.show(id);
      return product;
    } catch (err) {
      throw err as string;
    }
  }

  static async addProduct(p: CreateProductDTO) {
    try {
      const product = await productModel.create(p);
      return product;
    } catch (err) {
      throw err as string;
    }
  }

  static async updateProduct(p: UpdateProductDTO, id: string) {
    try {
      const product = await productModel.update(p, id);
      return product;
    } catch (err) {
      throw err as string;
    }
  }

  static async deleteProduct(id: string) {
    try {
      const del = await productModel.delete(id);
      return del;
    } catch (err) {
      throw err as string;
    }
  }
}
