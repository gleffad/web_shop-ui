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
    return this.http.get<Product[]>(this.baseUrl + "/products/")
  }

  getPoissons() {
    return this.http.get<Product[]>(this.baseUrl + "/products/fish/")
  }

  getCrutaces() {
    return this.http.get<Product[]>(this.baseUrl + "/products/shellfish/")
  }
  
  getFruitsDeMer() {
    return this.http.get<Product[]>(this.baseUrl + "/products/seafood/")
  }

  patchSubStockProduct(tigID: number, discount: number, operation: number) {
    this.http.post(this.baseUrl + "/decrementstock/", {
      "tigID": tigID,
      "qty": discount,
      "operation": operation
    }).subscribe(response => {}, error => {
      console.log(error);  
    })
  }

  patchAddStockProduct(tigID: number, discount: number){
    this.http.patch(this.baseUrl + "/incrementstock/", {
      "tigID": tigID,
      "qty": discount
    }).subscribe(response => {}, error => {
      console.log(error);  
    })
  }

  patchDiscount(tigID: number, discount: number) {
    this.http.patch(this.baseUrl + "/setdiscount/", {
      "tigID": tigID,
      "discount": discount
    }).subscribe(response => {}, error => {
      console.log(error);  
    })
  }

  patchGroupProduct(products: Array<{ tigID: number, stock: number, discount: number }>) {
    this.http.post(this.baseUrl + "/productsGroup/", products).subscribe(response => {}, error => {
      console.log(error);  
    })
  }

  getTransaction(type: String, time: String) { 
    return this.http.post<Transaction[]>(this.baseUrl + "/comptability/", {
      product_type: type,
      time_format: time
    })
  }
}
