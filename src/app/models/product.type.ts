export interface Product {
  tigID: number,            // Clé primaire
  name: String,             // Nom du produit
  on_sale: Boolean,         // Si le produit est en promotion
  producer_price: number,   // Prix achat
  resale_price: number,     // Prix de vente
  discount_price: number,   // Prix de vente avec reduction
  discount: number,         // Réduction
  qty_stock: number,        // Quantité en stock
  qty_sold: number,         // Quantité vendu
  comment: String,          // Commentaire
  created: String,          // Date de création
  category: number          // Type

  toggle?: Boolean,
  stock_update?: any,
  discount_update?: any,
  errorMultiple?: Boolean,
  isInvendu?: Boolean
}