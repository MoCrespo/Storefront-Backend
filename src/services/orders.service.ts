import { Orders, OrderStore } from '../models/orders';
import { CreateCartDTO } from '../models/types/cart.types';
import { CreateOrderDTO, UpdateOrderDTO } from '../models/types/orders.types';

const orderModel = new Orders();

const cart = new OrderStore();

export class OrdersService {
  static async addProduct(o: CreateCartDTO) {
    try {
      const car = await cart.addProduct(o);
      return car;
    } catch (err) {
      throw err as string;
    }
  }
  static async getOrders() {
    try {
      const orders = await orderModel.index();
      return orders;
    } catch (err) {
      throw err as string;
    }
  }

  static async getOrder(id: string) {
    try {
      const order = await orderModel.show(id);
      return order;
    } catch (err) {
      throw err as string;
    }
  }

  static async addOrder(o: CreateOrderDTO) {
    try {
      const order = await orderModel.create(o);
      return order;
    } catch (err) {
      throw err as string;
    }
  }

  static async updateProduct(o: UpdateOrderDTO, id: string) {
    try {
      const order = await orderModel.update(o, id);
      return order;
    } catch (err) {
      throw err as string;
    }
  }

  static async deleteOrder(id: string) {
    try {
      const del = await orderModel.delete(id);
      return del;
    } catch (err) {
      throw err as string;
    }
  }
}
