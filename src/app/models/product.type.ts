export interface Product {
  availability: Boolean,
  id: number,
  discount: number,
  price: number,
  price_on_sale: number,
  category: number,
  name: String,
  sale: Boolean,
  comments: String,
  quantity_stock: number,
  quantity_sold: number,

  toggle?: boolean,
  stock_update?: any,
  discount_update?: any,
  errorMultiple?: Boolean,
}