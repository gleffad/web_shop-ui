import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { ProductsService } from 'src/app/services/products.service';
import exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  haveChart: Boolean = false;
  haveError: Boolean = false;
  titleChart: String = "";

  options: any = {

  }

  constructor(private serviceProducts: ProductsService) { }

  ngOnInit(): void {
    Highcharts.setOptions({
      lang: {
        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        shortMonths: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
        decimalPoint: ",",
        thousandsSep: " ",
        noData: "Pas d'information à afficher"
      }
    });
  }

  getResultat(n: String): String {
    if (n == "0") return "Chiffre d'affaire";
    if (n == "1") return "Bénéfice";
  }

  search(f) {
    const type = f.value.type;
    const time = f.value.time;
    const comptability = f.value.comptability;
    this.titleChart = f.value.comptability;

    if (type !== "" && time !== "" && comptability !== "") {
      this.haveChart = true;
      this.serviceProducts.getTransaction(type, time, comptability).subscribe(
        response => {
          Highcharts.stockChart('container', {
            ...this.options,
            yAxis: {
              title: {
                text: this.getResultat(this.titleChart) + " (€)"
              }
            },
            xAxis: {
              title: {
                text: 'Date',
              }
            },
            navigator: {
              enabled: false
            }, series: [{
              name: this.getResultat(this.titleChart),
              data: response.map(t => ([new Date(t.date).getTime(), t.revenues])),
              tooltip: {
                valueDecimals: 2
              }
            }],
            title: {
              text: this.getResultat(this.titleChart) + " en fonction de temps"
            }
          });
          this.haveError = false;
        },
        error => { }
      );
    } else {
      this.haveError = true;
      this.options.series[0].data = [];
      Highcharts.stockChart('container', { rangeSelector: { enabled: false } });
    }
  }

}
