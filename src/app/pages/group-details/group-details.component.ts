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
    this.serviceProducts.getFruitsDeMer().subscribe(
      response =>  this.fruitsDeMers = response.map(prod => ({ ...prod, stock_update: 0 , discount_update: prod.discount, errorMultiple: false }))
    );
  }

  loadCrustaces(): void {
    this.serviceProducts.getCrutaces().subscribe(
      response =>  this.crustaces = response.map(prod => ({ ...prod, stock_update: 0 , discount_update: prod.discount, errorMultiple: false }))
    );
  }

  updateAll(): void {
    const updatePoissons = this.poissons.filter(poisson => {
      if(poisson.stock_update != 0 || poisson.discount_update != poisson.discount) {
        
        return true;
      }
    })

    console.log(updatePoissons[0].errorMultiple);
    

    // const updateCrustaces = this.crustaces.filter(crustace => crustace.stock_update != 0 || crustace.discount_update != crustace.discount)
    // const updateFruitsDeMer = this.fruitsDeMers.filter(fruitsDeMer => fruitsDeMer.stock_update != 0 || fruitsDeMer.discount_update != fruitsDeMer.discount)

    // let response = []
    // updatePoissons.forEach(update => {
    //   response.push({id: update.id , stock: update.stock_update, discount: update.discount_update})
    // })
    // updateCrustaces.forEach(update => {
    //   response.push({id: update.id , stock: update.stock_update, discount: update.discount_update})
    // })
    // updateFruitsDeMer.forEach(update => {
    //   response.push({id: update.id , stock: update.stock_update, discount: update.discount_update})
    // })

    // if(response.length > 0) {
    //   this.notifyService.showSuccess("Modification accepter", "");
    // }


    // console.log(response);   
  }

}
