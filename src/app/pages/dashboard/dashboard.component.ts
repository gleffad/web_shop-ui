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
  haveChart: Boolean = false
  haveError: Boolean = false
  options: any = {
    title: {
      text: "Chiffre d'affaire en fonction de temps"
    },

    yAxis: {
      title: {
        text: "Chiffre d'affaire (€)"
      }
    },

    xAxis: {
      title: {
        text: 'Date'
      }
    },

    rangeSelector : {
        enabled: false
    },

    navigator: {
        enabled: false
    },

    series: [{
      name: "Chiffre d'aiffaire",
      data: [],
      tooltip: {
        valueDecimals: 2
      }
    }]
  }

  constructor(private serviceProducts: ProductsService) { }

  ngOnInit(): void {
    Highcharts.setOptions({
      lang: {
        months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        shortMonths: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
        decimalPoint: ",",
        printChart: "Imprimer",
        downloadPNG: "Télécharger en image PNG",
        downloadJPEG: "Télécharger en image JPEG",
        downloadPDF: "Télécharger en document PDF",
        downloadSVG: "Télécharger en document Vectoriel",
        loading: "Chargement en cours…",
        contextButtonTitle: "Exporter le graphique",
        resetZoom: "Réinitialiser le zoom",
        resetZoomTitle: "Réinitialiser le zoom au niveau 1:1",
        thousandsSep: " ",
        noData: "Pas d'information à afficher"
      }
    });   
  }

  search(f) {
    const type = f.value.type
    const time = f.value.time

    if(type !== "" && time !== "") {
      this.haveChart = true
      this.serviceProducts.getTransaction(type, time).subscribe(
        response => {
          this.options.series[0].data = response.map(t => ([new Date(t.date).getTime(), t.revenues]));
          Highcharts.stockChart('container', this.options);
          this.haveError = false
        },
        error => { }
      );
    } else {
      this.haveError = true
      this.options.series[0].data = []
      Highcharts.stockChart('container', { rangeSelector : { enabled: false }});
    }
  } 

}
