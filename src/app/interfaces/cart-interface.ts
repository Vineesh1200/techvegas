import { ProductInterface } from "./product-interface";

export interface CartInterface {
    id: number,
    userId: number,
    products: ProductInterface[]
}