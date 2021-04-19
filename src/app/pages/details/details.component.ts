import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.type';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  products: Product[] = [];
  searchProducts: Product[] = [];
  currentProduct: Product;
  @Input() search: String;
  errorStock: Boolean = false;
  errorPercentage: Boolean = false


  constructor(private serviceProducts: ProductsService, private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.serviceProducts.getProducts().subscribe(
      response => {
        this.products = response.map(prod => ({ ...prod, toggle: false }));
        this.searchProducts = [...this.products];
      },
      error => { }
    );
  }

  selectProduct(currentProduct: Product): void {
    this.currentProduct = currentProduct
    this.errorStock = false
    this.errorPercentage = false
    this.products = this.products.map(product => {
      if (product.tigID == currentProduct.tigID)
        product.toggle = true;
      else
        product.toggle = false;
      return product;
    })
  }

  searchEvent(word): void {
    this.currentProduct = undefined;
    this.searchProducts = this.products.filter(product => {
      product.toggle = false;
      if (product.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())) return product;
    });
  }

  addStock(form) {
    const stock = form.value.change_stock
    if((stock === "") || (typeof stock !== 'number') || stock < 0) {
      this.errorStock=true;
    }  else {
      console.log("call to API - add Stock (" + stock + ")");
      this.notifyService.showSuccess("Ajout du stock pris en compte", "");
      this.errorStock=false;
      this.currentProduct.qte_stock += stock
      form.reset();
    }
  }

  subStock(form) {
    const stock = form.value.change_stock
    if(stock === "" || (typeof stock !== 'number') || (stock < 0) || (stock > this.currentProduct.qte_stock)) { 
      this.errorStock=true;
    } else {
      console.log("call to API - sub Stock (" + form.value.change_stock + ")");
      this.notifyService.showSuccess("Retrait du stock pris en compte", "");
      this.errorStock = false;
      this.currentProduct.qte_stock -= stock
      form.reset();  
    }
  }

  updatePercentage(form) {
    const discount = form.value.discount
    if((discount === "") || (typeof discount !== 'number') || (discount < 0) || (discount > 100)) {
      this.errorPercentage=true;
    } else {
      this.errorPercentage=false;
      form.reset();
      this.notifyService.showSuccess("Promotion pris en compte", "");
      this.currentProduct.discount = discount
      if(discount == 0) 
        this.currentProduct.sale_price = this.currentProduct.price
      if(discount > 0)
        this.currentProduct.sale_price = this.currentProduct.price - ((this.currentProduct.price * discount) / 100)
      console.log("call to API - update Discount (" + discount + ")");
    }
  }

}
