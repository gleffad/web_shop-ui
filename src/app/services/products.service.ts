import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.type'
import { Transaction } from '../models/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: String = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + "/products")
  }

  getPoissons() {
    return this.http.get<Product[]>(this.baseUrl + "/products/fish")
  }

  getCrutaces() {
    return this.http.get<Product[]>(this.baseUrl + "/products/shellfish")
  }
  
  getFruitsDeMer() {
    return this.http.get<Product[]>(this.baseUrl + "/products/seafood")
  }

  patchSubStockProduct(tigID: number, discount: number, operation: number) {
    this.http.post(this.baseUrl + "/decrementstock/", {
      "tigID": tigID,
      "qty": discount,
      "operation": operation
    }).subscribe()
  }

  patchAddStockProduct(tigID: number, discount: number){
    this.http.patch(this.baseUrl + "/incrementstock/", {
      "tigID": tigID,
      "qty": discount
    }).subscribe()
  }

  patchDiscount(tigID: number, discount: number) {
    this.http.patch(this.baseUrl + "/setdiscount/", {
      "tigID": tigID,
      "discount": discount
    }).subscribe()
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
    console.log("/" + type + "/comptability/" + time + "");  
    return this.http.get<Transaction[]>("../../assets/data/comptability.json")
  }
}
