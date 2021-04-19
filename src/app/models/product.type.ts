export interface Product {
  tigID: number,
  name: String,
  price: number,
  sale: Boolean,
  sale_price: number,
  discount: number,
  qte_stock: number,
  qte_sold: number,
  comment: String,
  category: number,
  created?: String,

  toggle?: boolean,
  stock_update?: any,
  discount_update?: any,
  errorMultiple?: Boolean,
}