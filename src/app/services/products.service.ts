import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.type'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: String = "http://localhost:8000"

  constructor(private http: HttpClient) { }

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

  getProductsTest() {
    return this.http.get<Product[]>(this.baseUrl + "/products")
  }
}
