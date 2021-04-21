import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.type'
import { Transaction } from '../models/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // baseUrl: String = "http://localhost:8000"

  constructor(private http: HttpClient) { }
    
  // getProductsTest() {
  //   return this.http.get<Product[]>(this.baseUrl + "/products")
  // }

  getProducts() {
    return this.http.get<Product[]>("../../assets/data/products.json")
  }

  getPoissons() {
    return this.http.get<Product[]>("../../assets/data/products.json")
  }

  getCrutaces() {
    return this.http.get<Product[]>("../../assets/data/products.json")
  }
  
  getFruitsDeMer() {
    return this.http.get<Product[]>("../../assets/data/products.json")
  }

  patchSubStockProduct(stock: number) {
    console.log("call to API - Products (Soustraire le stock à la valeur présente dans Produit)");
    console.log({
      stock
    });
  }

  patchAddStockProduct(stock: number){
    console.log("call to API - Products (Ajouter le stock à la valeur présente dans Produit)");
    console.log({
      stock
    });
  }

  patchDiscount(discount: number) {
    console.log("call to API - Products (Remplace le pourcentage de Produit)");
    console.log({
      discount
    });
  }

  postTransaction(transaction: { price: number, quantity: number, tigID: number, opetarion: number }) {
    console.log("call to API - Transaction (Ajout d'une transaction)");
    console.log(transaction);
  }
  
  postGroupTransaction(transactions: Array<{ price: number, quantity: number, tigID: number, opetarion: number }>) {
    console.log("call to API - Transaction (Ajout de plusieurs transactions)");
    console.log(transactions);
  }

  patchGroupProduct(products: Array<{ tigID: number, stock: number, discount: number }>) {
    console.log("call to API - Products (Modification de groupe sur les stocks et pourcentages)");
    console.log(products);
  }

  getTransaction(type: String, time: String) {
    console.log("call to API - Transaction (Va cherche les données de transaction en fonction de "+ type +" et "+ time + ")");
    return this.http.get<Transaction[]>("../../assets/data/comptability.json")
  }
}
