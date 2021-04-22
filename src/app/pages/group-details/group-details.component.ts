import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.type';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  produits: { poissons: Product[], crustaces: Product[], fruitsDeMers: Product[] } = {
    poissons: [],
    crustaces: [],
    fruitsDeMers: []
  }

  constructor(private serviceProducts: ProductsService, private notifyService: NotificationService, private jwt: JwtService) { }

  ngOnInit(): void {
    this.serviceProducts.getProducts().subscribe(
      response => this.produits.poissons = response.map(prod => ({ ...prod, 
        stock_update: 0, 
        discount_update: prod.discount, 
        errorMultiple: false, 
        isInvendu: false 
      }))
    );
  }

  loadFruitsDeMer(): void {
    if (this.produits.fruitsDeMers.length == 0) {
      this.serviceProducts.getFruitsDeMer().subscribe(
        response => this.produits.fruitsDeMers = response.map(prod => ({ ...prod, 
          stock_update: 0, 
          discount_update: prod.discount,
          errorMultiple: false, 
          isInvendu: false 
        }))
      );
    }
  }

  loadCrustaces(): void {
    if (this.produits.crustaces.length == 0) {
      this.serviceProducts.getCrutaces().subscribe(
        response => this.produits.crustaces = response.map(prod => ({ ...prod, 
          stock_update: 0, 
          discount_update: prod.discount, 
          errorMultiple: false, 
          isInvendu: false }))
      );
    }
  }

  updateAll(): void {
    let response = [];
    for (const produit in this.produits) {
      const update = this.produits[produit].filter(p => {
        if (p.discount_update == null || p.stock_update == null || typeof p.discount_update !== 'number' || typeof p.stock_update !== 'number') p.errorMultiple = true;
        else if (p.discount_update < 0 || p.discount_update > 100) p.errorMultiple = true;
        else if (!(p.qty_stock + p.stock_update >= 0)) p.errorMultiple = true;
        else if(p.isInvendu && p.stock_update >= 0) p.errorMultiple = true ;
        else p.errorMultiple = false;
        if ((p.stock_update != 0 || p.discount_update != p.discount) && !p.errorMultiple) {
          return true;
        }
      })

      update.forEach(update => {
        response.push({ 
          tigID: update.tigID, 
          stock: update.stock_update, 
          discount: update.discount_update, 
          operation : update.stock_update >= 0 ? 0 : (update.isInvendu ? 2 : 1)
        });
      })

      if (response.length > 0 && !this.haveErrors()) {
        this.produits[produit].forEach(p => {
          p.qty_stock += p.stock_update;
          p.discount = p.discount_update;

        //   if (p.discount == 0)
        //     p.discount_price = p.retail_price;
          if (p.discount >= 0)
            p.discount_price = p.retail_price - ((p.retail_price * p.discount) / 100);
        })
      }
    }

    if (response.length > 0 && !this.haveErrors()) {
      this.notifyService.showSuccess("Modification acceptée", "");
      this.serviceProducts.patchGroupProduct(response);
      for (const produit in this.produits) {
        this.produits[produit].forEach(p => {
          p.discount_update = p.discount;
          p.stock_update = 0;
        })
      }
    }
  }

  haveErrors(): Boolean {
    let res: Boolean = false;
    for (const produit in this.produits) {
      this.produits[produit].forEach(p => {
        if (p.errorMultiple == true) res = true;
      })
    }
    return res;
  }

  messageErrors() {
    let res = []
    this.produits.poissons.forEach(p => {
      if (p.errorMultiple == true) res.push("Une erreur est survenue dans les Poissons");
    })
    this.produits.crustaces.forEach(p => {
      if (p.errorMultiple == true) res.push("Une erreur est survenue dans les Crustacés");
    })
    this.produits.fruitsDeMers.forEach(p => {
      if (p.errorMultiple == true) res.push("Une erreur est survenue dans les Fruits de mer");
    })
    return res[0]
  }
}
