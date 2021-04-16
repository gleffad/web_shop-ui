import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.type';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  poissons : Product[] = []
  crustaces : Product[] = []
  fruitsDeMers : Product[] = []


  constructor(private serviceProducts: ProductsService, private notifyService : NotificationService) { 
  
  }

  ngOnInit(): void {
    this.serviceProducts.getProducts().subscribe(
      response =>  this.poissons = response.map(prod => ({ ...prod, stock_update: 0 , discount_update: prod.discount, errorMultiple: false }))
    ); 
  }

  loadFruitsDeMer(): void {
    if(this.fruitsDeMers.length == 0) {
      this.serviceProducts.getFruitsDeMer().subscribe(
        response =>  this.fruitsDeMers = response.map(prod => ({ ...prod, stock_update: 0 , discount_update: prod.discount, errorMultiple: false }))
      );
    }
  }

  loadCrustaces(): void {
    if(this.crustaces.length == 0) {
      this.serviceProducts.getCrutaces().subscribe(
        response =>  this.crustaces = response.map(prod => ({ ...prod, stock_update: 0 , discount_update: prod.discount, errorMultiple: false }))
      );
    }
  }



  updateAll(): void {
    const updatePoissons = this.poissons.filter(p => {
      if(p.discount_update == null || p.stock_update == null || typeof p.discount_update !== 'number' || typeof p.stock_update !== 'number') p.errorMultiple = true 
      else if(p.discount_update < 0 || p.discount_update > 100) p.errorMultiple = true 
      else if(!(p.quantity_stock + p.stock_update >= 0)) p.errorMultiple = true 
      else p.errorMultiple = false

      if((p.stock_update != 0 || p.discount_update != p.discount) && !p.errorMultiple) {
        // p.quantity_stock += p.stock_update
        // p.discount = p.discount_update
        // if(p.discount > 0)
        //   p.price_on_sale = p.price - ((p.price * p.discount) / 100)
        return true
      }
    })

    const updateCrustaces = this.crustaces.filter(p => {
      if(p.discount_update == null || p.stock_update == null || typeof p.discount_update !== 'number' || typeof p.stock_update !== 'number') p.errorMultiple = true 
      else if(p.discount_update < 0 || p.discount_update > 100) p.errorMultiple = true 
      else if(!(p.quantity_stock + p.stock_update >= 0)) p.errorMultiple = true 
      else p.errorMultiple = false

      if((p.stock_update != 0 || p.discount_update != p.discount) && !p.errorMultiple) {
        // p.quantity_stock += p.stock_update
        // p.discount = p.discount_update
        // if(p.discount > 0)
        //   p.price_on_sale = p.price - ((p.price * p.discount) / 100)
        return true
      }
    })

    const updateFruitsDeMer = this.fruitsDeMers.filter(p => {
      if(p.discount_update == null || p.stock_update == null || typeof p.discount_update !== 'number' || typeof p.stock_update !== 'number') p.errorMultiple = true 
      else if(p.discount_update < 0 || p.discount_update > 100) p.errorMultiple = true 
      else if(!(p.quantity_stock + p.stock_update >= 0)) p.errorMultiple = true 
      else p.errorMultiple = false

      if((p.stock_update != 0 || p.discount_update != p.discount) && !p.errorMultiple) {
        // p.quantity_stock += p.stock_update
        // p.discount = p.discount_update
        // if(p.discount > 0)
        //   p.price_on_sale = p.price - ((p.price * p.discount) / 100)
        return true
      }
    })

    let response = []

    updatePoissons.forEach(update => {
      response.push({id: update.id , stock: update.stock_update, discount: update.discount_update})
    })
    updateCrustaces.forEach(update => {

      response.push({id: update.id , stock: update.stock_update, discount: update.discount_update})
    })
    updateFruitsDeMer.forEach(update => {
      response.push({id: update.id , stock: update.stock_update, discount: update.discount_update})
    })

    if(response.length > 0 && !this.haveErrors()) {
      this.poissons.forEach(p => {
        p.quantity_stock += p.stock_update
        p.discount = p.discount_update
        if(p.discount > 0)
          p.price_on_sale = p.price - ((p.price * p.discount) / 100)
      })
      this.crustaces.forEach(p => {
        p.quantity_stock += p.stock_update
        p.discount = p.discount_update
        if(p.discount > 0)
          p.price_on_sale = p.price - ((p.price * p.discount) / 100)
      })
      this.fruitsDeMers.forEach(p => {
        p.quantity_stock += p.stock_update
        p.discount = p.discount_update
        if(p.discount > 0)
          p.price_on_sale = p.price - ((p.price * p.discount) / 100)
      })
      this.notifyService.showSuccess("Modification acceptée", "");
      console.log("call to API - updateAll ");
      console.log(response);
      
    }
  }

  haveErrors(): Boolean {
    let res : Boolean = false
    this.poissons.forEach(p => {
      if(p.errorMultiple == true) res = true
    })
    this.crustaces.forEach(p => {
      if(p.errorMultiple == true) res = true
    })
    this.fruitsDeMers.forEach(p => {
      if(p.errorMultiple == true) res = true
    })
    return res;
  }

  messageErrors() {
    let res = []
    this.poissons.forEach(p => {
      if(p.errorMultiple == true) res.push("Une erreur est survenue dans les Poissons")
    })
    this.crustaces.forEach(p => {
      if(p.errorMultiple == true) res.push("Une erreur est survenue dans les Crustacés")
    })
    this.fruitsDeMers.forEach(p => {
      if(p.errorMultiple == true) res.push("Une erreur est survenue dans les Fruits de mer")
    })
  
    return res[0]
  }
}
